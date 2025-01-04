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
            <text 
                x="50" 
                y="580" 
                font-family="system-ui, -apple-system, sans-serif" 
                font-size="48" 
                fill="white"
                style="text-shadow: 2px 2px 10px rgba(0,0,0,0.5);"
            >${hex}</text>
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
