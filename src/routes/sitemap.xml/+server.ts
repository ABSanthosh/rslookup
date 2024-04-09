import { dev } from "$app/environment";

const base = dev ? "http://10.6.24.153:5173/" : "https://rslookup.abs.moe";
const lastMod = new Date().toISOString();

export async function GET() {
  return new Response(
    `
<?xml version="1.0" encoding="UTF-8" ?>
<urlset
xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:xhtml="https://www.w3.org/1999/xhtml"
xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
  <url>
    <loc>${base}/</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>${base}/prof</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${base}/lab</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${base}/amenity</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${base}/404</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.50</priority>
  </url>
  <url>
    <loc>${base}/about</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.50</priority>
  </url>
  <url>
    <loc>${base}/acad-helpdesk</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.50</priority>
  </url>
  <url>
    <loc>${base}/attendance</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.50</priority>
  </url>
  <url>
    <loc>${base}/club</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.50</priority>
  </url>
  <url>
    <loc>${base}/documents</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.50</priority>
  </url>
  <url>
    <loc>${base}/student-council</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.50</priority>
  </url>
</urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}
