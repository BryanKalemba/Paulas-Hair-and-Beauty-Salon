# Paula's Hair & Beauty Salon

A redesign of the website for [Paula's Hair & Beauty Salon](https://paulashairandbeautysalon.com), a unisex hair and beauty salon on Birmingham High Street. Static site, no build step, no backend — deployed on GitHub Pages with a custom domain.

![Site preview](assets/og-image.jpg)

## About

The original site was a personal, voluntary project built two years earlier for a real client, using a Firebase-backed booking form. This redesign keeps the same client, logo, and content, and rebuilds everything else: a new dark/mauve/gold design system, a real photo gallery for the wig catalogue, and a Formspree-powered booking and contact flow in place of the old Firebase setup.

**Live site:** [paulashairandbeautysalon.com](https://paulashairandbeautysalon.com)

## Features

- 9 static pages: Home, About, Services, Wig Gallery, FAQ, Terms, Privacy, Contact, Booking
- Booking and contact forms powered by [Formspree](https://formspree.io) — AJAX submission, inline success/error states, honeypot spam trap, no backend required
- Booking form blocks Sunday/Monday date selection (the salon's closed days) with inline feedback
- Wig gallery built from real product photography, served as optimised WebP
- WhatsApp fallback links (`wa.me`) on the booking and contact pages, plus in the footer
- Scroll-reveal animations and a mobile nav drawer, both vanilla JS, no dependencies
- Responsive layout, tested down to 390px width
- Open Graph and Twitter Card meta tags on every page, with a custom preview image
- Plain-English privacy policy page covering what the booking/contact forms collect and where it goes

## Tech stack

Vanilla HTML, CSS, and JavaScript. No framework, no build tools, no package manager. Fonts are loaded from Google Fonts (Fraunces for display type, Inter for body/UI). Forms submit to Formspree. Images are WebP with JPEG used only for the Open Graph preview (WebP has inconsistent support in link-preview crawlers).

## Project structure

```
├── index.html          Home
├── about.html           Meet the stylists
├── services.html        Full price list
├── wigs.html             Wig gallery
├── faq.html              FAQ accordion
├── terms.html            Terms of service
├── privacy.html          Privacy policy
├── contact.html          Contact form
├── booking.html          Booking form
├── css/
│   └── style.css         Design system: colours, type, components
├── js/
│   ├── main.js            Mobile nav, scroll-reveal, FAQ accordion, date picker rules
│   └── formspree.js       AJAX form submission handler
├── assets/
│   ├── favicon/           Favicon set (ico, PNG sizes, manifest)
│   ├── logo.webp
│   ├── og-image.jpg       Social share preview image
│   ├── team/               Stylist photos
│   └── wigs/                Wig gallery photos
└── CNAME                 Custom domain config for GitHub Pages
```

## Running locally

No build step, just serve the folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

Hosted on GitHub Pages from the repo root on the `main` branch, with a `CNAME` file pointing the custom domain at Pages. Pushing to `main` redeploys automatically; changes are usually live within a minute or two.

## Forms

Both forms POST to the same Formspree endpoint, distinguished by a hidden `_subject` field so submissions are easy to tell apart in one inbox. To point the forms at a different Formspree form, update the `action` attribute on the `<form>` tag in `booking.html` and `contact.html`.

## Author

Built by [Bryan Kalemba](https://bryankalemba.com) for Paula's Hair & Beauty Salon.
