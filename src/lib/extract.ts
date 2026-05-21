export interface MediaVariant {
  quality: "sd" | "hd" | "original";
  url: string;
  width?: number;
  height?: number;
  contentType: string;
  bitrate?: number;
}

export interface ExtractSuccess {
  ok: true;
  type: "video" | "photo" | "animated_gif";
  tweetId: string;
  username: string;
  text?: string;
  variants: MediaVariant[];
  thumbnail?: string;
}

export interface ExtractFailure {
  ok: false;
  error:
    | "invalid_url"
    | "tweet_not_found"
    | "no_media"
    | "rate_limited"
    | "syndication_error";
}

export type ExtractResult = ExtractSuccess | ExtractFailure;

const TWEET_ID_RE =
  /^https?:\/\/(?:www\.|mobile\.)?(?:twitter|x)\.com\/[^/]+\/status\/(\d+)/i;

export function parseTweetId(url: string): string | null {
  const m = url.trim().match(TWEET_ID_RE);
  return m ? m[1] : null;
}

// Twitter's syndication endpoint requires a token derived from the tweet ID.
// The formula is the de-facto standard used by every embed and downloader.
function syndicationToken(id: string): string {
  const n = Number(id) / 1e15;
  return (n * Math.PI).toString(6 ** 2).replace(/(0+|\.)/g, "");
}

interface SyndicationVariant {
  bitrate?: number;
  content_type: string;
  url: string;
}

interface SyndicationMedia {
  type: "photo" | "video" | "animated_gif";
  media_url_https: string;
  original_info?: { width?: number; height?: number };
  video_info?: {
    aspect_ratio?: [number, number];
    duration_millis?: number;
    variants: SyndicationVariant[];
  };
}

interface SyndicationResponse {
  __typename?: string;
  id_str?: string;
  user?: { screen_name?: string; name?: string };
  text?: string;
  mediaDetails?: SyndicationMedia[];
  photos?: { url: string; width: number; height: number }[];
  video?: { variants: SyndicationVariant[]; poster?: string };
}

function pickQuality(bitrate?: number): "sd" | "hd" | "original" {
  if (!bitrate) return "sd";
  if (bitrate >= 2000000) return "hd";
  if (bitrate >= 800000) return "hd";
  return "sd";
}

function originalImageUrl(url: string): string {
  if (!url) return url;
  const u = new URL(url);
  u.searchParams.set("name", "orig");
  return u.toString();
}

export async function extractTweet(
  rawUrl: string,
  signal?: AbortSignal
): Promise<ExtractResult> {
  const id = parseTweetId(rawUrl);
  if (!id) return { ok: false, error: "invalid_url" };

  const token = syndicationToken(id);
  const endpoint = `https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=${token}&lang=en`;

  let res: Response;
  try {
    res = await fetch(endpoint, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 Safari/605.1.15",
        accept: "application/json",
      },
      signal,
    });
  } catch {
    return { ok: false, error: "syndication_error" };
  }

  if (res.status === 404) return { ok: false, error: "tweet_not_found" };
  if (res.status === 429) return { ok: false, error: "rate_limited" };
  if (!res.ok) return { ok: false, error: "syndication_error" };

  let data: SyndicationResponse;
  try {
    data = (await res.json()) as SyndicationResponse;
  } catch {
    return { ok: false, error: "syndication_error" };
  }

  const username = data.user?.screen_name ?? "twitter";
  const media = data.mediaDetails ?? [];

  if (!media.length) return { ok: false, error: "no_media" };

  const first = media[0];

  if (first.type === "photo") {
    const variants: MediaVariant[] = media
      .filter((m) => m.type === "photo")
      .map((m) => ({
        quality: "original",
        url: originalImageUrl(m.media_url_https),
        width: m.original_info?.width,
        height: m.original_info?.height,
        contentType: "image/jpeg",
      }));
    return {
      ok: true,
      type: "photo",
      tweetId: id,
      username,
      text: data.text,
      variants,
      thumbnail: first.media_url_https,
    };
  }

  const videoInfo = first.video_info ?? data.video;
  if (!videoInfo?.variants?.length) {
    return { ok: false, error: "no_media" };
  }

  const mp4Variants = videoInfo.variants
    .filter((v) => v.content_type === "video/mp4")
    .sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0));

  if (!mp4Variants.length) return { ok: false, error: "no_media" };

  const variants: MediaVariant[] = mp4Variants.map((v) => ({
    quality: pickQuality(v.bitrate),
    url: v.url,
    contentType: v.content_type,
    bitrate: v.bitrate,
  }));

  return {
    ok: true,
    type: first.type,
    tweetId: id,
    username,
    text: data.text,
    variants,
    thumbnail: first.media_url_https,
  };
}
