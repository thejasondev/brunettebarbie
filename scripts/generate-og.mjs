import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  // Process Maria's photo
  const photoPath = path.resolve('src/assets/maria-swindell.webp');
  
  // Dimensions for the portrait card
  const photoWidth = 510;
  const photoHeight = 554;
  
  // High quality crop & resize
  const resizedPhoto = await sharp(photoPath)
    .resize(photoWidth, photoHeight, {
      fit: 'cover',
      position: 'top',
    })
    .toBuffer();

  // Create smooth rounded corner mask with a slight inner shadow
  const photoMask = Buffer.from(`
    <svg width="${photoWidth}" height="${photoHeight}">
      <rect x="0" y="0" width="${photoWidth}" height="${photoHeight}" rx="22" ry="22" fill="#ffffff"/>
    </svg>
  `);

  const roundedPhoto = await sharp(resizedPhoto)
    .composite([{ input: photoMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Badge overlay to sit elegantly on the bottom of the photo
  const badgeSvg = `
    <svg width="230" height="52" viewBox="0 0 230 52" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="badgeBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#221a14"/>
          <stop offset="100%" stop-color="#14100c"/>
        </linearGradient>
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5e1cb" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#c9a77c" stop-opacity="0.5"/>
        </linearGradient>
      </defs>
      <rect width="230" height="52" rx="26" fill="url(#badgeBg)" stroke="url(#goldBorder)" stroke-width="1.2"/>
      
      <!-- Verified star badge -->
      <circle cx="28" cy="26" r="14" fill="#c9a77c" fill-opacity="0.2"/>
      <circle cx="28" cy="26" r="10" fill="#c9a77c"/>
      <path d="M 24.5 26 L 27 28.5 L 32 23" fill="none" stroke="#1b1511" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      
      <text x="50" y="24" font-family="'Helvetica Neue', 'Arial', sans-serif" font-size="11.5" font-weight="700" fill="#ffffff" letter-spacing="1.2">
        VERIFIED CREATOR
      </text>
      <text x="50" y="39" font-family="'Helvetica Neue', 'Arial', sans-serif" font-size="10" font-weight="500" fill="#c9a77c" letter-spacing="0.6">
        Top Tier Brand Partner
      </text>
    </svg>
  `;
  const badgeBuffer = await sharp(Buffer.from(badgeSvg)).png().toBuffer();

  // Build the complete graphic layout as an SVG base
  const svgBase = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Base Background Gradients -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1a140f"/>
        <stop offset="40%" stop-color="#241b14"/>
        <stop offset="100%" stop-color="#0e0b09"/>
      </linearGradient>

      <radialGradient id="ambientGlow" cx="28%" cy="42%" r="60%">
        <stop offset="0%" stop-color="#9a7a55" stop-opacity="0.22"/>
        <stop offset="60%" stop-color="#3d2e20" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>

      <!-- Luxury Gold Gradients -->
      <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#fff6ec"/>
        <stop offset="40%" stop-color="#eecdab"/>
        <stop offset="100%" stop-color="#c9a77c"/>
      </linearGradient>

      <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5e1cb" stop-opacity="0.8"/>
        <stop offset="50%" stop-color="#b69165" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#f5e1cb" stop-opacity="0.6"/>
      </linearGradient>

      <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#c9a77c" stop-opacity="0"/>
        <stop offset="30%" stop-color="#ecd4b6" stop-opacity="0.8"/>
        <stop offset="80%" stop-color="#c9a77c" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#c9a77c" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <!-- Background Base -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
    <rect width="${width}" height="${height}" fill="url(#ambientGlow)"/>

    <!-- Subtle Architectural Grid / Lines -->
    <line x1="72" y1="0" x2="72" y2="${height}" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
    <line x1="0" y1="80" x2="${width}" y2="80" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
    <line x1="0" y1="${height - 80}" x2="${width}" y2="${height - 80}" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>

    <!-- Outer Card Luxury Frame -->
    <rect x="22" y="22" width="${width - 44}" height="${height - 44}" rx="20" fill="none" stroke="url(#goldBorder)" stroke-width="1.2" stroke-opacity="0.45"/>
    <rect x="30" y="30" width="${width - 60}" height="${height - 60}" rx="14" fill="none" stroke="#f5e1cb" stroke-width="0.6" stroke-opacity="0.12"/>

    <!-- ================= LEFT CONTENT: BRAND IDENTITY ================= -->
    <g transform="translate(76, 76)">
      
      <!-- Eyebrow Pill Badge -->
      <g transform="translate(0, 0)">
        <rect width="248" height="34" rx="17" fill="#292017" stroke="url(#goldBorder)" stroke-width="1"/>
        <path d="M 22 17 C 22 14.5, 23 13.5, 25.5 13.5 C 23 13.5, 22 12.5, 22 10 C 22 12.5, 21 13.5, 18.5 13.5 C 21 13.5, 22 14.5, 22 17 Z" fill="#ecd4b6"/>
        <text x="36" y="22" font-family="'Helvetica Neue', 'Arial', sans-serif" font-size="11" font-weight="600" fill="#ecd4b6" letter-spacing="2.6">
          OFFICIAL PORTFOLIO
        </text>
      </g>

      <!-- Main Headline: Maria Swindell (unified text element for perfect kerning) -->
      <g transform="translate(0, 78)">
        <text x="0" y="54" font-family="'Didot', 'Playfair Display', 'Bodoni MT', 'Georgia', serif" font-size="64" font-weight="700" fill="#ffffff" letter-spacing="-0.5">
          Maria <tspan fill="url(#goldText)">Swindell</tspan>
        </text>
      </g>

      <!-- Tagline / Title -->
      <g transform="translate(0, 162)">
        <text x="0" y="16" font-family="'Helvetica Neue', 'Arial', sans-serif" font-size="17" font-weight="600" fill="#e8dacb" letter-spacing="1.8">
          CONTENT CREATOR &amp; BRAND AMBASSADOR
        </text>
        <text x="0" y="44" font-family="'Georgia', serif" font-size="16" font-style="italic" fill="#a8927e" letter-spacing="0.5">
          Fashion, Beauty &amp; Luxury Digital Storytelling
        </text>
      </g>

      <!-- Thin Gold Separator -->
      <rect x="0" y="238" width="460" height="1" fill="url(#accentLine)"/>

      <!-- Social Handles Badges -->
      <g transform="translate(0, 262)">
        <!-- Instagram Pill -->
        <g transform="translate(0, 0)">
          <rect width="240" height="44" rx="12" fill="#201913" stroke="#ecd4b6" stroke-width="0.8" stroke-opacity="0.35"/>
          <circle cx="24" cy="22" r="7.5" fill="none" stroke="#ecd4b6" stroke-width="1.4"/>
          <circle cx="24" cy="22" r="3.2" fill="none" stroke="#ecd4b6" stroke-width="1.4"/>
          <circle cx="28.8" cy="17.2" r="0.9" fill="#ecd4b6"/>
          <text x="42" y="27" font-family="'Helvetica Neue', 'Arial', sans-serif" font-size="13" font-weight="500" fill="#fdfaf6">
            @mariaswindell_official
          </text>
        </g>

        <!-- TikTok Pill -->
        <g transform="translate(254, 0)">
          <rect width="206" height="44" rx="12" fill="#201913" stroke="#ecd4b6" stroke-width="0.8" stroke-opacity="0.35"/>
          <path d="M 23 16 C 24 17.5, 25.5 18.5, 27 18.5 L 27 16.5 C 26 16.5, 25 15.8, 24.5 15 L 24.5 25 C 24.5 27, 23 28.5, 21 28.5 C 19 28.5, 17.5 27, 17.5 25 C 17.5 23, 19 21.5, 21 21.5 L 21 23.5 C 20.2 23.5, 19.5 24.2, 19.5 25 C 19.5 25.8, 20.2 26.5, 21 26.5 C 21.8 26.5, 22.5 25.8, 22.5 25 L 22.5 15 L 24.5 15 Z" fill="#ecd4b6"/>
          <text x="36" y="27" font-family="'Helvetica Neue', 'Arial', sans-serif" font-size="13" font-weight="500" fill="#fdfaf6">
            @maria.swindell
          </text>
        </g>
      </g>

      <!-- Featured Partnerships Footer -->
      <g transform="translate(0, 348)">
        <text x="0" y="14" font-family="'Helvetica Neue', 'Arial', sans-serif" font-size="10.5" font-weight="600" fill="#8f7a68" letter-spacing="3">
          GLOBAL BRAND PARTNERSHIPS
        </text>
        <text x="0" y="38" font-family="'Didot', 'Playfair Display', 'Georgia', serif" font-size="14.5" fill="#d8c5b0" letter-spacing="1.2">
          SAINT LAURENT &#160;•&#160; FASHION NOVA &#160;•&#160; PRETTYLITTLETHING &#160;•&#160; YSL
        </text>
      </g>
    </g>

    <!-- ================= RIGHT CONTENT: LUXURY PHOTO OFFSET FRAME ================= -->
    <!-- Frame offset -->
    <rect x="654" y="48" width="${photoWidth}" height="${photoHeight}" rx="24" fill="none" stroke="#ecd4b6" stroke-width="1.4" stroke-opacity="0.3"/>
    
    <!-- Top-Right Luxury Four-Point Sparkle -->
    <path d="M 1130 60 C 1130 65, 1134 69, 1139 69 C 1134 69, 1130 73, 1130 78 C 1130 73, 1126 69, 1121 69 C 1126 69, 1130 65, 1130 60 Z" fill="#ecd4b6" opacity="0.9"/>
  </svg>
  `;

  const baseImg = await sharp(Buffer.from(svgBase)).png().toBuffer();

  const finalOgImage = await sharp(baseImg)
    .composite([
      // Photo placed at x=642, y=38
      {
        input: roundedPhoto,
        top: 38,
        left: 642,
      },
      // Verified Creator floating badge over bottom left of photo
      {
        input: badgeBuffer,
        top: 495,
        left: 560,
      }
    ])
    .png({ quality: 96, compressionLevel: 8 })
    .toFile('public/og-image.png');

  console.log('Regenerated public/og-image.png (1200x630)', finalOgImage);
}

generateOgImage().catch(console.error);
