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
			}, 2500);
		}
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

<svelte:head>
	<title>{data.seoContent.title}</title>
	<meta name="description" content={data.seoContent.description} />
	<meta property="og:url" content="https://tailwindcolorsnap.frontandback.co.nz" />
	<link rel="canonical" href="https://tailwindcolorsnap.frontandback.co.nz" />
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
