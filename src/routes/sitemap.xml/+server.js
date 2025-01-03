// src/routes/sitemap.xml/+server.js
import { tailwindColors } from '$lib/colors';

// Add some popular web colors
const popularColors = [
	'#FFFFFF', // White
	'#000000', // Black
	'#FF0000', // Red
	'#00FF00', // Green
	'#0000FF', // Blue
	'#FFFF00', // Yellow
	'#FF00FF', // Magenta
	'#00FFFF', // Cyan
	'#808080', // Gray
	'#FFA500' // Orange
	// Add more as needed
];

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const baseUrl = 'https://tailwindcolorsnap.frontandback.co.nz';

	const colors = [
		// All Tailwind colors
		...tailwindColors.map((color) => color.hex.substring(1)),
		// Popular web colors
		...popularColors.map((color) => color.substring(1))
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
