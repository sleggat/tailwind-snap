import { redirect } from '@sveltejs/kit';
import { getRandomHexColor } from '$lib/colors';

export function load() {
	const randomColor = getRandomHexColor().substring(1); // Remove the #
	throw redirect(307, `/hex${randomColor}`);
}
