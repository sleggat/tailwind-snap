<!-- src/routes/+page.svelte -->
<script>
	import { tailwindColors } from '$lib/colors';

	// Pick a random color from the imported list
	const randomColor = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];

	// Delay before redirecting (2-3 seconds for SEO purposes)
	setTimeout(() => {
		window.location.href = `/hex/${randomColor}`;
	}, 30000);
</script>

<svelte:head>
	<meta property="og:url" content="https://tailwindcolorsnap.frontandback.co.nz" />
	<link rel="canonical" href="https://tailwindcolorsnap.frontandback.co.nz" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-violet-50">
	<div class="text-gray-500">Picking a color for you...</div>
</div>
