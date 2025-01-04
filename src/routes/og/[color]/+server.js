// src/routes/og/[color]/+server.js
import { error } from '@sveltejs/kit';

export async function GET({ params }) {
	try {
		const hex = `#${params.color}`;

		// Validate hex color
		const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
		if (!hexRegex.test(hex)) {
			throw error(400, 'Invalid hex color');
		}

		// Create SVG
		const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="630" fill="${hex}"/>
        </svg>`;

		return new Response(svg, {
			headers: {
				'Content-Type': 'image/svg+xml',
				'Cache-Control': 'public, max-age=31536000'
			}
		});
	} catch (err) {
		throw error(500, 'Error generating image');
	}
}
