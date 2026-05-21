# 트위다운로더 — Twitter/X Video Downloader

## 프로젝트 개요

Twitter(X) 영상, GIF, 이미지, MP3를 다운로드하는 웹 서비스.
Google AdSense 수익을 목적으로 하며, 검색 엔진 최적화(SEO)가 핵심 성공 요인이다.
사이트맵 제출 즉시 구글 상위 노출을 목표로 한다.

## 기술 스택

- **Framework**: Next.js (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (커스텀 디자인 시스템 기반)
- **i18n**: next-i18next (30개 언어)
- **SEO**: next-seo, next-sitemap
- **Icons**: lucide-react
- **Deployment**: Vercel
- **Package Manager**: pnpm

## 디자인 선언 (4축)

1. **독창성**: 경쟁 사이트들의 뻔한 파란색/하얀색 레이아웃을 탈피한다. AI가 만든 티가 나지 않아야 한다.
2. **속도감**: 도구 사이트이므로 사용자가 3초 내에 URL을 붙여넣고 다운로드 버튼을 누를 수 있어야 한다.
3. **신뢰감**: 깔끔하고 프로페셔널한 UI로 "이 사이트는 안전하다"는 인상을 준다.
4. **가벼움**: Core Web Vitals 기준 LCP < 2.5초, CLS < 0.1. 불필요한 애니메이션/그라디언트 없이 미세한 인터랙션만 사용한다.

## 디자인 가이드라인

### 절대 금지 (AI 느낌 제거)
- Inter, Roboto, Arial 등 범용 폰트 사용 금지
- 보라색+흰색 그라디언트 조합 금지
- 뻔한 카드 레이아웃 반복 금지
- 과도한 그림자, 글로우, 네온 이펙트 금지
- Hero 섹션에 stock illustration/emoji 남발 금지

### 지향
- 한 가지 강렬한 포인트 컬러 + 뉴트럴 베이스 조합
- 타이포그래피 위계가 명확한 구조 (Display → Heading → Body → Caption)
- 마이크로 인터랙션은 버튼 hover, 입력 필드 포커스, 다운로드 진행 상태 정도로 제한
- 여백을 넉넉히 사용해서 도구 사이트답게 "바로 할 일"이 눈에 들어오게
- 다크/라이트 모드 지원

## SEO 키워드 전략 (Semrush 실데이터 기반)

### 페이지별 타겟 키워드

#### 메인 페이지 (/)
**Title**: `X Video Downloader — Download Twitter Video Online Free`
**H1**: `Download Twitter (X) video, GIF, image online`
**H2 예시**: `Save Twitter video to MP4 in HD quality`

| 키워드 | Global Vol | KD | 배치 위치 |
|--------|-----------|-----|---------|
| x downloader | 240.3K | 39% | title, H1 |
| x video downloader | 202.6K | 39% | title, description |
| download twitter video | 896.6K | 67% | H1, H2, 본문 |
| twitter video downloader | 1.5M | 74% | description, 본문 |
| twitter downloader | 728.4K | 79% | description |
| download x video | 77K | 36% | 본문 |
| save twitter video | 48.3K | 60% | FAQ |
| save x video | 1.1K | 49% | FAQ |
| twitter video download online | 29.2K | 50% | H2 "online" 포함 |
| twitter video download hd | 27.1K | 65% | 본문 "HD, 1080p, 4K" 언급 |

**FAQ 섹션 키워드** (각 질문이 하나의 롱테일 타겟):
- How to download Twitter video? (메인 how-to)
- How to download Twitter video on iPhone? (3.5K, KD 50%)
- How to download Twitter video on Android? (1K)
- How to save video from Twitter? (save 계열 흡수)
- Is Twitter video downloader safe? (신뢰 키워드)
- How to download Twitter video in HD? (품질 키워드)
- Where are downloaded Twitter videos saved? (초보 사용자 타겟)
- Do I need to pay to download Twitter video? (무료 키워드)

#### 서브페이지 1: /twitter-to-mp3 (MVP 1순위)
**Title**: `Twitter to MP3 — Convert Twitter Video to MP3 Online`
**H1**: `Twitter to MP3 converter`

| 키워드 | Global Vol | KD | 배치 위치 |
|--------|-----------|-----|---------|
| x to mp3 | 1K | 6% | title, H1 |
| twitter to mp3 | 9.6K | 11% | title, H1, description |
| convert twitter video to mp3 | 320 | 14% | H2, 본문 |
| twitter video to mp3 | 590 | 47% | 본문 |

#### 서브페이지 2: /twitter-image-downloader (MVP 2순위)
**Title**: `Twitter Image Downloader — Download Twitter Photo in HD`
**H1**: `Download image from Twitter (X)`

| 키워드 | Global Vol | KD | 배치 위치 |
|--------|-----------|-----|---------|
| twitter image downloader | 12.2K | 20% | title, H1, description |
| twitter photo downloader | - | - | title (photo 변형) |
| x media downloader - twitter image | 170 | 26% | 본문 |

#### 서브페이지 3: /twitter-gif-downloader (MVP 3순위)
**Title**: `Twitter GIF Downloader — Save GIF from Twitter as MP4`
**H1**: `Download GIF from Twitter (X)`

| 키워드 | Global Vol | KD | 배치 위치 |
|--------|-----------|-----|---------|
| twitter gif downloader | 83K | 25% | title, H1, description |
| downloading gif from twitter | 2.9K | 30% | 본문 |
| twitter gif to mp4 | 490 | 51% | H2/본문 |
| gif downloader twitter | 2.4K | 24% | 본문 변형 |

#### 서브페이지 4: /twitter-to-mp4 (2차 — 경쟁자 빈자리)
**Title**: `Twitter to MP4 — Convert & Download Twitter Video as MP4`
**H1**: `Twitter to MP4 converter`

| 키워드 | Global Vol | KD | 배치 위치 |
|--------|-----------|-----|---------|
| twitter to mp4 | 102K | 69% | title, H1, description |
| twitter video to mp4 | 12.1K | 63% | H2 |
| convert twitter video to mp4 | 2.9K | 43% | 본문 |

### 트래픽 국가별 다국어 우선순위

Semrush 데이터 기반, 트래픽 볼륨이 큰 국가 순서:

| 순위 | 국가 | 언어 | 핵심 키워드 볼륨 기여 |
|------|------|------|---------------------|
| 1 | US | English | 기본 |
| 2 | Indonesia | Bahasa Indonesia | x downloader 74K, download twitter video 60.5K |
| 3 | India | Hindi | x video downloader 33.1K, twitter video download hd 22.2K |
| 4 | Philippines | Filipino/English | download twitter video 110K (공유) |
| 5 | Pakistan | Urdu/English | x video downloader 18.1K |
| 6 | Vietnam | Tiếng Việt | download twitter video android 260 |
| 7 | Nigeria | English | x downloader 8.1K |
| 8 | Brazil | Português | twitter to mp4 720 |
| 9 | Germany | Deutsch | twitter image downloader 480 |
| 10 | Japan | 日本語 | twitter image downloader 390 |

## 다국어 지원 (30개 언어)

next-i18next로 구현. 각 언어별 폴더 구조:
```
public/locales/
├── en/common.json
├── vi/common.json
├── ar/common.json
├── cs/common.json
├── de/common.json
├── es/common.json
├── fr/common.json
├── hi/common.json
├── id/common.json
├── it/common.json
├── ja/common.json
├── ko/common.json
├── pl/common.json
├── pt/common.json
├── ro/common.json
├── ru/common.json
├── th/common.json
├── tr/common.json
├── uk/common.json
├── zh-CN/common.json
├── zh-TW/common.json
├── ms/common.json
├── hu/common.json
├── nl/common.json
├── el/common.json
├── he/common.json
├── fa/common.json
├── nb/common.json (Norwegian Bokmål)
├── sv/common.json
└── fi/common.json
```

**RTL 지원 필수**: ar (아랍어), he (히브리어), fa (페르시아어)는 dir="rtl" 적용.

**hreflang 태그**: 모든 페이지에 30개 언어 hreflang alternate 태그 자동 생성.

## 컴포넌트 명명 규칙

주제 특화된 이름을 사용한다. 범용 이름(Input, Card, Button) 금지.

| 컴포넌트 | 역할 |
|---------|------|
| `TweetUrlInput` | URL 입력 필드 + 붙여넣기/다운로드 버튼 |
| `FormatPicker` | MP4/MP3/GIF 포맷 선택 |
| `QualitySelector` | HD/SD/1080p 품질 선택 |
| `DownloadProgress` | 다운로드 진행 상태 표시 |
| `MediaResult` | 다운로드 결과 (썸네일 + 다운로드 버튼들) |
| `HowToSteps` | 사용 방법 3단계 설명 |
| `AudioFaq` | FAQ 아코디언 (FAQ Schema 마크업 포함) |
| `FeatureGrid` | 기능 소개 그리드 |
| `LanguageSwitcher` | 언어 선택 드롭다운 |
| `SiteNav` | 상단 내비게이션 (서브페이지 링크 포함) |
| `SiteFooter` | 하단 푸터 (About, Terms, Privacy, Contact) |
| `SeoHead` | 페이지별 SEO 메타 태그 (next-seo 래퍼) |
| `FaqSchema` | FAQ 구조화 데이터 (JSON-LD) |

## SEO 콘텐츠 작성 규칙 (AI 티 제거)

### 절대 금지 표현
- "In today's digital age..."
- "Whether you're a..."
- "It's worth noting that..."
- "In conclusion..."
- "게다가", "뿐만 아니라" 같은 접속사 남발
- 모든 문장이 같은 길이/구조로 반복되는 패턴
- 불필요한 형용사 나열 ("fast, easy, simple, convenient, reliable")

### 지향하는 톤
- 도구 설명은 짧고 직접적으로. "Paste the link. Pick the format. Download."
- FAQ 답변은 실제 사람이 설명하듯 구어체로. 완벽한 문법보다 자연스러움 우선.
- 문장 길이를 의도적으로 불규칙하게. 짧은 문장 → 긴 문장 → 중간 문장 섞기.
- 가끔 불완전한 문장도 OK. "Works on Chrome, Firefox, Safari. Even Edge."
- 각 언어별 콘텐츠는 단순 번역이 아니라 해당 언어권의 자연스러운 표현으로 작성.

## 사이트맵 & 인덱싱 전략

next-sitemap 설정:
```js
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://도메인',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  alternateRefs: [
    // 30개 언어 alternate refs 자동 생성
  ],
  transform: async (config, path) => {
    // 메인 페이지 priority 1.0
    // 서브페이지 priority 0.9
    // 언어별 페이지 priority 0.8
    const priority = path === '/' ? 1.0 : path.includes('/') ? 0.9 : 0.8;
    return {
      loc: path,
      changefreq: 'daily',
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
```

## 구조화 데이터 (Schema.org)

모든 페이지에 적용:
- **WebApplication**: 메인 페이지
- **FAQPage**: FAQ 섹션이 있는 모든 페이지
- **BreadcrumbList**: 서브페이지
- **HowTo**: 사용 방법 섹션

## 빌드 순서

### Phase 1 — MVP (즉시)
1. 프로젝트 초기화 (Next.js + TypeScript + Tailwind + pnpm)
2. 디자인 시스템 구축 (색상, 타이포, 스페이싱)
3. 레이아웃 (SiteNav, SiteFooter, LanguageSwitcher)
4. 메인 페이지 (TweetUrlInput + HowToSteps + FeatureGrid + AudioFaq)
5. /twitter-to-mp3 서브페이지
6. /twitter-image-downloader 서브페이지
7. /twitter-gif-downloader 서브페이지
8. i18n 설정 + 30개 언어 번역 파일
9. SEO 메타 태그 + 구조화 데이터
10. next-sitemap 설정
11. Vercel 배포 + Google Search Console 등록

### Phase 2 — 확장
12. /twitter-to-mp4 서브페이지
13. 다운로드 API 연동 (백엔드)
14. AdSense 설정
15. 성능 최적화 (이미지, 폰트, lazy loading)

## 파일 구조
```
트위다운로더/
├── public/
│   ├── locales/          # 30개 언어 번역 파일
│   ├── icons/            # favicon, apple-touch-icon
│   └── robots.txt        # next-sitemap이 자동 생성
├── src/
│   ├── components/
│   │   ├── TweetUrlInput.tsx
│   │   ├── FormatPicker.tsx
│   │   ├── QualitySelector.tsx
│   │   ├── DownloadProgress.tsx
│   │   ├── MediaResult.tsx
│   │   ├── HowToSteps.tsx
│   │   ├── AudioFaq.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── SiteNav.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── SeoHead.tsx
│   │   └── FaqSchema.tsx
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx                    # 메인
│   │   ├── twitter-to-mp3.tsx           # MP3 변환
│   │   ├── twitter-image-downloader.tsx # 이미지
│   │   ├── twitter-gif-downloader.tsx   # GIF
│   │   └── twitter-to-mp4.tsx           # MP4 (Phase 2)
│   ├── styles/
│   │   └── globals.css
│   ├── lib/
│   │   └── seo.ts        # 페이지별 SEO 설정 데이터
│   └── types/
│       └── index.ts
├── next.config.js
├── next-i18next.config.js
├── next-sitemap.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

## 주의사항

- 다운로드 API는 Phase 2에서 별도 구현. Phase 1에서는 UI/SEO만 완성한다.
- 모든 텍스트는 i18n 키로 관리. 하드코딩된 문자열 없어야 한다.
- RTL 언어(ar, he, fa)는 레이아웃 미러링 처리.
- 이미지는 next/image로 최적화. 외부 이미지 URL은 next.config.js domains에 등록.
- Google Fonts는 next/font로 로드해서 CLS 방지.
- 모든 페이지에 canonical URL 설정.
- 광고 영역은 placeholder로 미리 잡아두되, Phase 1에서는 비활성.