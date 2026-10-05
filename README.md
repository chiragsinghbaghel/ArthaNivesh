# ArthaNivesh Financial Research 📈
> Institutional-Grade Indian Stock Market Research & Advisory Web Platform

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![SEBI Compliant Architecture](https://img.shields.io/badge/Compliance-SEBI_RA_Standard-emerald.svg)](#)

---

## 🚀 Key Features

- **Live Market Research & Benchmark Ticker**: Real-time ticker and interactive Indian market pulse (Nifty 50, Bank Nifty, Sensex, Reliance, HDFC Bank, TCS, Gold, Crude).
- **Real-Time Stock Search & Quote Lookup**: Search 60+ Indian equities by ticker or company name with real-time price ticks, Day's Range, 52-Week Range, P/E, Beta, Market Cap, ArthaNivesh Research Stance (BUY/ACCUMULATE/HOLD), and interactive OHLC charts.
- **Dedicated Full-Screen Service Explorer**: Comprehensive deep-dive page for all research products (Stock Cash, Stock Future, Stock Option, Turtles Treasure, Index, MCX) with strategy overview, 4-step setup protocol, and official alert templates.
- **Dark Mode & White (Light) Mode**: Instant toggle with persistent preference in `localStorage`.
- **SEBI-Compliant Risk Profiling Assessment**: 12-question investor suitability questionnaire with scoring and asset allocation breakdown.
- **Admin Dashboard Console**: Password-protected demo portal (`admin123`) to manage research calls, download enquiries, and track grievance tickets.
- **Formal Investor Grievance Redressal**: Submission and real-time reference number tracking (SCORES & SMART ODR integrated workflow).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Deployment Ready**: GitHub Actions CI/CD workflow included

---

## 📦 Node.js Setup & Local Execution

### 1. Install Node.js
If you don't have Node.js installed on your system:
- **Windows / macOS**: Download and run the official installer from [nodejs.org](https://nodejs.org) (Recommended: LTS v20 or v22).
- **Linux (Ubuntu/Debian)**:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- **Verify installation**:
  ```bash
  node -v   # Should output v20.x or v22.x
  npm -v    # Should output 10.x or higher
  ```

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/<your-username>/arthanivesh-financial-research.git
cd arthanivesh-financial-research
npm install
```

### 3. Run the Application

- **Option A: Quick Frontend Dev Server (Vite)**
  ```bash
  npm run dev
  ```
  Runs at [http://localhost:3000](http://localhost:3000)

- **Option B: Full-Stack Node.js Express Server (`server.ts`)**
  ```bash
  npm run dev:server
  ```
  Starts Node.js Express with Vite middleware and `/api/*` endpoints.

- **Option C: Production Build & Node.js Production Server**
  ```bash
  npm run build
  npm start
  ```

---

## 🌐 Deploy to GitHub & GitHub Pages (Step-by-Step)

### Option 1: Automatic Deployment with GitHub Pages (Recommended)

1. **Initialize Git and commit your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ArthaNivesh Financial Research Platform"
   ```

2. **Create a new repository on GitHub:**
   - Go to [GitHub New Repository](https://github.com/new).
   - Name your repository (e.g. `arthanivesh` or `stock-research`).
   - Leave it public or private.

3. **Link your local repository and push:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Go to your repository on GitHub.
   - Click **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
   - The included workflow file (`.github/workflows/deploy.yml`) will automatically trigger, build the application, and publish it live!
   - Your website will be live at:
     ```
     https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/
     ```

---

### Option 2: Deploy to Vercel (1-Click)

1. Import your GitHub repository into [Vercel](https://vercel.com/new).
2. Framework Preset: **Vite**.
3. Root Directory: `./`.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**!

---

### Option 3: Deploy to Netlify

1. Link your GitHub repository in [Netlify](https://app.netlify.com/start).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Click **Deploy site**!

---

## 📄 License & Compliance

Designed and built in strict accordance with the SEBI (Research Analysts) Regulations, 2014. No assured return claims or automated trading execution.
