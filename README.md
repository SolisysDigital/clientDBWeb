# Client Management App

A clean, modern React application for managing client information with CRUD operations. Built with React, Express, and connected to Supabase PostgreSQL database.

## Features

- ✅ Add, edit, and delete clients
- ✅ Search functionality
- ✅ Clean, responsive UI with Tailwind CSS
- ✅ Real-time data with Supabase database
- ✅ Type-safe with TypeScript

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: Supabase PostgreSQL
- **Build**: Vite

## Deployment to Vercel

### Prerequisites
1. GitHub account
2. Vercel account (free)
3. Your Supabase `DATABASE_URL`

### Steps to Deploy

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Vercel will automatically detect the configuration

3. **Set Environment Variables**:
   - In Vercel dashboard, go to your project settings
   - Add environment variable:
     - `DATABASE_URL`: Your Supabase connection string

4. **Deploy**:
   - Click "Deploy" and Vercel will build and deploy your app
   - Your app will be available at a `.vercel.app` URL

## Environment Variables

Required environment variable:
- `DATABASE_URL`: Your Supabase PostgreSQL connection string

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   # Create .env file with:
   DATABASE_URL=your_supabase_connection_string
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

## Database Schema

The app uses a simple `clients` table:
```sql
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```