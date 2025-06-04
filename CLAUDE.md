# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the Pragma Oracle UI repository - a Next.js application that provides a web interface for Pragma, a modular provable oracle on Starknet. The main application code is located in the `pragma-ui/` directory.

## Development Commands

Navigate to `pragma-ui/` directory before running these commands:

```bash
# Development
bun run dev          # Start development server (http://localhost:3000)

# Build and Type Checking  
bun run build        # Build for production
bun run start        # Start production server
bun run type-check   # Run TypeScript type checking
```

## Architecture Overview

### App Structure
- **App Router**: Uses Next.js 13+ app directory structure with route groups
- **Route Groups**: 
  - `(marketing)/` - Public pages (landing, ecosystem, resources)
  - `(dashboard)/` - Protected dashboard pages requiring authentication
- **Hybrid Rendering**: Marketing pages use SSR, dashboard uses client-side rendering

### Key Directories
- `src/app/` - Next.js app router pages and layouts
- `src/components/` - React components organized by feature
- `src/lib/` - Shared utilities, configuration, and providers
- `src/hooks/` - Custom React hooks
- `src/services/` - External service integrations
- `src/pages/api/` - API routes (Pages Router for API endpoints)

### Data Flow Architecture
- **Real-time Data**: Server-Sent Events (SSE) streaming via `/api/stream` endpoint
- **On-chain Data**: Starknet blockchain integration via `/api/onchain` endpoint  
- **State Management**: TanStack Query for server state, React Context for UI state
- **Blockchain**: Starknet integration using `@starknet-react/core`

### Component Organization
- `Landing/` - Marketing page components with animations
- `Assets/` - Asset price display and charts
- `Navigation/` - Header, footer, and navigation components
- `common/` - Reusable UI components
- `ui/` - shadcn/ui components
- `v2/` - Version 2 specific components

### Authentication & Middleware
- Token-based authentication with cookie management
- Development-only middleware for token extraction from URL params
- Dashboard routes protected via middleware

### External APIs
- Pragma API: `https://api.devnet.pragma.build/`
- Real-time price streaming
- On-chain data fetching for Sepolia and Mainnet networks

### Styling
- **Tailwind CSS** for utility-first styling
- **SCSS Modules** for component-specific styles
- **shadcn/ui** for consistent component library
- Custom color scheme with darkGreen primary color

### Key Environment Variables
- `API_KEY` - Pragma API authentication
- `NEXT_PUBLIC_APP_URL` - Application URL
- `COOKIE_NAME` - Authentication cookie name (development)
- `NODE_ENV` - Environment mode

## Development Notes

### Asset Management
- Currency icons stored in `public/assets/currencies/`
- Lottie animations in `public/assets/lottie/`
- Images optimized to WebP format when possible

### Real-time Features
- Asset price streaming using EventSource/SSE
- Custom hook patterns for real-time data subscriptions
- Fallback handling for connection issues

### Blockchain Integration
- Sepolia testnet as primary development network
- Wallet connection via StarknetKit
- Contract interactions through Starknet.js

### Data Types
- Spot price entries from multiple publishers
- Checkpoints for historical data
- Support for multiple aggregation methods (median, mean, etc.)