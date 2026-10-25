# Purpal Spa Saloon

A responsive static salon and spa website built with HTML, CSS and vanilla JavaScript. No build step or backend is required.

## Run locally

1. Open this project folder in VS Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html` and choose **Open with Live Server**.
4. The website opens in your browser. WhatsApp links open WhatsApp Web or the mobile app.

Opening pages directly as `file://` may limit browser features. Live Server is recommended.

## Business setup

Edit `js/config.js`:

- Replace `whatsappNumber` with the real WhatsApp number in international format using digits only (country code plus number; no `+`, spaces or punctuation).
- Update `phoneNumber`, `address`, `openingHours` and `mapsUrl` with verified business details.
- The embedded map is a generic search placeholder. Update the map iframe in `contact.html` to the real location after setting the correct address.
- The website intentionally describes appointment messages as requests. A booking is not confirmed until the salon replies.

## Edit services and content

Open `services.html` to edit service names, descriptions, sample prices and durations. Change the matching `data-service-book` value when you rename a service. The service category filter values are in `data-category` and `data-filter`.

Update sample team profiles, offers and testimonials with accurate, approved business content. The current prices, people and guest quotes are examples and must be reviewed/replaced before publication.

## Images and brand assets

The site currently uses remote Unsplash image URLs. Replace the image `src` URLs in the HTML with salon-owned, licensed images; add optimized local images under `assets/images/` if preferred. Update the accompanying `alt` text to describe the actual image. Replace `assets/images/favicon.svg` with the salon's own icon when available. The floating WhatsApp button uses `assets/images/whatsapp-logo.png`; replace it with a licensed/approved logo if needed.

## SEO and deployment

Replace the sample page metadata and every `example.com` sitemap URL with the deployed domain. Also update the `Sitemap:` line in `robots.txt` to the absolute sitemap URL on that domain. The sitemap is `sitemap.xml`; robots.txt points search crawlers to it. The home page includes LocalBusiness structured data; keep its address, telephone and opening hours in sync with verified business details. Deploy the folder as a static site to GitHub Pages, Netlify or Cloudflare Pages:

1. Upload/push the website files to your hosting provider.
2. Set the published directory to the project root (no build command is needed).
3. Configure the custom domain and HTTPS in the host dashboard.
4. Replace all sample business details, prices, images and example copy before launch.

## Project structure

```text
index.html, services.html, about.html, gallery.html, contact.html, 404.html
css/style.css
js/config.js, main.js, services.js, gallery.js, booking.js
assets/images/
robots.txt, sitemap.xml
```
