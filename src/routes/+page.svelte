<!-- src/routes/+page.svelte -->
<script>
	import { tailwindColors } from '$lib/colors';

	// Function to detect if the visitor is a bot
	function isBot() {
		const botPatterns = /bot|google|bing|crawler|spider/i;
		return botPatterns.test(navigator.userAgent);
	}

	// Pick a random color from the imported list and remove the '#' from hex value
	const randomColorObj = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
	const randomHex = randomColorObj.hex.replace('#', '');

	// Redirect users, but let bots see content for SEO
	if (!isBot()) {
		setTimeout(() => {
			window.location.href = `/hex/${randomHex}`;
		}, 3000);
	}
</script>

<svelte:head>
	<title>Tailwind ColorSnap – Find Closest Tailwind CSS Colors</title>
	<meta
		name="description"
		content="Convert any hex color to its closest Tailwind CSS color or OKLCH value for easier design-to-development transitions."
	/>
	<meta property="og:url" content="https://tailwindcolorsnap.frontandback.co.nz" />
	<link rel="canonical" href="https://tailwindcolorsnap.frontandback.co.nz" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-violet-50 p-6 text-center">
	<div class="text-gray-500">
		{#if isBot()}
			<h1>Tailwind ColorSnap</h1>
			<p>Convert any hex color to its closest Tailwind CSS color class or OKLCH values.</p>
			<p>Tailwind ColorSnap helps you match brand colors with the Tailwind palette.</p>
			<p>Email us: <a href="mailto:hello@frontandback.co.nz">hello@frontandback.co.nz</a></p>
		{:else}
			<div>Picking a color for you...</div>
		{/if}
	</div>
</div>
