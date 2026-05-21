import type { NextApiRequest, NextApiResponse } from "next";
import { extractTweet, type ExtractResult } from "@/lib/extract";

export const config = {
  api: {
    bodyParser: { sizeLimit: "16kb" },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtractResult | { ok: false; error: string }>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const url =
    typeof req.body === "object" && req.body
      ? (req.body as { url?: unknown }).url
      : undefined;

  if (typeof url !== "string" || !url.trim()) {
    res.status(400).json({ ok: false, error: "invalid_url" });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const result = await extractTweet(url, controller.signal);
    if (!result.ok) {
      const status =
        result.error === "tweet_not_found"
          ? 404
          : result.error === "invalid_url"
            ? 400
            : result.error === "rate_limited"
              ? 429
              : 502;
      res.status(status).json(result);
      return;
    }
    res.setHeader("Cache-Control", "public, s-maxage=300, max-age=60");
    res.status(200).json(result);
  } catch {
    res.status(500).json({ ok: false, error: "syndication_error" });
  } finally {
    clearTimeout(timeout);
  }
}
