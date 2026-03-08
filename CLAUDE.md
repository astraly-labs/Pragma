# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Pragma Oracle UI — a Next.js 15 application (React 19, TypeScript 5.8) providing the web interface for Pragma, a modular provable oracle on Starknet. The codebase lives at the repository root (not in a subdirectory). Uses Bun as the package manager and runtime.

## Development Commands

Run from the repository root:

```bash
bun run dev          # Start development server (http://localhost:3000)
bun run build        # Build for production
bun run start        # Start production server
bun run type-check   # Run TypeScript type checking
```

## Architecture Overview

### App Structure

- **App Router**: Next.js 15 app directory with route groups
- **Route Groups**:
  - `(marketing)/` — Public pages: landing (`/`), ecosystem, resources, terms, privacy-policy
  - `(dashboard)/` — Data explorer pages: assets list, single asset detail, provider detail
- **Hybrid Rendering**: Marketing pages are SSR-eligible components; dashboard pages are async server components with `Suspense` boundaries and `ErrorBoundary`
- **Co-located Route Files**: Each route has `_components/`, `_helpers/`, `_types/` directories (underscore prefix excludes them from routing)

### Key Directories

- `src/app/` — Next.js App Router pages and layouts
- `src/components/` — React components organized by feature
- `src/lib/` — Shared utilities, config, providers, animation presets
- `src/hooks/` — Custom React hooks (e.g. `useIsMobile`)
- `src/services/` — External service integrations (Starknet status, wallet, address)
- `src/providers/` — React Context providers (DataProvider, SearchContext)
- `src/pages/api/` — API routes (Pages Router for API endpoints)
- `src/abi/` — Starknet contract ABIs (Oracle, ERC20)
- `src/styles/` — Global CSS with font-face declarations and CSS custom properties
- `src/utils/` — Utility functions and type mappings
- `utils/` — Root-level legacy utilities (felt conversions, URL encoding, display helpers, currency mappings)

### Data Flow

- **SSE Streaming**: `/api/stream` proxies to internal API for real-time price updates via `fetch` + `ReadableStream`
- **On-chain Data**: `/api/onchain` fetches Starknet mainnet oracle data
- **Token API**: `/api/tokens/all` and `/api/tokens/add` for token management
- **Server Components**: Dashboard pages fetch data at request time directly from the internal API
- **State Management**: TanStack Query (`staleTime: Infinity`) for server state, React Context (`DataProvider`) for UI state with source switching
- **Two Data Sources**: "mainnet" (on-chain) and "api" (real-time SSE), switchable by the user

### Component Organization

- `Landing/` — Marketing page sections: Hero (Lottie animation), MarqueeLogo, MetricsBar, CodeSnippet, Architecture, Events, Testimonial, Blog
- `Assets/` — Asset price display, publisher pairs, checkpoints
- `Navigation/` — NavHeader, NavFooter, NavPopover, SearchBar (glassmorphism design)
- `Ecosystem/` — BasicHero, StatsBox, DataProviders, ProvidersList, CustomerCarousel
- `Resources/` — ResourcesHero, PriceFeedBox, CompFeedBox, VerifRandBox
- `common/` — Reusable primitives: BlurBox, GlassCard, ScrollReveal, GreenText, CopyCode, NetworkSelection, ReadyBox
- `ui/` — shadcn/ui components (New York style, neutral base, CSS variables)
- `Provider/` — StarknetProvider (Braavos, ArgentX, WebWallet, ArgentMobile wallets)
- `v2/` — Version 2 specific components

### API Routes (Pages Router)

| Route             | Purpose                                                                                |
| ----------------- | -------------------------------------------------------------------------------------- |
| `/api/stream`     | SSE proxy for real-time price streaming (accepts `pairs[]`, `interval`, `aggregation`) |
| `/api/onchain`    | Fetches on-chain price data by network and pair                                        |
| `/api/tokens/all` | Lists all available tokens                                                             |
| `/api/tokens/add` | Adds new tokens (requires Bearer auth)                                                 |

### Styling

- **Tailwind CSS 3.4** with class-based dark mode and custom typography plugin (h1–h5 with responsive breakpoints)
- **SCSS Modules** for component-specific styles (Navigation, Assets, Landing, Ecosystem, Resources, common, v2)
- **shadcn/ui** configured via `components.json` (New York style)
- **Custom fonts**: IBM Plex Sans (sans), IBM Plex Mono (mono) — loaded from `public/fonts/`
- **Color scheme**: darkGreen primary, green/lightGreen/mint accents, glassmorphism with backdrop-blur-sm
- **Animations**: Framer Motion with shared presets (`src/lib/animations.ts`), Lottie for hero, custom CSS keyframes (blob, float, pulse-glow, drift, marquee)
- **Path alias**: `@/*` maps to `./src/*`

### Key Environment Variables

- `API_KEY` — Server-side API key for internal Pragma API (`x-api-key` header)
- `NEXT_PUBLIC_API_URL` — Public API base URL
- `NEXT_PUBLIC_APP_URL` — Application URL for metadata
- `NEXT_PUBLIC_INTERNAL_API` — Internal API for data fetching (stream, onchain, tokens, publishers)
- `NEXT_PUBLIC_TOKEN_API_URL` — Token management API

### Blockchain Integration

- **Network**: Starknet mainnet (Blast RPC endpoint), Voyager explorer
- **Wallet connection**: StarknetKit with Braavos, ArgentX, WebWallet, ArgentMobile
- **Libraries**: starknet.js 6.24, @starknet-react/core 2.2
- **Contract ABIs**: Oracle and ERC20 in `src/abi/`

### Key Dependencies

- **Framework**: Next.js 15.2, React 19, TypeScript 5.8
- **Data**: TanStack Query 5, TanStack Table 8, event-source-polyfill
- **UI**: Radix UI primitives, lucide-react icons, shadcn/ui
- **Animation**: Framer Motion 11, Lottie React, Embla Carousel
- **Charts**: lightweight-charts 4.2, Recharts 2.15
- **Blockchain**: starknet 6.24, starknetkit 1.1, @starknet-react/core 2.2
- **Analytics**: @vercel/analytics, @vercel/speed-insights

## Development Notes

### Asset Management

- Currency icons: `public/assets/currencies/` (~62 SVG icons)
- Lottie animations: `public/assets/lottie/`
- Ecosystem/publisher logos: `public/assets/ecosystem/`, `public/assets/publishers/`
- Blog post images: `public/assets/posts/` (WebP format)
- Cairo code snippets imported as raw strings via webpack config for code examples

### Next.js Config

- `reactStrictMode: true`, `poweredByHeader: false`, `compress: true`
- Image optimization: AVIF + WebP, 24-hour cache TTL, remote patterns for coingecko.com
- Static asset caching: 1-year immutable cache for `/assets/` and `/fonts/`
- `.cairo` files loaded as raw text via webpack `asset/source` rule
