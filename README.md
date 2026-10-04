# Sunwaves Pharma — Official Website

> **Precision in Every Injection**  
> WHO-GMP certified injectable pharmaceutical solutions delivering safety, precision, and reliable supply for hospitals, clinics, and healthcare distributors across Uganda and East Africa.

[![Website](https://img.shields.io/badge/Website-sunwavespharma.com-1C3A22?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.sunwavespharma.com/)
[![Certifications](https://img.shields.io/badge/Certifications-WHO--GMP%20%7C%20ISO%209001%20%7C%20NDA-7FD962?style=for-the-badge&logoColor=black)](https://www.sunwavespharma.com/#who-we-are)
[![License](https://img.shields.io/badge/License-Proprietary-FFC700?style=for-the-badge)](LICENSE)

---

## 📌 Overview

**Sunwaves Pharma** (legally operated by *Sunwaves Enterprise (U) Ltd.*) is an injectable pharmaceuticals supplier headquartered in Kampala, Uganda. This repository contains the source code for the official marketing and informational web application.

The website delivers high-performance interactions, mobile-first responsiveness, smooth scrolling physics, and a modular architecture.

---

## 🚀 Key Features

- **Dynamic Video Hero Section**: Fluid background video looping with smooth rotation between hero clips and call-to-action cards.
- **Scroll-Driven Text Reveal**: Statement section with text-scrub and progressive highlight animations showcasing core certifications (WHO-GMP, ISO 9001, NDA Uganda).
- **Interactive Stacking Cards**: Capabilities showcase detailing quality assurance, nationwide cold-chain logistics, and hospital catalogue.
- **Mission Section with Ambient Visuals**: Clean typographic statement complemented by animated CSS gradient orbs and looping ambient media.
- **Dual-Mode Testimonials Carousel**:
  - **Desktop**: Pinned horizontal slide powered by GSAP `ScrollTrigger` and Lenis.
  - **Mobile**: Touch-driven swipe slider with gesture tracking.
- **Complete Technical & On-Page SEO**:
  - Schema.org (JSON-LD) structured data for `Organization`, `MedicalBusiness`, `WebSite`, `MedicalWebPage`, and `ItemList`.
  - Google-compliant 48px square favicons, 192px Android icons, 180px Apple touch icons, and multi-layer binary `favicon.ico`.
  - Social Graph tags (Open Graph & Twitter Cards) for rich sharing on WhatsApp, LinkedIn, Facebook, and Twitter.
  - Geo-targeting tags for Kampala, Uganda (`UG-102`).
  - Search crawler files: `sitemap.xml` and `robots.txt`.
  - `<noscript>` fallback for search engine crawlers that do not execute client-side JavaScript.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Markup & Structure** | Semantic HTML5, Modular Section Partials |
| **Styling & Design System** | Vanilla CSS3, CSS Custom Properties, Modular CSS per section |
| **Typography** | Google Fonts (*DM Sans*, *Playfair Display*, *Outfit*) |
| **Animations & Transitions** | [GSAP 3.12+](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/) |
| **Smooth Scrolling** | [Lenis 1.1+](https://github.com/darkroomengineering/lenis) |
| **Partial Loading** | Asynchronous dynamic partial injection (`include.js`) |
| **SEO & Metadata** | Schema.org JSON-LD, Open Graph, Twitter Cards, XML Sitemap, Robots.txt |

---

## 📁 Repository Structure

```text
website/
├── assets/
│   ├── images/
│   │   ├── logo.png                # Brand logo banner
│   │   ├── logo-square.png         # High-resolution square logo (512x512)
│   │   └── image*.webp             # Stacking card product illustrations
│   └── videos/
│       ├── 2.mp4                   # Hero background loop
│       └── 9653705-*.mp4           # Mission banner loop
├── css/
│   ├── base.css                    # Global reset, typography, and CSS variables
│   ├── navbar.css                  # Sticky navigation, banner, and mobile menu
│   ├── hero.css                    # Hero section, video overlay, and cards
│   ├── statement.css               # Scroll-fill statement and badges
│   ├── stacking-cards.css          # Stacking capabilities cards
│   ├── mission.css                 # Mission statement and ambient orbs
│   ├── testimonials.css            # Horizontal and touch carousel
│   └── footer.css                  # Footer, company info, and legal links
├── sections/                       # Modular HTML components
│   ├── navbar.html                 # Top notification banner & navigation
│   ├── hero.html                   # Hero video showcase & quick links
│   ├── statement.html              # WHO-GMP & ISO accreditation highlights
│   ├── stacking-cards.html         # Key service pillars & capabilities
│   ├── mission.html                # Healthcare mission statement
│   ├── testimonials.html           # Doctor & partner testimonials
│   └── footer.html                 # Location, contact, and certifications
├── apple-touch-icon.png            # 180x180 iOS home screen icon
├── favicon.ico                     # Multi-resolution icon (16x16, 32x32, 48x48)
├── favicon-48x48.png               # Google Search result requirement (48x48)
├── favicon-96x96.png               # High-DPI display icon (96x96)
├── favicon-192x192.png             # Android / Chrome Web App icon (192x192)
├── favicon-512x512.png             # PWA high-res icon (512x512)
├── favicon.png                     # Standard PNG favicon
├── include.js                      # Asynchronous HTML partial loader
├── script.js                       # Navigation toggle & scroll interactions
├── styles.css                      # Master CSS manifest
├── index.html                      # Root HTML entry point with complete SEO
├── robots.txt                      # Search engine crawler directives
└── sitemap.xml                     # XML sitemap for Google & Bing
```

---

## 💻 Local Development

Because the site uses asynchronous `fetch()` in `include.js` to modularly assemble section partials, it must be served through an HTTP server (not directly opened via `file://`).

### Option 1: VS Code Live Server (Recommended)
1. Install the **Live Server** extension in Visual Studio Code.
2. Right-click on `index.html` and select **"Open with Live Server"**.

### Option 2: Node.js `npx serve`
```bash
npx serve .
```
Then open `http://localhost:3000` in your web browser.

### Option 3: Python Built-in Server
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

---

## 🔍 SEO & Search Verification

- **Google Search Console**: Verified via meta verification tag in `<head>`:
  ```html
  <meta name="google-site-verification" content="w9T5Rcf_VnlZ_dqaDysh4GlEJMriZjlx5jYMb9Ge8BQ" />
  ```
- **Canonical Domain**: Configured exclusively as `https://www.sunwavespharma.com/`.
- **Favicon Compliance**: Meets Google's strict requirements with a dedicated `48x48` square PNG and multi-mipmap `favicon.ico`.

---

## 🏢 Company & Contact Information

**Sunwaves Enterprise (U) Ltd.**  
- **Facility**: W/H-No. 53, Tirupati Business Park, Kyebando, Kampala, Uganda  
- **Postal Address**: P.O. Box 759125, Kampala, Uganda  
- **Tax Identification Number (TIN)**: `1054264242`  
- **Phone**: [+256 758 004 004](tel:+256758004004)  
- **Email**: [vihaan@sunwavespharma.com](mailto:vihaan@sunwavespharma.com)  
- **Official Website**: [https://www.sunwavespharma.com](https://www.sunwavespharma.com)  

---

## 📄 Copyright

&copy; 2025–2026 **Sunwaves Enterprise (U) Ltd.** All rights reserved.
