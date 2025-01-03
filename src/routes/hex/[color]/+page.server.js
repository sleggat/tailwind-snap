// src/routes/hex/[color]/+page.server.js
import { error } from '@sveltejs/kit';
import { findNearestTailwindColor } from '$lib/colors';

export function load({ params }) {
	try {
		const hex = params.color.toLowerCase();

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
			nearest
		};
	} catch (err) {
		console.error('Load error:', err);
		throw error(500, 'Error processing color');
	}
}
