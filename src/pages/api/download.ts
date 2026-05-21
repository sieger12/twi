import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const ALLOWED_HOSTS = new Set([
  "video.twimg.com",
  "pbs.twimg.com",
  "abs.twimg.com",
]);

function safeFilename(name: string): string {
  return name.replace(/[^\w.-]+/g, "_").slice(0, 96) || "download";
}

export default async function handler(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get("src");
  const filename = safeFilename(searchParams.get("name") ?? "twitter-media");

  if (!src) {
    return new Response("missing src", { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(src);
  } catch {
    return new Response("invalid src", { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(target.hostname)) {
    return new Response("forbidden host", { status: 403 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(target.toString(), {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 Safari/605.1.15",
      },
    });
  } catch {
    return new Response("upstream fetch failed", { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return new Response("upstream not ok", { status: upstream.status });
  }

  const contentType =
    upstream.headers.get("content-type") ?? "application/octet-stream";

  let extension = "";
  if (contentType.includes("mp4")) extension = ".mp4";
  else if (contentType.includes("jpeg") || contentType.includes("jpg"))
    extension = ".jpg";
  else if (contentType.includes("png")) extension = ".png";
  else if (contentType.includes("webp")) extension = ".webp";

  const finalName = filename.endsWith(extension) ? filename : `${filename}${extension}`;

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "content-type": contentType,
      "content-disposition": `attachment; filename="${finalName}"`,
      "cache-control": "public, max-age=3600, s-maxage=3600",
      "x-content-type-options": "nosniff",
    },
  });
}
