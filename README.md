# Bionic Clinical Portal - Landing Page

A premium, modern landing page for a bionics prosthetics company, featuring high-end animations, interactive clinical assessment forms, and a responsive design.

## Features

- **Premium UI/UX:** Clean, modern, and accessible interface tailored for clinical and patient interactions.
- **Advanced Animations:** Utilizing `framer-motion`, `gsap`, and `lenis` for smooth, cinematic scrolling and micro-interactions.
- **Interactive Clinical Form:** A multi-step consultation scheduling form with animated progress tracking and custom comboboxes (built with `react-aria-components`).
- **Responsive Layout:** fully optimized for mobile, tablet, and desktop viewing.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **Smooth Scroll:** [Lenis](https://studiofreight.github.io/lenis/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/), [React Aria Components](https://react-spectrum.adobe.com/react-aria/)

## Getting Started

First, make sure you have Node.js installed. Then, install the project dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx` or the sales portal in `app/contact-sales/page.tsx`.

## Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable UI components (buttons, comboboxes, animated sections).
- `src/lib/`: Utility functions and helper classes.
- `public/`: Static assets like images and fonts.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com). Simply push the repository to GitHub, connect it to Vercel, and it will automatically deploy the Next.js application.
