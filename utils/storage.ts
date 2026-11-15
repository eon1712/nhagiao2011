export interface Tribute {
  id: string;
  timestamp: number;
  author: string;
  message: string;
  theme: "giay-do" | "bang-den" | "son-mai";
  teacher?: string;
  subject?: string;
  stampImage?: string;
  waxColor?: string;
}

const LOCAL_STORAGE_KEY = "nguoi_lai_do_hoc_sinh_tributes_v2";

function deduplicateTributes(list: Tribute[]): Tribute[] {
  const seen = new Set<string>();
  return list.filter((item) => {
    const key = item.id ? item.id : `${item.author}-${item.message.slice(0, 30)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function getTributes(): Promise<Tribute[]> {
  try {
    const res = await fetch("/api/tributes", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const unique = deduplicateTributes(data);
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unique));
        }
        return unique;
      }
    }
  } catch (err) {
    console.warn("Database fetch failed, using local backup:", err);
  }

  if (typeof window !== "undefined") {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        return deduplicateTributes(JSON.parse(local));
      }
    } catch (e) {
      console.error("Local storage read error", e);
    }
  }

  return [];
}

export async function saveTribute(tribute: { author: string; message: string; theme: "giay-do" | "bang-den" | "son-mai" }): Promise<Tribute> {
  const newId = `tr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const payload: Tribute = {
    ...tribute,
    id: newId,
    timestamp: Date.now(),
  };

  try {
    const res = await fetch("/api/tributes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const result = await res.json();
      const saved = result.tribute || payload;

      if (typeof window !== "undefined") {
        const local = localStorage.getItem(LOCAL_STORAGE_KEY);
        const list: Tribute[] = local ? JSON.parse(local) : [];
        list.unshift(saved);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(deduplicateTributes(list)));
      }

      return saved;
    }
  } catch (err) {
    console.warn("Save failed, using local backup:", err);
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: Tribute[] = local ? JSON.parse(local) : [];
    list.unshift(payload);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(deduplicateTributes(list)));
  }

  return payload;
}

export function encodeTributeToUrl(tribute: Tribute): string {
  if (typeof window === "undefined") return "";
  const base = window.location.origin + window.location.pathname;
  const params = new URLSearchParams({
    tributeId: tribute.id,
    author: tribute.author,
    theme: tribute.theme,
    msg: tribute.message,
  });
  return `${base}?${params.toString()}`;
}

export function decodeTributeFromUrl(searchParams: URLSearchParams): Tribute | null {
  const id = searchParams.get("tributeId");
  const author = searchParams.get("author");
  const msg = searchParams.get("msg");

  if (!id || !author || !msg) return null;

  return {
    id,
    timestamp: Date.now(),
    author,
    message: msg,
    theme: (searchParams.get("theme") as any) || "giay-do",
  };
}
