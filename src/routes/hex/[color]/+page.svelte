<!-- src/routes/hex/[color]/+page.svelte -->
<script>
	import { findNearestTailwindColor } from '$lib/colors';
	import ColorPicker from 'svelte-awesome-color-picker';

	const data = $props();

	// Debug log to see what we're getting
	console.log('Received data:', data);

	// Remember data structure comes from +page.server.js return value
	let inputColor = $state(data.data?.hex ?? '#000000');
	let isValid = $state(true);
	let nearestColor = $state(data.data?.nearest ?? null);
	let copied = $state(false);
	let isPickerOpen = $state(false);

	// Update URL and find nearest color when input changes
	$effect(() => {
		if (!inputColor) return;

		const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
		isValid = hexRegex.test(inputColor);

		if (isValid) {
			const nearest = findNearestTailwindColor(inputColor);
			if (nearest && (!nearestColor || nearest.hex !== nearestColor.hex)) {
				nearestColor = nearest;
				const newHex = inputColor.replace('#', '');
				goto(`/hex/${newHex}`, { replaceState: true });
			}
		}
	});

	async function copyToClipboard() {
		if (!nearestColor?.name) return;
		await navigator.clipboard.writeText(nearestColor.name);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<svelte:head>
	{#if nearestColor}
		<title
			>Web hex color {inputColor} is closest to '{nearestColor.name}' Tailwind class - Hex to
			Tailwind ColorSnap</title
		>
		<meta
			name="description"
			content="Convert hex color {inputColor} to the nearest Tailwind CSS color class. {inputColor} matches closest to Tailwind's {nearestColor.name}."
		/>
		<meta
			property="og:title"
			content="Web hex color {inputColor} is closest to '{nearestColor.name}' Tailwind class - Hex to Tailwind ColorSnap"
		/>
		<meta
			property="og:description"
			content="Find the closest Tailwind CSS color class for any hex color. Perfect for converting designs to Tailwind."
		/>
		<meta
			name="twitter:title"
			content="Web hex color {inputColor} is closest to '{nearestColor.name}' Tailwind class - Hex to Tailwind ColorSnap"
		/>
		<meta
			name="twitter:description"
			content="Convert hex color {inputColor} to the nearest Tailwind CSS color class. {inputColor} matches closest to Tailwind's {nearestColor.name}."
		/>
		<link rel="canonical" href="https://yoursite.com/?hex={inputColor.replace('#', '')}" />
	{:else}
		<title>Tailwind ColorSnap - Convert hex colors to Tailwind CSS classes</title>
		<meta
			name="description"
			content="Convert hex color codes to their nearest Tailwind CSS color class. Perfect for converting designs to Tailwind."
		/>
		<link rel="canonical" href="https://yoursite.com" />
	{/if}
</svelte:head>

{#if !inputColor}
	<div class="flex min-h-screen items-center justify-center bg-gray-50">
		<div class="text-gray-500">Loading...</div>
	</div>
{:else}
	<div class="flex min-h-screen flex-col bg-gray-50">
		<div class="flex min-h-screen flex-col bg-gray-50">
			<header class="bg-white shadow-sm">
				<div class="mx-auto max-w-3xl px-4 py-6">
					<h1 class="text-2xl font-bold text-gray-900">Tailwind ColorSnap</h1>
					<p class="mt-2 text-gray-600">
						Convert any hex color to its closest Tailwind CSS color class. Perfect for developers
						matching designs to Tailwind's color palette.
					</p>
				</div>
			</header>

			<main class="flex-grow">
				<div class="mx-auto max-w-3xl px-4 py-8">
					<div class="rounded-lg bg-white shadow">
						<div class="p-6">
							<div class="mb-6">
								<label for="hex-input" class="mb-2 block text-sm font-medium text-gray-700"
									>Enter HEX Color</label
								>
								<div class="flex">
									<input
										id="hex-input"
										type="text"
										class="w-full rounded-l-md border border-gray-300 px-3 py-2 font-mono"
										bind:value={inputColor}
										placeholder="#000000"
									/>
									<ColorPicker
										bind:hex={inputColor}
										isOpen={isPickerOpen}
										closeOnSelection={false}
										showPreview={false}
										isError={!isValid}
										format="hex"
										isAlpha={false}
										label=""
										--input-size="35px"
										on:change={(e) => {
											if (e.detail && typeof e.detail === 'string') {
												inputColor = e.detail;
											}
										}}
									/>
								</div>
							</div>

							{#if !isValid}
								<div
									class="mb-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
								>
									Please enter a valid hex color (e.g., #FF0000 or #F00)
								</div>
							{/if}

							{#if isValid && nearestColor}
								<div class="mb-6 grid grid-cols-2 gap-6">
									<div>
										<span class="mb-2 block text-sm font-medium text-gray-700">Input Color</span>
										<div
											class="h-24 rounded-md shadow-sm"
											style:background-color={inputColor}
										></div>
										<code class="mt-2 block text-sm text-gray-600">{inputColor}</code>
									</div>

									<div>
										<span class="mb-2 block text-sm font-medium text-gray-700"
											>Nearest Tailwind Color</span
										>
										<div
											class="h-24 rounded-md shadow-sm"
											style:background-color={nearestColor.hex}
										></div>
										<code class="mt-2 block text-sm text-gray-600">{nearestColor.name}</code>
									</div>
								</div>

								<button
									onclick={copyToClipboard}
									class="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
									class:bg-green-600={copied}
									class:hover:bg-green-700={copied}
								>
									{#if copied}
										✓ Copied!
									{:else}
										Copy Tailwind Color
									{/if}
								</button>
							{/if}
						</div>
					</div>
				</div>
			</main>

			<footer class="border-t border-gray-200 bg-white">
				<div class="mx-auto max-w-3xl px-4 py-4">
					<p class="text-center text-sm text-gray-600">
						Created by <a
							href="https://frontandback.co.nz"
							class="font-medium text-blue-600 hover:text-blue-800">Front&Back</a
						>
					</p>
				</div>
			</footer>
		</div>
	</div>
{/if}

<style>
	:global(.sacp-wrapper) {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 0.5rem;
		z-index: 50;
	}
</style>
