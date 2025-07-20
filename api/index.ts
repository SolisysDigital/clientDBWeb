import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from "express";
import { registerRoutes } from "../server/routes.js";

const app = express();

// Initialize routes
await registerRoutes(app);

// Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  return new Promise((resolve) => {
    app(req as any, res as any, resolve);
  });
}