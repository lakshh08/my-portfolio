# LXDarkstack portfolio

A static portfolio website for Lakshay Thakur, an AI-driven website developer serving local businesses in Himachal Pradesh and nearby areas.

## Files

- `index.html` – page structure and content
- `services.html` – services, process, and pricing
- `work.html` – project gallery and interactive website concept
- `about.html` – developer profile and working commitments
- `contact.html` – FAQs and contact form
- `style.css` – theme, layout, responsiveness, and animation styling
- `script.js` – configuration, project gallery, FAQ, navigation, and WhatsApp enquiry logic
- `assets/icons/favicon.svg` – simple brand icon
- `robots.txt` and `sitemap.xml` – crawler guidance and canonical page URLs

## Run locally

Open `index.html` directly in a browser, or run a local static server:

```bash
cd "n:\My Portfolio"
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Update contact details

The configuration object near the top of `script.js` contains the current WhatsApp, email and phone contact details, along with the canonical URL. Confirm these details before publishing. The WhatsApp number must use international digits only, including country code (no `+`, spaces, or other symbols). The configured number is the existing project contact; replace it if it is not the production contact.

Set `projectSettings.canonicalUrl` to the final HTTPS domain before launch. Contact email and phone links are controlled by the corresponding settings in the same configuration object.

## Search visibility

The pages include page-specific titles and descriptions, canonical URLs, and structured data for the site, developer, and service areas. `robots.txt` points crawlers to `sitemap.xml`. Submit the deployed sitemap in Google Search Console and Bing Webmaster Tools after verifying the domain. Search rankings and first-place placement are decided by search engines and cannot be guaranteed. Keep the domain consistent in the HTML canonicals, structured data, `robots.txt`, `sitemap.xml`, and `script.js` before deployment.

## Project gallery

Add or adjust demo items in the `projects` array inside `script.js`. Each project uses these fields:

- `title`
- `category`
- `description`
- `image`
- `demoUrl`
- `status`
- `technologies`

Project websites stored under `assets/projects/` can be linked with a relative `demoUrl`, for example:

```js
demoUrl: "assets/projects/Spicy%20Hut/index.html"
```

Use URL-encoded spaces in folder names. Keep demo status clear unless the project is verified client work, and leave `demoUrl` empty to show “Demo coming soon.”

## Notes

- This site is built with plain HTML, CSS, and JavaScript only.
- It is designed to work as a static site on Vercel or Cloudflare Pages.
- Gallery entries are labeled as demos or concepts; they do not claim verified live client work.
- The portfolio is a five-page static site: Home, Services & Pricing, Work, About, and Contact.
