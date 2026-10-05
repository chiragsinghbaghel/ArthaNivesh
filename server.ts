import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API Routes
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'ArthaNivesh Financial Research API',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

  // Stock Market API Proxy / Live Research Feeds
  app.get('/api/market-pulse', (_req: Request, res: Response) => {
    res.json({
      exchange: 'NSE/BSE',
      marketStatus: 'Open',
      indices: [
        { symbol: 'NIFTY 50', price: 24852.15, change: 142.35, pct: 0.58 },
        { symbol: 'NIFTY BANK', price: 53215.40, change: 322.10, pct: 0.61 },
        { symbol: 'BSE SENSEX', price: 81430.70, change: 418.90, pct: 0.52 },
        { symbol: 'INDIA VIX', price: 13.42, change: -0.65, pct: -4.62 }
      ],
      timestamp: new Date().toISOString()
    });
  });

  if (!isProduction) {
    // Development mode: Mount Vite dev server middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT
      },
      appType: 'spa'
    });

    app.use(vite.middlewares);
  } else {
    // Production mode: Serve pre-built static files from dist/
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Node.js Server] ArthaNivesh Financial Research running on http://0.0.0.0:${PORT}`);
    console.log(`[Environment] Mode: ${isProduction ? 'production' : 'development'}`);
  });
}

startServer().catch(err => {
  console.error('[Server Error] Failed to start Node.js server:', err);
  process.exit(1);
});
