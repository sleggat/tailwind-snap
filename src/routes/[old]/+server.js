// src/routes/[old]/+server.js
import { redirect } from '@sveltejs/kit';

const redirects = {
	'why-i-created-tailwind-colorsnap': 'about-tailwind-colorsnap'
	// Add more old-to-new mappings here
};

export function GET({ params }) {
	const newPath = redirects[params.old];
	if (newPath) {
		throw redirect(301, `/${newPath}`);
	}
}
