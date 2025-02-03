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
			content: `<div class="prose max-w-none">
<h1>Tailwind ColorSnap - Color Converter and Palette Generator</h1>

<p>Convert any hex color to its closest Tailwind CSS color class or OKLCH values. 
Perfect for developers matching designs to Tailwind's color palette.</p>

<div class="mt-8">
                <h2>Popular Tailwind Colors</h2>
                <ul>
                    <li><a href="/hex/3b82f6">blue-500 (#3b82f6)</a> - Perfect for primary actions and brand colors</li>
                    <li><a href="/hex/22c55e">green-500 (#22c55e)</a> - Ideal for success states and confirmations</li>
                    <li><a href="/hex/ef4444">red-500 (#ef4444)</a> - Used for error states and important alerts</li>
                    <li><a href="/hex/64748b">slate-500 (#64748b)</a> - Great for text and UI elements</li>
                </ul>
            </div>

            <div class="mt-8">
                <h2>Color Categories</h2>
                <ul>
                    <li><a href="/colors#primary">Primary Colors</a> - Blues, reds, and other vibrant options</li>
                    <li><a href="/colors#neutral">Neutral Colors</a> - Slates, grays, and subtle tones</li>
                    <li><a href="/colors#accent">Accent Colors</a> - Vibrant colors for highlights and emphasis</li>
                </ul>
            </div>

            <div class="mt-8">
                <h2>Key Features</h2>
                <ul>
                    <li>Convert any HEX color to the nearest Tailwind class</li>
                    <li>Get OKLCH values for modern CSS</li>
                    <li>Check color contrast and accessibility</li>
                    <li>Generate complementary color palettes</li>
                    <li>Now supporting Tailwind v4</li>
                </ul>
            </div>

            <div class="mt-8">
                <h2>Start Converting Colors</h2>
                <p>Try these examples:</p>
                <ul>
                    <li><a href="/hex/3b82f6">Convert #3b82f6 to Tailwind</a></li>
                    <li><a href="/hex/22c55e">Convert #22c55e to Tailwind</a></li>
                    <li><a href="/colors">Browse all Tailwind colors</a></li>
                </ul>
            </div>
        </div>`
		}
	};
}
