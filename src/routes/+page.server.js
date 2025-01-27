// src/routes/+page.server.js
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request }) {
	// Check if the request comes from a search engine bot
	const userAgent = request.headers.get('user-agent') || '';
	const isBot = /bot|google|bing|crawler|spider/i.test(userAgent);

	if (isBot) {
		// Serve static SEO content for search engines instead of redirecting
		return {
			seoContent: {
				title: 'Tailwind ColorSnap - Find the Closest Tailwind CSS Colors or OKLCH()',
				description:
					"Convert any hex color to its closest Tailwind CSS color class or OKLCH values. Perfect for developers matching designs to Tailwind's color palette.",
				content: `
                    <h1>Welcome to Tailwind ColorSnap</h1>
                    <p>Convert any hex color to its closest Tailwind CSS color class or OKLCH values. 
                    Perfect for developers matching designs to Tailwind's color palette.</p>
					<p>Now supporting Tailwind V4</p>
                `
			}
		};
	}

	// Redirect regular users to a fixed color page
	throw redirect(301, `/hex/ffc30e`);
}
