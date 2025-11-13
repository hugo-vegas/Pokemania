# Pokémon Quiz Master

## Overview

A web-based Pokémon quiz game that tests players' knowledge across different Pokémon regions and difficulty levels. Players select a region (Kanto through Paldea, or General mode), choose a difficulty level, and answer questions about Pokémon. The application tracks scores, streaks, and provides immediate feedback on answers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**Routing**: Wouter (lightweight client-side routing)

**State Management**: 
- TanStack Query (React Query) for server state and data fetching
- Local component state with React hooks for UI state

**UI Component Library**: shadcn/ui components built on Radix UI primitives with Tailwind CSS styling

**Design System**:
- Pokémon-themed color palette (red, yellow, blue brand colors plus difficulty-specific colors)
- Custom typography using 'Press Start 2P' for retro gaming headers and 'Poppins' for body text
- Responsive grid layouts with Tailwind breakpoints
- Animation-heavy design with floating elements and transitions

**Key Pages**:
1. Home/Landing - Hero section with CTA to start quiz
2. Region Selection - Grid of 9 Pokémon regions plus "General" mode
3. Difficulty Selection - Four difficulty levels (Fácil, Media, Difícil, Experto)
4. Game Screen - Active quiz gameplay with question display and answer validation
5. Results Screen - Performance summary with accuracy metrics

### Backend Architecture

**Runtime**: Node.js with Express server

**API Design**: RESTful JSON API with three main endpoints:
- `GET /api/regions` - Returns available Pokémon regions
- `GET /api/pokemon/random/:region/:difficulty` - Fetches random Pokémon for quiz
- `POST /api/pokemon/validate` - Validates player's answer

**Data Storage**: In-memory storage implementation (MemStorage class) that loads Pokémon data from a JSON file. Organized by region with methods to retrieve random Pokémon or filter by region.

**Schema Validation**: Zod schemas for type-safe data validation on both client and server sides

**Development Setup**: Custom Vite middleware integration for HMR during development, with separate production build process

### External Dependencies

**UI Libraries**:
- Radix UI primitives for accessible component foundations
- Tailwind CSS for utility-first styling
- class-variance-authority and clsx for conditional class management

**Data Fetching**:
- TanStack Query v5 for async state management
- Native Fetch API for HTTP requests

**Form Handling**:
- React Hook Form with Hookform Resolvers for form state
- Zod for schema-based validation

**Database/ORM**:
- Drizzle ORM configured for PostgreSQL
- Neon serverless database driver (@neondatabase/serverless)
- Note: Database is configured but current implementation uses in-memory JSON storage

**Build Tools**:
- Vite for frontend bundling and development server
- esbuild for server-side bundling
- PostCSS with Autoprefixer for CSS processing

**Assets**: Pokémon sprite images sourced from GitHub's PokeAPI sprites repository

**TypeScript Configuration**: Shared types across client/server using path aliases (@/, @shared/, @assets/)