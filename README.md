# Lens Forecast Dashboard

The Lens Forecast Dashboard (LFD App) is a web-based planning tool designed to replace an existing Excel-based model used for organizing vision care clinics. The dashboard will streamline the process of estimating lens and eyewear requirements by providing an intuitive, data-driven interface for clinic organizers.

**Objective**

The goal of the Lens Forecast Dashboard is to help clinic organizers forecast and plan the types and quantities of lenses required — such as Ready 2 Clip (R2C) lenses, readers, and ophthalmic glasses — based on historical data and country-specific trends from previous clinics.

## Table of Contents

1. Getting Started
2. Tech Stack
3. Project Structure

## Getting Started

**Prerequisites**

* Node.js^18
* npm / yarn / pnpm

First, close the repository:

```
# Clone repo
git clone https://github.com/jazz921/lfd-app.git
cd lfd-app

# Install dependencies
npm install
# or yarn install
# or pnpm install
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:8000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Tech Stack

* Framework: [Next.js](https://nextjs.org/)
* Languange: [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) / [TypeScript](https://www.typescriptlang.org/)
* Styling: [TailwindCSS](https://tailwindcss.com/)
* State Management: [Redux Toolkit](https://redux-toolkit.js.org/)

## Project Structure

```
/
├── public/                # static assets
├── src/                   # source code
│   ├── app/               # Next.js  app router
|   ├── assets/fonts/      # Application fonts 
│   ├── components/        # Application components 
|   ├── constants/         # Application constant values
|   ├── stores/            # RTK store/states
│   ├── styles/            # CSS / global styles
│   └── utils/             # utility helpers, hooks and HOCs
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── vitest.config.ts
└── README.md
```
