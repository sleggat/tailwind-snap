<!-- src/routes/[color]/+page.svelte -->
<script>
	import { findNearestTailwindColor } from '$lib/colors';
	import { page } from '$app/stores';

	const data = $props();

	let inputColor = $state(data?.hex || '#000000');
	let isValid = $state(true);
	let nearestColor = $state(data?.nearest || null);
	let copied = $state(false);

	// Update URL when input changes
	$effect(() => {
		if (!inputColor) return;

		const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
		isValid = hexRegex.test(inputColor);

		if (isValid) {
			const nearest = findNearestTailwindColor(inputColor);
			if (nearest) {
				nearestColor = nearest;
				const newHex = inputColor.replace('#', '');
				if (window) {
					history.replaceState(null, '', `/hex${newHex}`);
					document.title = `Web hex color ${inputColor} is closest to '${nearest.name}' Tailwind class - Hex to Tailwind ColorSnap`;
				}
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
	{#if data?.title}
		<title>{data.title}</title>
		<meta
			name="description"
			content="Convert hex color {data.hex} to the nearest Tailwind CSS color class. {data.hex} matches closest to Tailwind's {data
				.nearest.name}."
		/>
		<meta property="og:title" content={data.title} />
		<meta
			property="og:description"
			content="Find the closest Tailwind CSS color class for any hex color. Perfect for converting designs to Tailwind."
		/>
		<meta name="twitter:title" content={data.title} />
		<meta
			name="twitter:description"
			content="Convert hex color {data.hex} to the nearest Tailwind CSS color class. {data.hex} matches closest to Tailwind's {data
				.nearest.name}."
		/>
	{/if}
</svelte:head>

<div class="container">
	<div class="converter">
		<div class="input-group">
			<label for="hex-input">Enter HEX Color</label>
			<input id="hex-input" type="text" bind:value={inputColor} placeholder="#000000" />
		</div>

		{#if !isValid}
			<div class="error">Please enter a valid hex color (e.g., #FF0000 or #F00)</div>
		{/if}

		{#if isValid && nearestColor}
			<div class="preview">
				<div class="color-box">
					<span>Input Color</span>
					<div class="color-preview" style:background-color={inputColor}></div>
					<code>{inputColor}</code>
				</div>

				<div class="color-box">
					<span>Nearest Tailwind Color</span>
					<div class="color-preview" style:background-color={nearestColor.hex}></div>
					<code>{nearestColor.name}</code>
				</div>
			</div>

			<button onclick={copyToClipboard} class="copy-button" class:copied>
				{#if copied}
					✓ Copied!
				{:else}
					Copy Tailwind Color
				{/if}
			</button>
		{/if}
	</div>
</div>

<style>
	.container {
		min-height: 100vh;
		display: grid;
		place-items: center;
		padding: 1rem;
	}

	.converter {
		width: 100%;
		max-width: 32rem;
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.input-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #e2e8f0;
		border-radius: 0.25rem;
		font-family: monospace;
	}

	.error {
		background: #fee2e2;
		color: #991b1b;
		padding: 0.75rem;
		border-radius: 0.25rem;
		margin-bottom: 1rem;
	}

	.preview {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.color-box {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.color-preview {
		height: 6rem;
		border-radius: 0.25rem;
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	span {
		font-size: 0.875rem;
		font-weight: 500;
	}

	code {
		font-family: monospace;
		font-size: 0.875rem;
		color: #4a5568;
	}

	.copy-button {
		width: 100%;
		padding: 0.75rem;
		background: #3b82f6;
		color: white;
		border: none;
		border-radius: 0.25rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.copy-button:hover {
		background: #2563eb;
	}

	.copy-button.copied {
		background: #059669;
	}

	@media (max-width: 480px) {
		.preview {
			grid-template-columns: 1fr;
		}
	}
</style>
