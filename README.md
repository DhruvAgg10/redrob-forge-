# Forge — by Redrob

The verification layer Redrob is missing. Skills-first hiring, portable W3C credentials, and a real-work funnel — shipped as 8 new tiles inside Redrob today.

**Live demo:** open `/` and tap the **Presentation** or **Survey · pricing** buttons in the top-right.

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | Tailwind v4 + Framer Motion + React Flow + Mermaid |
| Database | PostgreSQL via Prisma |
| AI | Hugging Face Inference Router → Llama 3.3 70B + Qwen 2.5 72B |
| Credentials | W3C VC 2.0 + Open Badges 3.0 (Ed25519 signed via @noble/ed25519) |
| PDF parsing | unpdf |

## Local development

```bash
npm install
cp .env.example .env
# Fill in DATABASE_URL, HF_TOKEN, FORGE_ISSUER_PRIVATE_KEY in .env
npm run db:push
npm run db:seed
npm run dev
```

## Deploy to Vercel

1. **Push this repo to GitHub** (private or public).
2. **Create a Vercel Postgres database**:
   - Vercel dashboard → Storage → Create → Postgres → Hobby tier (free)
   - Note the connection string
3. **Import the GitHub repo into Vercel**:
   - Vercel dashboard → Add New → Project → Import from GitHub
   - Framework preset: Next.js
4. **Add env vars** in Project Settings → Environment Variables:
   - `DATABASE_URL` — from Vercel Postgres (pooled connection)
   - `HF_TOKEN` — from https://huggingface.co/settings/tokens
   - `HF_MODEL` — `meta-llama/Llama-3.3-70B-Instruct`
   - `FORGE_ISSUER_PRIVATE_KEY` — any 64-char hex string
   - `NEXT_PUBLIC_FORGE_ISSUER_DID` — `did:web:forge.redrob.ai`
5. **Deploy**. The build will: generate Prisma client → push schema to Postgres → seed (idempotent) → build Next.js.

## Key URLs

| URL | What |
|---|---|
| `/` | Redrob App Store with 8 NEW Forge tiles |
| `/presentation` | 12-slide pitch deck (keyboard nav: ← →) |
| `/survey` | Pricing study results (Simulation · A/B Tests · Live Research) |
| `/survey/take` | Public survey form — shareable with anyone |
| `/path` | Career Path Engine (free, no signup) |
| `/skills` | Skill Studio — 6 MBA-relevant AI-graded exercises |
| `/challenges` | Real company sprint challenges |
| `/wallet` | W3C credential wallet |
| `/verify/[id]` | Public credential verifier — no login |

## Methodology references

LLM-as-respondent for pricing study grounded in:
- Park et al. (Stanford 2023) — Generative Agents · UIST 2023
- Argyle et al. (BYU 2023) — Out of One, Many · Political Analysis 31(3)
- Brand et al. (MIT Sloan 2023) — Using GPT for Market Research · HBS Working Paper 23-062
- Aher et al. (Harvard 2023) — Simulating Multiple Humans · ICML 2023
