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
			<h1>Welcome to Tailwind ColorSnap</h1>
			<p>
				Convert any hex color to its closest Tailwind CSS color class or OKLCH values. Perfect for
				developers matching designs to Tailwind's color palette.
			</p>
			<p>Now supporting Tailwind V4</p>
			<a href="/hex/ffc30e">Try it now</a>
		{:else}
			<div>Picking a color for you...</div>
		{/if}
	</div>
</div>
