// src/routes/sitemap.xml/+server.js
import { tailwindColors, HSLToHex } from '$lib/colors';

const popularHues = [];
for (let h = 0; h < 360; h += 5) {
	// Every 5 degrees of hue
	for (let l of [20, 40, 60, 80]) {
		// Different lightness levels
		popularHues.push(HSLToHex(h, 100, l));
	}
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const baseUrl = 'https://tailwindcolorsnap.frontandback.co.nz';

	const colors = [
		// All Tailwind colors
		...tailwindColors.map((color) => color.hex.substring(1)),
		// Popular web colors
		...popularHues.map((color) => color.substring(1))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
        <url>
            <loc>${baseUrl}</loc>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
		<url>
            <loc>${baseUrl}/colors</loc>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
        </url>
        ${colors
					.map(
						(color) => `
        <url>
            <loc>${baseUrl}/hex/${color}</loc>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
        </url>
        `
					)
					.join('')}
					
    </urlset>`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
