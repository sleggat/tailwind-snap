// src/routes/[color]/+page.server.js
import { findNearestTailwindColor } from '$lib/colors';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	try {
		// Extract hex from route parameter
		const hex = params.color.replace(/^hex/, '').toLowerCase();

		// Validate hex format
		const hexRegex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
		if (!hexRegex.test(hex)) {
			throw error(404, 'Invalid hex color');
		}

		const fullHex = `#${hex}`;
		const nearest = findNearestTailwindColor(fullHex);

		if (!nearest) {
			throw error(500, 'Could not find nearest color');
		}

		return {
			hex: fullHex,
			nearest,
			title: `Web hex color ${fullHex} is closest to '${nearest.name}' Tailwind class - Hex to Tailwind ColorSnap`
		};
	} catch (err) {
		console.error('Load error:', err);
		throw error(500, 'Error processing color');
	}
}
