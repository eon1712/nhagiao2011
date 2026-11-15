interface Env {
  TRIBUTES_KV?: {
    get: (key: string) => Promise<string | null>;
    put: (key: string, value: string) => Promise<void>;
  };
  DB?: {
    prepare: (query: string) => {
      bind: (...args: any[]) => {
        all: () => Promise<{ results: any[] }>;
        run: () => Promise<any>;
      };
    };
  };
}

interface EventContext {
  request: Request;
  env: Env;
}

export async function onRequestGet(context: EventContext): Promise<Response> {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, max-age=0",
  };

  try {
    if (context.env?.TRIBUTES_KV) {
      const data = await context.env.TRIBUTES_KV.get("tributes_list");
      return new Response(data || "[]", { headers });
    }

    if (context.env?.DB) {
      await context.env.DB.prepare(
        "CREATE TABLE IF NOT EXISTS tributes (id TEXT PRIMARY KEY, timestamp INTEGER, author TEXT, message TEXT, theme TEXT)"
      ).bind().run();

      const { results } = await context.env.DB.prepare(
        "SELECT * FROM tributes ORDER BY timestamp DESC"
      ).bind().all();

      return new Response(JSON.stringify(results || []), { headers });
    }
  } catch (err) {
    console.error("Cloudflare storage read error:", err);
  }

  return new Response("[]", { headers });
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
  };

  try {
    const body = (await context.request.json()) as any;
    const { author, message, theme = "giay-do" } = body;

    if (!author || !message) {
      return new Response(
        JSON.stringify({ error: "Vui lòng điền họ tên và lời tri ân." }),
        { status: 400, headers }
      );
    }

    const newTribute = {
      id: body.id || `tr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      author: String(author).trim(),
      message: String(message).trim(),
      theme,
    };

    if (context.env?.TRIBUTES_KV) {
      const raw = await context.env.TRIBUTES_KV.get("tributes_list");
      let tributes: any[] = [];
      try {
        tributes = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(tributes)) tributes = [];
      } catch {
        tributes = [];
      }

      tributes.unshift(newTribute);
      await context.env.TRIBUTES_KV.put("tributes_list", JSON.stringify(tributes));

      return new Response(
        JSON.stringify({ success: true, tribute: newTribute }),
        { status: 201, headers }
      );
    }

    if (context.env?.DB) {
      await context.env.DB.prepare(
        "CREATE TABLE IF NOT EXISTS tributes (id TEXT PRIMARY KEY, timestamp INTEGER, author TEXT, message TEXT, theme TEXT)"
      ).bind().run();

      await context.env.DB.prepare(
        "INSERT OR REPLACE INTO tributes (id, timestamp, author, message, theme) VALUES (?, ?, ?, ?, ?)"
      )
        .bind(
          newTribute.id,
          newTribute.timestamp,
          newTribute.author,
          newTribute.message,
          newTribute.theme
        )
        .run();

      return new Response(
        JSON.stringify({ success: true, tribute: newTribute }),
        { status: 201, headers }
      );
    }

    return new Response(
      JSON.stringify({ success: true, tribute: newTribute }),
      { status: 201, headers }
    );
  } catch (err) {
    console.error("Cloudflare storage save error:", err);
    return new Response(
      JSON.stringify({ error: "Lỗi khi lưu vào cơ sở dữ liệu Cloudflare." }),
      { status: 500, headers }
    );
  }
}
