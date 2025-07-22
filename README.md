# EG Web Solutions

Professionele web development portfolio- en bedrijfswebsite gebouwd met Next.js, React en Tailwind CSS.

## Features

- Responsive, modern design
- Portfolio met projectafbeeldingen en technologieën
- Meertalige ondersteuning (NL/EN)
- Contactformulier (EmailJS)
- SEO-optimalisatie
- PWA-ondersteuning (Progressive Web App)
- Admin-vriendelijke structuur

## Tech Stack

- Next.js 15+
- React 18+
- Tailwind CSS
- TypeScript
- EmailJS
- Framer Motion

## Projectstructuur

- `app/` – Next.js app directory (pagina's, layout, routing)
- `components/` – Herbruikbare React componenten
- `public/images/` – Projectafbeeldingen en assets
- `styles/` – Globale CSS (Tailwind)
- `lib/` – Utilities en helpers
- `hooks/` – Custom React hooks

## Installatie & Development

1. Clone deze repository:
   ```bash
   git clone https://github.com/Eyobiel-12/EG-solution.git
   cd EG-solution
   ```
2. Installeer dependencies:
   ```bash
   npm install
   ```
3. Start de development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in je browser.

## Productie build

Voor productie:
```bash
npm run build
npm start
```

## Omgevingsvariabelen

Maak een `.env.local` aan met:
```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

## Afbeeldingen

Projectafbeeldingen staan in `public/images/` en moeten exact overeenkomen met de bestandsnamen in de code (kleine letters, koppeltekens, geen spaties).

## Licentie

MIT 