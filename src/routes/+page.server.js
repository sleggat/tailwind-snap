// src/routes/+page.server.js
/** @type {import('./$types').PageServerLoad} */
export async function load({ request }) {
	// Check if the request comes from a search engine bot
	const userAgent = request.headers.get('user-agent') || '';
	const isBot = /bot|google|bing|crawler|spider/i.test(userAgent);

	// Return data for both bots and regular users
	return {
		isBot,
		seoContent: {
			title: 'Tailwind ColorSnap - Find the Closest Tailwind CSS Colors or OKLCH()',
			description:
				"Convert any hex color to its closest Tailwind CSS color class or OKLCH values. Perfect for developers matching designs to Tailwind's color palette.",
			content: `
                <h2>Welcome to Tailwind ColorSnap</h2>
                <h1>Convert any hex color to its closest Tailwind CSS color class or OKLCH values.
                Perfect for developers matching designs to Tailwind's color palette.</h1>
                <p>Now supporting Tailwind V4</p>
                <a href="/hex/ffc30e">Try it now</a>
            `
		}
	};
}
