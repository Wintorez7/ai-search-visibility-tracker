# 🚀 AEO Tracker — AI Search Visibility Dashboard

AEO Tracker is a **Next.js 14 + TypeScript** based analytics dashboard that tracks brand visibility across major **AI Search Engines** like ChatGPT, Gemini, Claude, and Perplexity.  
It helps teams understand how often their website or brand appears in AI-generated answers and provides insights to improve visibility.

---

## 🌟 Features

✅ **User Authentication** — Secure login using [Clerk](https://clerk.dev)  
✅ **Dynamic Dashboard** — Personalized visibility reports for each user  
✅ **Data Visualization** — Interactive charts powered by [Recharts](https://recharts.org/)  
✅ **KPI Cards** — Summarize key metrics (Visibility Score, Avg Position, etc.)  
✅ **Charts & Analytics**
- **Visibility Trend Chart** (7-day performance)
- **Engine Breakdown Chart** (Platform-wise visibility comparison)
✅ **Keyword Table** — Detailed tracking of keyword rankings across AI engines  
✅ **AI Recommendations Panel** — Suggests improvements based on trends  
✅ **Responsive UI** — Built using [ShadCN UI](https://ui.shadcn.com) + TailwindCSS  
✅ **TypeScript + Modular Structure** — Clean, scalable code architecture  

---

## 🧱 Tech Stack

| Category | Tech |
|-----------|------|
| Framework | **Next.js 14 (App Router)** |
| Language | **TypeScript** |
| Styling | **TailwindCSS + ShadCN/UI Components** |
| Charts | **Recharts** |
| Auth | **Clerk Authentication** |
| Deployment | **Vercel** |
| State | React Hooks |
| Icons | [Lucide Icons](https://lucide.dev) |


### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Wintorez7/ai-search-visibility-tracker
cd aeo-tracker

2️⃣ Install Dependencies
npm install


3️⃣ Set Up Environment Variables

Create a .env.local file in the root directory and add the following:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_d2lzZS1hZGRlci00MC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_bxoBjptrhIwUQ5ggamUNOb7cZwhftAgY3bJkr1pqCn

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
MONGODB_URI=mongodb+srv://mohanKumhar:MK2025@cluster0.zlg15hi.mongodb.net/



🧩 Running the Project
🖥 Development
npm run dev

