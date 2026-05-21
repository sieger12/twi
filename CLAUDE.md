@AGENTS.md

# 트위다운로더 — Twitter/X Video Downloader

## 개요

Twitter(X) 영상/GIF/이미지/MP3 다운로드 웹서비스. AdSense 수익, SEO 1페이지 노출이 목표.

## 스택

- Next.js 16 (Pages Router), TypeScript, Tailwind v4
- i18n: Next.js 내장 라우팅 + next-i18next (30개 언어)
- SEO: next-seo, next-sitemap, 자체 JSON-LD
- Icons: lucide-react
- pnpm

## Next.js 16 주의사항

- `middleware.ts` → `proxy.ts`로 이름 변경
- Pages Router i18n 라우팅 그대로 지원 (locales 최대 100개)
- 30개 locale × N페이지 = `getStaticProps` 호출 폭증 — fallback 'blocking' 고려

## 단일 진실의 원천

`src/lib/site.ts` — `SITE_URL`, `SITE_NAME`, `LOCALES`, `DEFAULT_LOCALE` 한 곳에 정의.
배포 도메인 변경 시 이 파일만 수정.

## 디자인

- 포인트 컬러: 일렉트릭 라임 (#d4ff3a) — 경쟁사 파란 계열과 차별
- 다크 기본, 라이트 지원
- 폰트: Bricolage Grotesque (display) + Geist Sans (body)
- 금지: Inter, Roboto, Arial / 보라+흰 그라디언트 / 뻔한 카드 / 과한 그림자

## 콘텐츠 톤

❌ "In today's digital age", "Whether you're a", "It's worth noting"
✅ "Paste the link. Pick the format. Download."
문장 길이 불규칙, FAQ는 구어체, 형용사 나열 금지.

## i18n 30개 언어

en (기본, prefix 없음), vi, ar, cs, de, es, fr, hi, id, it, ja, ko, pl, pt, ro, ru, th, tr, uk, zh-CN, zh-TW, ms, hu, nl, el, he, fa, nb, sv, fi

RTL: ar, he, fa.

## 페이지 (Phase 1 MVP)

- `/` 메인 — 전체 키워드 타겟 (x downloader 240K, twitter video downloader 1.5M)
- `/twitter-to-mp3` — twitter to mp3 (9.6K, KD 11%)
- `/twitter-image-downloader` — twitter image downloader (12.2K, KD 20%)
- `/twitter-gif-downloader` — twitter gif downloader (83K, KD 25%)

## 구조화 데이터

- 메인: WebApplication + FAQPage + HowTo
- 서브: FAQPage + HowTo + BreadcrumbList

## 컴포넌트 명명

`TweetUrlInput`, `HowToSteps`, `FeatureGrid`, `AudioFaq`, `FaqSchema`, `LanguageSwitcher`, `SiteNav`, `SiteFooter`, `SeoHead` — 주제 특화. 범용 이름(Card/Button) 금지.

## Phase 1 미구현

다운로드 API는 Phase 2. UI/SEO만 완성. 모든 텍스트 i18n 키로 관리, 하드코딩 금지.
