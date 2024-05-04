import { dev } from '$app/environment';

const base = dev ? 'http://10.6.24.153:5173' : 'https://rslookup.abs.moe';
const lastMod = new Date().toISOString();

const pages = [
  '/',
  '/prof',
  '/lab',
  '/gpa',
  '/events',
  '/amenity',
  '/404',
  '/about',
  '/credits',
  '/acad-helpdesk',
  '/attendance',
  '/clubs/cultural',
  '/clubs/technical',
  '/documents',
  '/student-council'
] as const;

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
${pages
  .map(
    (page) => `
  <url>
    <loc>${base}${page}</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>${page === '/' ? '1.00' : '0.50'}</priority>
  </url>
`
  )
  .join('')}
</urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
}
