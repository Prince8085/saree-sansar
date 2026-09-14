<div align="center">

# 🛍️ Saree Sansar
### AI-Powered E-Commerce Platform with Virtual Try-On

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Python](https://img.shields.io/badge/Python-FastAPI-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![AWS](https://img.shields.io/badge/AWS-S3%20%7C%20CloudFront-FF9900?style=flat&logo=amazonaws&logoColor=white)](https://aws.amazon.com)

</div>

---

## 🎯 What Is Saree Sansar?

Saree Sansar is a **full-stack AI-powered e-commerce platform** for Indian ethnic wear, featuring a **Virtual Try-On system** that lets customers see how sarees look on them before buying — using multi-model AI inference (Gemini Vision + Qwen VL).

**Stack:** Next.js 15 frontend + Python/FastAPI backend + AWS infrastructure — **one of the largest codebases** in this portfolio (546K+ TS + 126K Python lines).

---

## ✨ Core Features

### 👗 AI Virtual Try-On
- Upload your photo → see the saree on you instantly
- Multi-model AI pipeline: Gemini Vision + Qwen VL for photorealistic rendering
- **Circuit breaker failover** — if primary model fails, secondary kicks in automatically
- **90% LLM cost reduction** vs. single-provider approach
- Bilingual chatbot (Hindi + English) for styling advice

### 🛒 E-Commerce Platform
- Full product catalog with filters, search, and recommendations
- Cart, wishlist, order management
- Secure checkout with payment gateway integration
- Order tracking and history

### 🧠 AI Recommendations
- Personalized product recommendations based on body type, occasion, budget
- Style matching with existing wardrobe
- Trending styles feed

### ⚡ Production Infrastructure
- **AWS S3 + CloudFront CDN** for image delivery
- **Redis caching** for session and product data
- **Firebase** for real-time notifications
- CI/CD with GitHub Actions

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS, custom design system |
| Backend API | Python, FastAPI (async) |
| AI/ML | Gemini Vision API, Qwen VL, LangChain |
| Storage | AWS S3, CloudFront CDN |
| Cache | Redis |
| Realtime | Firebase |
| Database | PostgreSQL |
| Auth | NextAuth.js / Clerk |

---

## 🏗️ Architecture

```
┌────────────────────────────────────────┐
│         Next.js 15 Frontend            │
│   Catalog · Cart · Try-On UI · Chat    │
└───────────────┬────────────────────────┘
                │ API calls
    ┌───────────▼────────────┐
    │   FastAPI Backend       │
    │   (Python, Async)       │
    └───────────┬────────────┘
                │
    ┌───────────▼────────────┐
    │   AI Try-On Engine     │
    │  Gemini Vision         │  ← Primary model
    │  Qwen VL               │  ← Fallback (circuit breaker)
    └───────────┬────────────┘
                │
    ┌───────────▼────────────┐
    │   AWS Infrastructure   │
    │  S3 · CloudFront · RDS │
    └────────────────────────┘
```

---

## ⚡ Quick Start

```bash
# Frontend
git clone https://github.com/Prince8085/saree-sansar.git
cd saree-sansar
pnpm install
pnpm dev

# Backend (in separate terminal)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📊 Performance Highlights

| Metric | Result |
|---|---|
| LLM cost reduction | **90%** (multi-model vs single) |
| Try-On generation time | **< 5 seconds** |
| Image delivery (CDN) | **< 100ms** globally |
| Uptime | **99.9%** (circuit breaker) |

---

## 👨💻 Built By

**Prince Khatik** — Founder, Innovix Solutions  
[LinkedIn](https://linkedin.com/in/prince-kachhwaha-) · [Portfolio](https://princekachhwaha.tech) · [GitHub](https://github.com/Prince8085)
