<!-- src/routes/+page.svelte -->
<script>
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { tailwindColors } from '$lib/colors';

	/** @type {import('./$types').PageData} */
	export let data;

	let currentColor = '#ffffff';
	let intervalId;
	let finalColor;

	function getRandomColor() {
		const randomColorObj = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
		return randomColorObj.hex;
	}

	onMount(() => {
		if (!data.isBot) {
			// Start color cycling every 100ms
			intervalId = setInterval(() => {
				currentColor = getRandomColor();
			}, 100);

			// Pick the final destination color
			finalColor = getRandomColor().replace('#', '');

			// After 2.5 seconds, stop cycling and show final color
			setTimeout(() => {
				clearInterval(intervalId);
				currentColor = `#${finalColor}`;

				// Wait 500ms showing the final color, then redirect
				setTimeout(() => {
					goto(`/hex/${finalColor}`, { replaceState: true });
				}, 500);
			}, 1500);
		}
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});

	// Meta content
	const baseUrl = 'https://tailwindcolorsnap.frontandback.co.nz';
	const title = 'Tailwind ColorSnap - Find the Perfect Tailwind CSS Color Match';
	const description =
		'Convert any hex color to its closest Tailwind CSS color class or OKLCH value. Perfect for matching designs to Tailwind CSS color palette. Supports Tailwind V4.';
	// Using a demo color for the OG image that showcases the tool's capabilities
	const demoColor = 'ffc30e';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Canonical URL -->
	<link rel="canonical" href={baseUrl} />

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={baseUrl} />
	<meta property="og:image" content={`${baseUrl}/og/${demoColor}`} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/svg+xml" />
	<meta property="og:type" content="website" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={`${baseUrl}/og/${demoColor}`} />
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-violet-50 p-6 text-center">
	<div class="text-gray-500">
		{#if data.isBot}
			{@html data.seoContent.content}
		{:else}
			<div class="space-y-4">
				<div>Picking a color for you...</div>
				<div
					class="mx-auto h-32 w-32 rounded-lg transition-colors duration-100"
					style:background-color={currentColor}
				></div>
			</div>
		{/if}
	</div>
</div>
