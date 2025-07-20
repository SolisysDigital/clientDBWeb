# replit.md

## Overview

This is a full-stack client management application built with a modern tech stack. The application allows users to manage client information with features for creating, reading, updating, and deleting client records. It follows a clean architecture pattern with separate frontend and backend concerns, using TypeScript throughout for type safety.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Validation**: Zod schemas shared between frontend and backend
- **Development**: TSX for TypeScript execution

## Key Components

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Single `clients` table with fields for id, name, email, phone, and timestamps
- **Migrations**: Drizzle Kit for database schema management
- **Connection**: Neon serverless PostgreSQL driver

### API Layer
- **Structure**: RESTful API with Express.js
- **Endpoints**: CRUD operations for client management
- **Validation**: Shared Zod schemas between client and server
- **Error Handling**: Centralized error middleware
- **Logging**: Custom request/response logging middleware

### Frontend Components
- **Layout**: Fixed sidebar navigation with main content area
- **Tables**: Custom client table with avatar generation and action buttons
- **Modals**: Add/edit client modal and delete confirmation modal
- **Forms**: Validated forms using React Hook Form and Zod
- **UI Components**: Comprehensive set of Shadcn/ui components

### Shared Code
- **Schema**: Zod schemas for client data validation
- **Types**: TypeScript interfaces generated from Drizzle schemas
- **Path Aliases**: Shared TypeScript path mapping for imports

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Processing**: Express routes handle requests with validation
3. **Database Operations**: Drizzle ORM executes type-safe SQL queries
4. **Response Handling**: Data flows back through the same path
5. **State Updates**: TanStack Query manages cache invalidation and updates
6. **UI Updates**: React components re-render with fresh data

### Key Data Patterns
- **Optimistic Updates**: UI updates immediately with rollback on errors
- **Cache Management**: TanStack Query handles server state caching
- **Form Validation**: Client-side validation with server-side verification
- **Error Boundaries**: Comprehensive error handling at multiple layers

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling with performance optimization
- **@hookform/resolvers**: Zod integration for form validation

### UI Dependencies
- **@radix-ui/***: Accessible UI primitive components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional class name utility

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundling for production builds
- **drizzle-kit**: Database schema management tools

## Deployment Strategy

### Development Setup
- **Database**: Requires `DATABASE_URL` environment variable
- **Development Server**: Concurrent frontend (Vite) and backend (Express)
- **Hot Reload**: Vite HMR for frontend, TSX for backend TypeScript

### Production Build
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Static Serving**: Express serves built frontend assets
4. **Database Setup**: Drizzle migrations applied via `db:push` command

### Environment Requirements
- Node.js with ES module support
- PostgreSQL database (configured for Supabase)
- Environment variables for database connection

### Deployment
- **Platform**: Prepared for Vercel deployment
- **Configuration**: `vercel.json` with serverless function setup
- **API**: Serverless functions in `/api` directory
- **Build**: Automated build process for both frontend and backend

### Key Files
- **vercel.json**: Vercel deployment configuration
- **api/index.ts**: Serverless function handler for Vercel
- **README.md**: Deployment instructions and documentation
- **vite.config.ts**: Frontend build configuration  
- **tsconfig.json**: TypeScript configuration with path aliases
- **tailwind.config.ts**: Tailwind CSS theme configuration