import fs from 'node:fs';
import sharp from 'sharp';

// 1. Create luxury SVG Favicon
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <!-- Background Gradient: Deep Mocha / Espresso Obsidian -->
    <linearGradient id="msBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a221a"/>
      <stop offset="50%" stop-color="#1f1813"/>
      <stop offset="100%" stop-color="#120e0b"/>
    </linearGradient>

    <!-- Luxury Champagne Gold Gradient -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdf4e8"/>
      <stop offset="30%" stop-color="#e8d0b1"/>
      <stop offset="70%" stop-color="#c8a87d"/>
      <stop offset="100%" stop-color="#9a764d"/>
    </linearGradient>

    <!-- Outer Rim Accent -->
    <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f1dec9" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#c8a87d" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#f1dec9" stop-opacity="0.6"/>
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="64" height="64" rx="14" fill="url(#msBg)"/>
  <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="url(#goldRim)" stroke-width="1.5"/>
  <rect x="4" y="4" width="56" height="56" rx="10" fill="none" stroke="#f1dec9" stroke-width="0.6" stroke-opacity="0.25"/>

  <!-- High-fashion Typographic Monogram (Maria Swindell) -->
  <g fill="url(#goldGrad)">
    <!-- High-Fashion Bodoni 'M' -->
    <!-- Left serif and stem -->
    <path d="M 12 43 L 12 41.5 L 14.5 41.5 L 14.5 22.5 L 12.5 23 L 12 21.2 L 16.5 20.5 L 18 20.5 L 18 41.5 L 20.5 41.5 L 20.5 43 Z"/>
    <!-- Left diagonal -->
    <path d="M 17.5 22.5 L 25 41.5 L 26.8 41.5 L 34 22.5 L 34 20.5 L 32 20.5 L 25.8 37 L 19 20.5 Z"/>
    <!-- Right stem and serif -->
    <path d="M 32 20.5 L 36.5 20.5 L 36.5 22 L 34.2 22.5 L 34.2 41.5 L 36.5 41.5 L 36.5 43 L 30 43 L 30 41.5 L 32 41.5 Z"/>

    <!-- High-Fashion Didot 'S' with refined haute-couture curves -->
    <path d="M 50.8 27.5 C 50.4 23.2 47.2 20.5 42.8 20.5 C 37.8 20.5 35 23.2 35 26.6 C 35 30 37.6 31.8 42.2 33.2 C 46.8 34.6 49.5 36.5 49.5 40.2 C 49.5 44.5 45.4 47 40.5 47 C 35.2 47 32.2 43.8 31.8 38.6 L 35.2 38.6 C 35.6 42 37.6 44.2 40.8 44.2 C 43.8 44.2 45.8 42.6 45.8 40.2 C 45.8 37.4 43.2 35.8 38.6 34.4 C 34.2 33 31.5 30.8 31.5 26.8 C 31.5 22.5 35.6 17.8 42.6 17.8 C 47.8 17.8 50.5 21.2 50.8 27.5 Z" transform="translate(1.5, 0)"/>
  </g>

  <!-- Luxury Haute Star Accent (Top Right) -->
  <path d="M 50 8.5 C 50 11.2, 51.5 12.5, 54 12.5 C 51.5 12.5, 50 13.8, 50 16.5 C 50 13.8, 48.5 12.5, 46 12.5 C 48.5 12.5, 50 11.2, 50 8.5 Z" fill="#ffffff" opacity="0.95"/>
  <circle cx="50" cy="12.5" r="0.75" fill="#fdf4e8"/>
</svg>`;

fs.writeFileSync('public/favicon.svg', faviconSvg);
console.log('Saved public/favicon.svg');

// Generate apple-touch-icon.png (180x180) and preview PNG
await sharp(Buffer.from(faviconSvg))
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png');
console.log('Saved public/apple-touch-icon.png');

await sharp(Buffer.from(faviconSvg))
  .resize(256, 256)
  .png()
  .toFile('public/favicon-preview.png');
console.log('Saved public/favicon-preview.png');
