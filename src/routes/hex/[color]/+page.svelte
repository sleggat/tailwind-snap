<!-- src/routes/hex/[color]/+page.svelte -->
<script>
	import {
		findNearestTailwindColor,
		tailwindColors,
		rgbDistance,
		hexToLab,
		deltaE94,
		hexToRgb,
		hexToHsl,
		hexToOklch,
		getContrastRatio,
		describeColor
	} from '$lib/colors';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { derived } from 'svelte/store';
	import { currentColor } from '$lib/stores';

	let expandedAnalysis = $state(false);
	let expandedCode = $state(false);

	const data = $props();

	// Remember data structure comes from +page.server.js return value
	let inputColor = $state(data.data?.hex ?? '#11d275');
	let isValid = $state(true);
	let nearestColor = $state(data.data?.nearest ?? null);
	let copied = $state(false);
	let isPickerOpen = $state(false);
	let method = $state('lab');
	let tailwindVersion = $state('v3');
	let colorDescription = $derived(nearestColor && describeColor(inputColor));
	let contrastWhite = $derived(getContrastRatio(inputColor, '#ffffff').toFixed(2));
	let contrastBlack = $derived(getContrastRatio(inputColor, '#000000').toFixed(2));
	let rgbValue = $derived(hexToRgb(inputColor).join(', '));
	let hslValue = $derived(
		hexToHsl(inputColor)
			.map((v) => Math.round(v))
			.join(', ')
	);
	let oklchValue = $derived(hexToOklch(inputColor));

	const colorFamily = derived(currentColor, ($color) => {
		const nearest = findNearestTailwindColor($color);
		const family = nearest.name.split('-')[0];
		return family;
	});

	// Update effect to use selected method
	$effect(() => {
		if (!inputColor) return;

		$currentColor = inputColor;

		// Add # if missing
		let colorValue = inputColor;
		if (!colorValue.startsWith('#')) {
			colorValue = '#' + colorValue;
			inputColor = colorValue; // Update the input value
		}

		const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
		isValid = hexRegex.test(colorValue);

		if (isValid) {
			const nearest = findNearestTailwindColor(colorValue, method);
			if (nearest && (!nearestColor || nearest.hex !== nearestColor.hex)) {
				nearestColor = nearest;
				const newHex = colorValue.replace('#', '');
				goto(`/hex/${newHex}`, { replaceState: true });
			}
		}
	});

	async function copyToClipboard() {
		if (!nearestColor?.name) return;

		const valueToCopy = tailwindVersion === 'v4' ? hexToOklch(inputColor) : nearestColor.name;

		await navigator.clipboard.writeText(valueToCopy);
		toast.success(
			`${tailwindVersion === 'v4' ? 'OKLCH' : 'Tailwind'} color value copied to clipboard`
		);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
	async function handleColorClick(e, colorHex) {
		e.preventDefault();
		const newHex = colorHex.replace('#', '');
		await goto(`/hex/${newHex}`, { replaceState: true });
		inputColor = colorHex;
	}
	async function copyColor(text, type) {
		await navigator.clipboard.writeText(text);
		let message = '';
		switch (type) {
			case 'name':
				message = 'Tailwind class';
				break;
			case 'HEX':
				message = 'HEX color';
				break;
			case 'RGB':
				message = 'RGB values';
				break;
			case 'HSL':
				message = 'HSL values';
				break;
			case 'OKLCH':
				message = 'OKLCH values';
				break;
			case 'config':
				message = 'Configuration';
				break;
			default:
				message = 'Color value';
		}
		toast.success(`${message} copied to clipboard`);
	}

	// Define config templates
	let oklchConfig = $derived(`--color-custom: ${hexToOklch(inputColor)};`);
	let jsConfig = $derived(`module.exports = {
  theme: {
    extend: {
      colors: {
        custom: '${inputColor}'
      }
    }
  }
}`);

	let nextConfig = $derived(`import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        custom: '${inputColor}'
      }
    }
  }
}`);

	let svelteConfig = $derived(`/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        custom: '${inputColor}'
      }
    }
  },
  plugins: []
}`);

	async function copyConfig(code, type) {
		try {
			await navigator.clipboard.writeText(code);
			toast.success(`${type} configuration copied to clipboard`);
		} catch (err) {
			toast.error('Failed to copy configuration');
			console.error('Copy failed:', err);
		}
	}
</script>

<svelte:head>
	{#if nearestColor}
		{@const pageTitle =
			nearestColor.distance === 0
				? `Color ${inputColor} matches Tailwind's ${nearestColor.name} color class | Tailwind ColorSnap`
				: nearestColor.distance < 5
					? `Color ${inputColor} closely matches Tailwind's ${nearestColor.name} color class | Tailwind ColorSnap`
					: `The closest Tailwind color to ${inputColor} is ${nearestColor.name} | Tailwind ColorSnap`}

		{@const description = `Convert hex color ${inputColor} to the nearest Tailwind CSS color class. ${colorDescription}.`}
		{@const url = `https://tailwindcolorsnap.frontandback.co.nz/hex/${inputColor.replace('#', '')}`}
		{@const imageUrl = `https://tailwindcolorsnap.frontandback.co.nz/og/${inputColor.replace('#', '')}`}

		<title>{pageTitle}</title>
		<meta name="description" content={description} />
		<link rel="canonical" href={url} />

		<meta property="og:title" content={pageTitle} />
		<meta property="og:description" content={description} />
		<meta property="og:url" content={url} />
		<meta property="og:image" content={imageUrl} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:image:type" content="image/svg+xml" />

		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={pageTitle} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={imageUrl} />
	{:else}
		<title>Tailwind ColorSnap - Convert hex colors to Tailwind CSS classes</title>
		<meta
			name="description"
			content="Convert hex color codes to their nearest Tailwind CSS color class. Perfect for converting designs to Tailwind."
		/>
		<link rel="canonical" href="https://tailwindcolorsnap.frontandback.co.nz" />
	{/if}
</svelte:head>

{#if !inputColor}
	<div class="flex min-h-screen items-center justify-center bg-{$colorFamily}-50">
		<div class="text-gray-500">Loading...</div>
	</div>
{:else}
	<div class="flex min-h-screen flex-col bg-{$colorFamily}-50">
		<div class="flex min-h-screen flex-col bg-{$colorFamily}-50">
			<header class="bg-white shadow-sm">
				<div class="mx-auto max-w-3xl px-4 py-6">
					<div class="flex items-center gap-3">
						<h1 class="text-2xl font-bold text-{$colorFamily}-700">Tailwind ColorSnap</h1>
						<span
							class="whitespace-nowrap rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-500"
						>
							Updated for <a
								href="https://tailwindcss.com/docs/v4-beta"
								title="Tailwind v4 Beta Documentation"
								aria-label="Tailwind v4 Beta Documentation">Tailwind v4</a
							>
						</span>
					</div>
					<p class="mt-2 text-gray-600">
						Convert any hex color to its closest
						<a
							href="https://tailwindcss.com/docs/customizing-colors"
							class="text-blue-600 hover:text-blue-800"
							target="_blank"
							rel="noopener">Tailwind CSS</a
						>
						color class. Perfect for developers matching designs to Tailwind's color palette.
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
								<div class="flex gap-4">
									<input
										id="hex-input"
										type="text"
										class="w-full rounded-md border border-gray-200 bg-{$colorFamily}-50 px-3 py-2 font-mono text-xl"
										bind:value={inputColor}
										placeholder="#000000"
									/>
									<div id="colorPicker">
										<ColorPicker
											bind:hex={inputColor}
											isOpen={isPickerOpen}
											position="responsive"
											isError={!isValid}
											format="hex"
											isAlpha={false}
											label=""
											--input-size="45px"
											on:change={(e) => {
												if (e.detail && typeof e.detail === 'string') {
													inputColor = e.detail;
												}
											}}
										/>
									</div>
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
								<div class="mb-12 grid gap-6 md:grid-cols-2">
									<div>
										<label class="mb-2 block text-sm font-medium text-gray-700" for="method">
											Matching Algorithm
										</label>
										<div class="space-y-2">
											<label class="flex items-center">
												<input
													type="radio"
													bind:group={method}
													value="lab"
													class="h-4 w-4 text-blue-600 focus:ring-blue-500"
												/>
												<span class="ml-2 text-sm text-gray-600">
													LAB (CIE94) - Most perceptually accurate
												</span>
											</label>

											<label class="flex items-center">
												<input
													type="radio"
													bind:group={method}
													value="rgb"
													class="h-4 w-4 text-blue-600 focus:ring-blue-500"
												/>
												<span class="ml-2 text-sm text-gray-600">
													RGB - Simple geometric distance
												</span>
											</label>
										</div>
									</div>
									<div>
										<label class="mb-2 block text-sm font-medium text-gray-700" for="method">
											Tailwind Version
										</label>
										<div class="space-y-2">
											<select
												bind:value={tailwindVersion}
												class="mt-1 block w-full rounded-md border-gray-300"
											>
												<option value="v3">Tailwind CSS v3</option>
												<option value="v4">Tailwind CSS v4 (Beta)</option>
											</select>
										</div>
									</div>
								</div>
								<div class="mb-6 grid grid-cols-2 gap-4">
									<div>
										<div class="mb-2 block text-sm font-medium text-gray-700">Input Color</div>
										<div
											class="h-24 rounded-md shadow-sm"
											style:background-color={inputColor}
										></div>
										<code class="mt-2 block text-sm text-gray-600">{inputColor}</code>
										<code class="mt-2 block text-sm text-gray-600">{hexToOklch(inputColor)}</code>
									</div>

									<div>
										<div class="mb-2 block text-sm font-medium text-gray-700">
											Nearest <span class="sm:inline md:hidden">TW</span><span
												class="hidden md:inline">Tailwind</span
											> Color
										</div>
										<div
											class="h-24 rounded-md shadow-sm"
											style:background-color={nearestColor.hex}
										></div>
										<code class="mt-2 block text-sm text-gray-600">{nearestColor.name}</code>
										<div class="mt-1 text-xs text-gray-500">
											Distance: {nearestColor.distance.toFixed(2)}
											{#if nearestColor.distance > 20}
												<span class="ml-1 text-amber-600">(significant difference)</span>
											{/if}
										</div>
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
										Copy {tailwindVersion === 'v4' ? 'OKLCH' : 'Tailwind'} Color Class ({tailwindVersion ===
										'v4'
											? 'v4'
											: 'v3'})
									{/if}
								</button>

								<div class="mt-8">
									<button
										onclick={() => (expandedAnalysis = !expandedAnalysis)}
										class="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-sm ring ring-gray-100 hover:bg-gray-50"
										aria-expanded={expandedAnalysis}
									>
										<h2 class="text-lg font-semibold text-{$colorFamily}-700">
											Input Color Analysis & Technical Details
										</h2>
										<svg
											class="h-5 w-5 text-gray-500 transition-transform duration-200"
											class:rotate-180={expandedAnalysis}
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</button>

									{#if expandedAnalysis}
										<div class="mt-2 rounded-lg bg-white p-4 shadow-sm" transition:slide>
											<div class="prose prose-sm">
												{#if nearestColor}
													<p>
														{colorDescription}
													</p>
													{#if nearestColor.distance < 5}
														<p>
															This color is an excellent match with Tailwind's {nearestColor.name},
															with a very small difference (distance: {nearestColor.distance.toFixed(
																2
															)}).
														</p>
													{:else if nearestColor.distance < 15}
														<p>
															This color matches well with Tailwind's {nearestColor.name}, showing
															only subtle differences (distance: {nearestColor.distance.toFixed(
																2
															)}).
														</p>
													{:else}
														<p>
															This color is closest to Tailwind's {nearestColor.name}, though there
															are noticeable differences (distance: {nearestColor.distance.toFixed(
																2
															)}).
														</p>
													{/if}

													{#if nearestColor.name.includes('-50') || nearestColor.name.includes('-100')}
														<p>
															As a very light shade in the {nearestColor.name.split('-')[0]} family,
															this color works well for subtle backgrounds and hover states.
														</p>
													{:else if nearestColor.name.includes('-900') || nearestColor.name.includes('-950')}
														<p>
															Being one of the darkest shades in the {nearestColor.name.split(
																'-'
															)[0]} family, this color provides strong contrast and works well for text
															or prominent UI elements.
														</p>
													{:else if nearestColor.name.includes('-500')}
														<p>
															This is a medium shade in the {nearestColor.name.split('-')[0]} family,
															making it versatile for both backgrounds and foreground elements.
														</p>
													{/if}

													{#if method === 'lab'}
														<p>
															Using LAB color space matching provides perceptually accurate results,
															as it accounts for how human vision perceives color differences.
														</p>
													{:else}
														<p>
															Using RGB color space matching provides straightforward geometric
															distance calculations between colors.
														</p>
													{/if}

													<div class="mt-4">
														<h3 class="mb-2 text-sm font-medium text-gray-700">
															Technical Details:
														</h3>
														<ul class="list-disc pl-5 text-sm text-gray-600">
															{#each [{ label: 'HEX', value: inputColor }, { label: 'RGB', value: rgbValue }, { label: 'HSL', value: hslValue }, { label: 'OKLCH', value: oklchValue }] as { label, value }}
																<li class="flex items-center justify-between">
																	<span>{label}: {value}</span>
																	<button
																		onclick={() => copyColor(value, label)}
																		class="ml-2 text-xs text-blue-600 hover:text-blue-800"
																	>
																		Copy
																	</button>
																</li>
															{/each}

															{#each [{ label: 'white', value: contrastWhite }, { label: 'black', value: contrastBlack }] as { label, value }}
																<li>
																	Contrast ratio against {label}: {value}
																	{#if Number(value) < 3}
																		<span class="ml-1 text-red-600">(very poor contrast)</span>
																	{:else if Number(value) < 4.5}
																		<span class="ml-1 text-amber-600"
																			>(poor contrast - avoid using for text)</span
																		>
																	{/if}
																</li>
															{/each}
														</ul>
													</div>
												{/if}
											</div>
										</div>
									{/if}
								</div>

								<div class="mt-4">
									<button
										onclick={() => (expandedCode = !expandedCode)}
										class="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-sm ring ring-gray-100 hover:bg-gray-50"
										aria-expanded={expandedCode}
									>
										<h2 class="text-lg font-semibold text-{$colorFamily}-700">
											Integrate this Hex Color into Your Project
										</h2>
										<svg
											class="h-5 w-5 text-gray-500 transition-transform duration-200"
											class:rotate-180={expandedCode}
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</button>

									{#if expandedCode}
										<div class="mt-2 rounded-lg bg-white p-4 shadow-sm" transition:slide>
											<div class="prose prose-sm">
												{#if nearestColor && nearestColor.distance === 0}
													<div class="space-y-4">
														<div class="mt-4 rounded-md bg-yellow-50 p-4 text-sm text-yellow-800">
															{inputColor} is an exact match for Tailwind's {nearestColor.name} color,
															no need to add a custom color to your Tailwind (&lt;v4.0) configuration.
														</div>
													</div>
												{:else}
													<div class="mt-4">
														<div class="space-y-4">
															{#if tailwindVersion === 'v4'}
																<p class="mb-4 text-gray-600">
																	Tailwind CSS v4 has simplified configuration. You can add custom
																	colors directly in your CSS:
																</p>
																<div class="rounded-md bg-gray-50 p-4">
																	<div class="flex items-center justify-between">
																		<p class="text-sm font-medium text-gray-700">Tailwind V4</p>
																		<button
																			onclick={() => copyConfig(oklchConfig, 'Tailwind V4')}
																			class="text-xs text-blue-600 hover:text-blue-800"
																		>
																			Copy code
																		</button>
																	</div>
																	<pre>{oklchConfig}</pre>
																</div>
															{:else}
																<p class="mb-4 text-gray-600">
																	Want to use this hex color as a custom Tailwind (&lt;v4.0) color?
																	Here's how to add it to your project's configuration. After
																	adding, you can use classes like
																	<code class="inline-block rounded bg-gray-100 px-1"
																		>bg-custom</code
																	>,
																	<code class="inline-block rounded bg-gray-100 px-1"
																		>text-custom</code
																	>, and
																	<code class="inline-block rounded bg-gray-100 px-1"
																		>border-custom</code
																	> in your code.
																</p>

																{#each [{ title: 'tailwind.config.js', code: jsConfig, type: 'JavaScript' }, { title: 'Next.js (tailwind.config.ts)', code: nextConfig, type: 'Next.js' }, { title: 'SvelteKit (tailwind.config.js)', code: svelteConfig, type: 'SvelteKit' }] as config}
																	<div class="rounded-md bg-gray-50 p-4">
																		<div class="flex items-center justify-between">
																			<p class="text-sm font-medium text-gray-700">
																				{config.title}
																			</p>
																			<button
																				onclick={() => copyConfig(config.code, config.type)}
																				class="text-xs text-blue-600 hover:text-blue-800"
																			>
																				Copy code
																			</button>
																		</div>
																		<pre>{config.code}</pre>
																	</div>
																{/each}

																<!-- Usage example -->
																<div class="mt-2 text-sm text-gray-600">
																	<p>Then use in your code as:</p>
																	<code class="mt-1 block rounded bg-gray-100 px-2 py-1">
																		bg-custom text-custom border-custom
																	</code>
																	<div
																		class="mt-4 rounded-md bg-yellow-50 p-4 text-sm text-yellow-800"
																	>
																		<strong>Note:</strong> After adding to your config, you'll need to
																		restart your development server for the changes to take effect.
																	</div>
																</div>
															{/if}
														</div>
													</div>
												{/if}
											</div>
										</div>
									{/if}
								</div>

								<div class="mt-8">
									<h2 class="mb-4 text-lg font-semibold text-{$colorFamily}-600">Top Matches</h2>
									<div class="grid grid-cols-2 gap-4 sm:grid-cols-5">
										{#each tailwindColors
											.map( (color) => ({ ...color, distance: method === 'rgb' ? rgbDistance(inputColor, color.hex) : deltaE94(hexToLab(inputColor), hexToLab(color.hex)) }) )
											.sort((a, b) => a.distance - b.distance)
											.slice(0, 5) as color}
											<a
												href="/hex/{color.hex.substring(1)}"
												class="group block"
												onclick={(e) => handleColorClick(e, color.hex)}
											>
												<div
													class="mb-2 h-16 rounded-md shadow-sm ring-blue-500 group-hover:ring-2"
													style:background-color={color.hex}
												></div>
												<code class="block text-sm text-gray-600">{color.name}</code>
												<div class="text-xs text-gray-500">
													Distance: {color.distance.toFixed(2)}
												</div>
											</a>
										{/each}
									</div>
								</div>
								<div class="mt-8">
									<h2 class="mb-4 text-lg font-semibold capitalize text-{$colorFamily}-600">
										All {$colorFamily} Shades
									</h2>
									<div class="grid grid-cols-2 gap-4 sm:grid-cols-5">
										{#each tailwindColors
											.filter((c) => c.name.split('-')[0] === nearestColor.name.split('-')[0])
											.slice(0, 11) as color}
											<a
												href="/hex/{color.hex.substring(1)}"
												class="group block"
												onclick={(e) => handleColorClick(e, color.hex)}
											>
												<div
													class="mb-2 h-16 rounded-md shadow-sm ring-blue-500 group-hover:ring-2"
													style:background-color={color.hex}
												></div>
												<code class="text-sm text-gray-600">{color.name}</code>
											</a>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
				<div class="mb-12 mt-8 text-center">
					<a href="/colors" class="font-medium text-blue-600 hover:text-blue-800">
						See all Tailwind colors
					</a>
				</div>
			</main>

			<footer class="border-t border-gray-200 bg-white">
				<div class="mx-auto max-w-3xl px-4 pt-12">
					<p class="text-center text-sm text-gray-600">
						<a
							href="https://frontandback.co.nz"
							class="font-medium text-blue-600 hover:text-blue-800">Created by Front&Back</a
						>
						-
						<a
							href="/about-tailwind-colorsnap"
							class="font-medium text-blue-600 hover:text-blue-800">About Tailwind ColorSnap</a
						>
					</p>
					<div class="mx-auto w-20 py-12 text-center text-sm">
						<a
							aria-label="Link to Front&Back, creators of Tailwind ColorSnap"
							href="https://frontandback.co.nz"
							class="font-medium text-blue-600 hover:text-blue-800"
							><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 518.21 335.22">
								<path
									fill="currentColor"
									d="M86.09,32.67a2.61,2.61,0,0,1-1.9.78H39.37a1,1,0,0,0-1.12,1.12V62.66a1,1,0,0,0,1.12,1.12H79.9a2.66,2.66,0,0,1,2.67,2.67V93a2.66,2.66,0,0,1-2.67,2.68H39.37a1,1,0,0,0-1.12,1.11v58.43a2.57,2.57,0,0,1-.78,1.89,2.54,2.54,0,0,1-1.89.78H3.91A2.54,2.54,0,0,1,2,157.1a2.54,2.54,0,0,1-.78-1.89V4.46A2.57,2.57,0,0,1,2,2.56a2.57,2.57,0,0,1,1.89-.78H84.19a2.66,2.66,0,0,1,2.68,2.68V30.77A2.58,2.58,0,0,1,86.09,32.67Z"
								></path>
								<path
									fill="currentColor"
									d="M152.31,155.65,137.15,96.56a1.06,1.06,0,0,0-1.12-.89h-3.34a1,1,0,0,0-1.12,1.11v58.43a2.57,2.57,0,0,1-.78,1.89,2.54,2.54,0,0,1-1.89.78H97.23a2.66,2.66,0,0,1-2.67-2.67V4.46a2.57,2.57,0,0,1,.78-1.9,2.56,2.56,0,0,1,1.89-.78h48a43.16,43.16,0,0,1,23,6.14,40.84,40.84,0,0,1,15.49,17.17,55.83,55.83,0,0,1,5.47,25.08,53.12,53.12,0,0,1-4.57,22.42,40.09,40.09,0,0,1-12.83,15.94,1.72,1.72,0,0,0-.67.56.73.73,0,0,0,0,.78l19.18,64.89.22.89c0,1.49-.81,2.23-2.45,2.23H155.43A2.94,2.94,0,0,1,152.31,155.65ZM131.57,34.57V66.23a1,1,0,0,0,1.12,1.12h6.24a11.65,11.65,0,0,0,9.59-4.46c2.38-3,3.57-7.06,3.57-12.27q0-8.25-3.57-12.71a11.65,11.65,0,0,0-9.59-4.46h-6.24A1,1,0,0,0,131.57,34.57Z"
								></path>
								<path
									fill="currentColor"
									d="M371.84,2.56a2.57,2.57,0,0,1,1.89-.78H405a2.6,2.6,0,0,1,1.9.78,2.61,2.61,0,0,1,.78,1.9V155.21a2.66,2.66,0,0,1-2.68,2.67H369.5a2.94,2.94,0,0,1-3.13-2.23L344.3,78.05a1.06,1.06,0,0,0-.78-.78c-.38-.07-.56.19-.56.78l.44,77.16a2.57,2.57,0,0,1-.78,1.89,2.54,2.54,0,0,1-1.89.78H309.51a2.54,2.54,0,0,1-1.9-.78,2.57,2.57,0,0,1-.78-1.89V4.46a2.61,2.61,0,0,1,.78-1.9,2.58,2.58,0,0,1,1.9-.78h35A3,3,0,0,1,347.64,4l22.3,78.05c.15.45.41.67.78.67s.56-.29.56-.89l-.22-77.38A2.57,2.57,0,0,1,371.84,2.56Z"
								></path>
								<path
									fill="currentColor"
									d="M514.22,2.56a2.61,2.61,0,0,1,.78,1.9V30.77a2.66,2.66,0,0,1-2.67,2.68H484.67a1,1,0,0,0-1.11,1.12V155.21a2.57,2.57,0,0,1-.78,1.89,2.54,2.54,0,0,1-1.9.78H449.22a2.54,2.54,0,0,1-1.9-.78,2.57,2.57,0,0,1-.78-1.89V34.57a1,1,0,0,0-1.11-1.12H418.89a2.68,2.68,0,0,1-2.68-2.68V4.46a2.58,2.58,0,0,1,.79-1.9,2.54,2.54,0,0,1,1.89-.78h93.44A2.57,2.57,0,0,1,514.22,2.56Z"
								></path>
								<path
									fill="currentColor"
									d="M154.43,322.17Q141.27,333.44,121,333.44h-45a2.66,2.66,0,0,1-2.68-2.68V180a2.66,2.66,0,0,1,2.68-2.67h39.25q23.19,0,36.46,10.81t13.27,32.45q0,21.41-14,31.44c-.75.45-.82.89-.23,1.34q17,12.5,17,36.57Q167.59,310.92,154.43,322.17Zm-44.15-112v28.54a1,1,0,0,0,1.12,1.12h4.23q6.24,0,9.59-3.91t3.35-11.26q0-7.58-3.35-11.59t-9.59-4H111.4A1,1,0,0,0,110.28,210.12Zm17,87q3.35-4.45,3.34-12.71t-3.34-13.16a10.32,10.32,0,0,0-8.92-4.91H111.4a1,1,0,0,0-1.12,1.12v33a1,1,0,0,0,1.12,1.12h6.69A10.82,10.82,0,0,0,127.23,297.09Z"
								></path>
								<path
									fill="currentColor"
									d="M232.71,331l-2.9-19.4c0-.74-.45-1.11-1.34-1.11H204.39c-.9,0-1.34.37-1.34,1.11L200.37,331c-.15,1.64-1.11,2.46-2.9,2.46H165.81q-2.91,0-2.23-2.9l32.33-150.75a2.67,2.67,0,0,1,2.9-2.45h36.35a2.68,2.68,0,0,1,2.9,2.45l32.11,150.75.22.89c0,1.34-.82,2-2.45,2H235.61C233.82,333.44,232.85,332.62,232.71,331Zm-23.86-49.06h14.94c.59,0,.89-.37.89-1.11l-8-50.85c-.15-.59-.37-.89-.67-.89s-.52.3-.67.89L208,280.81Q208,281.92,208.85,281.92Z"
								></path>
								<path
									fill="currentColor"
									d="M369.51,332.66a2.58,2.58,0,0,1-.78-1.9V180a2.66,2.66,0,0,1,2.68-2.67h31.67a2.66,2.66,0,0,1,2.67,2.67v50.4c0,.6.15.89.45.89s.59-.22.89-.67l23.41-51.29a3.17,3.17,0,0,1,3.13-2h33.45a2.44,2.44,0,0,1,2.11.78,2.39,2.39,0,0,1-.11,2.34L436.75,246a6.17,6.17,0,0,0-.23,1.34l33.9,82.95a3.12,3.12,0,0,1,.22,1.34c0,1.19-.74,1.79-2.23,1.79H434.74a2.91,2.91,0,0,1-3.12-2l-20.07-52.18c-.15-.45-.37-.67-.67-.67s-.6.22-.89.67l-4,8a3.07,3.07,0,0,0-.22,1.33v42.15a2.66,2.66,0,0,1-2.67,2.68H371.41A2.58,2.58,0,0,1,369.51,332.66Z"
								></path>
								<path
									fill="currentColor"
									d="M327.45,267.16a2.19,2.19,0,0,0-2.2,2.19v21.27c0,4-.93,7.18-2.79,9.48a9.32,9.32,0,0,1-7.69,3.45,9,9,0,0,1-7.58-3.45c-1.79-2.3-2.68-5.47-2.68-9.48V220.15q0-6,2.68-9.48a9,9,0,0,1,7.58-3.45,9.34,9.34,0,0,1,7.69,3.45q2.79,3.47,2.79,9.48v19a2.19,2.19,0,0,0,2.2,2.19h32.62a2.19,2.19,0,0,0,2.2-2.19V221.71q0-21-13-33.56t-34.45-12.6q-21.63,0-34.45,12.6t-12.83,33.56v67.35q0,21.19,12.83,33.67t34.45,12.49q21.41,0,34.45-12.49t13-33.67V269.35a2.19,2.19,0,0,0-2.2-2.19Z"
								></path>
								<path
									fill="currentColor"
									d="M479.37,210.61l-19.53,38.6a1.8,1.8,0,0,0,0,1.63l19.53,38.43a1.8,1.8,0,0,0,1.61,1H516.4a1.81,1.81,0,0,0,1.63-2.59l-17.82-36.94a1.8,1.8,0,0,1,0-1.57L518,212.21a1.81,1.81,0,0,0-1.63-2.59H481A1.8,1.8,0,0,0,479.37,210.61Z"
								></path>
								<path
									fill="currentColor"
									d="M38.84,289.27l19.53-38.59a1.82,1.82,0,0,0,0-1.64L38.84,210.61a1.8,1.8,0,0,0-1.61-1H1.81a1.81,1.81,0,0,0-1.63,2.59L18,249.16a1.8,1.8,0,0,1,0,1.57L.18,287.67a1.81,1.81,0,0,0,1.63,2.59H37.23A1.8,1.8,0,0,0,38.84,289.27Z"
								></path>
								<path
									fill="currentColor"
									d="M244.65,56.37a.51.51,0,0,0,.64.09Q249,53.54,249,50.32a4.37,4.37,0,0,0-1-3,3.18,3.18,0,0,0-2.47-1.14A3,3,0,0,0,243,47.34a4.65,4.65,0,0,0-.91,3,6.94,6.94,0,0,0,.41,2.48A19.16,19.16,0,0,0,244.65,56.37Z"
								></path>
								<path
									fill="currentColor"
									d="M249.05,83.31l-1.65-2-5-6a.51.51,0,0,0-.64-.09q-2.66,2.39-2.66,4.94a5.34,5.34,0,0,0,1.47,3.72,5,5,0,0,0,4.4,1.33A15.49,15.49,0,0,0,249,84C249.33,83.71,249.36,83.49,249.05,83.31Z"
								></path>
								<path
									fill="currentColor"
									d="M280.68,12.6Q267.63,0,246.23,0,224.6,0,211.77,12.6T199,46.16v67.35q0,21.18,12.82,33.67t34.46,12.49q21.41,0,34.45-12.49t13.05-33.67V46.16Q293.73,25.21,280.68,12.6ZM266.93,125.72a1.06,1.06,0,0,1-.32.78,1,1,0,0,1-.78.32h-39a1,1,0,0,1-.78-.32,1.06,1.06,0,0,1-.32-.78v-9.16a1.06,1.06,0,0,1,.32-.78,1,1,0,0,1,.78-.32h39a1,1,0,0,1,.78.32,1.06,1.06,0,0,1,.32.78Zm8.61-28.39H261.42a1.71,1.71,0,0,1-1.37-.64l-1.74-2.11c-.13-.24-.34-.3-.64-.18a30.35,30.35,0,0,1-15,3.85q-8.71,0-13.75-4.26t-5-12.42a18.6,18.6,0,0,1,2.48-9.9,26,26,0,0,1,6.78-7.24.41.41,0,0,0,.09-.64,45.05,45.05,0,0,1-5.13-7.93,14.84,14.84,0,0,1-1.2-6.09q0-7.79,5-12.55T245,32.45a21.11,21.11,0,0,1,9.85,2.25A17,17,0,0,1,261.7,41a17.35,17.35,0,0,1,2.47,9.26A16.6,16.6,0,0,1,261.38,60a30,30,0,0,1-7.56,7.28.41.41,0,0,0-.1.65q.38.54,1.29,1.65l3.85,4.85c.24.25.46.22.64-.09a31.17,31.17,0,0,0,4.21-6.78.93.93,0,0,1,1.47-.46l9.62,5.5c.61.43.77.92.46,1.46a59.86,59.86,0,0,1-7.06,11.19.53.53,0,0,0-.09.64Q271,89.27,276.18,96a1.87,1.87,0,0,1,.36.73C276.54,97.12,276.21,97.33,275.54,97.33Z"
								></path>
							</svg></a
						>
					</div>
					<p class=" my-2 text-center text-xs text-gray-400 contrast-more:text-gray-900">
						Looking for more? Check out
						<a
							href="https://tailwindcss.com"
							class="font-medium text-blue-600 hover:text-blue-800"
							target="_blank"
							rel="noopener">Tailwind CSS</a
						>
						for the complete framework.
					</p>
					<p class="mb-8 mt-2 text-center text-xs text-gray-400 contrast-more:text-gray-900">
						Tailwind ColorSnap is not affiliated with, endorsed by, or sponsored by Tailwind CSS or
						Tailwind Labs Inc.
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
