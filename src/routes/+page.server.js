// src/routes/+page.server.js
import { redirect } from '@sveltejs/kit';
import { getRandomHexColor } from '$lib/colors';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// Remove the # and ensure we get a 6-digit hex
	const randomColor = getRandomHexColor().substring(1).padEnd(6, '0');
	console.log('Generating random color:', randomColor); // Debug log
	throw redirect(303, `/hex/${randomColor}`);
}
