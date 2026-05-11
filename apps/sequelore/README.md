<p align="center">
  <img alt="Systatum" src="https://sequelore.com/favicon.ico" width="72" />
</p>

<h1 align="center">
  Sequelore
</h1>

<p align="center">
  Systems that matter.
</p>

<p align="center">
Sequelore is a modern database platform for building, managing, and shipping data-driven products with confidence.

It combines schema management, content workflows, and developer tooling into a fast, extensible Next.js-based system.

</p>

---

## ✨ Features

- ⚡ Built with Gatsby + TypeScript
- 🎨 Modern and scalable UI architecture
- 📰 RSS feed support
- 🔍 SEO and Open Graph metadata
- 🌐 Internationalization ready
- 📱 Fully responsive design
- 🚀 Static-first performance
- 🧩 Component-driven development
- 🎛 Powered by `@systatum/coneto` for consistent and reusable UI components

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/systatum.git
```

### 2. Install dependencies

```bash
cd apps/systatum
pnpm i
```

### 3. Start development server

```bash
npm run dev
```

Your site will be available at:

```bash
http://localhost:8000
```

## Project structure

```bash
pages/*
src/
├── fragments/
├── styles/
├── utils/
└── constants/

content/
├── posts/
├── authors/
└── categories/

.tina/
├── config.ts
└── __generated__/

static/* // for public app
```

## 🚀 Preview Build Guide

### 1. Push your latest changes

Push your newest changes to the pull request branch.

### 2. Verify your branch in Tina Cloud

Open Tina Cloud:

```txt
https://app.tina.io/
```

Make sure your branch has been indexed successfully.

### 3. Configure the Site URL

Add your preview deployment URL as the `Site URL` inside Tina Cloud.

This allows TinaCMS to access your preview environment correctly.

### 4. Check environment variables

Verify that the following environment variable matches your current preview branch:

```env
NEXT_PUBLIC_TINA_BRANCH
```

The branch name in Netlify must be the same as the branch indexed in Tina Cloud.

This is required so Tina Cloud can properly sync and index schema changes.

### 5. Re-deploy if needed

If the preview deployment still fails after updating the environment variables, trigger a new deployment manually from `Netlify`.
