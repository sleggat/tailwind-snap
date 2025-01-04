<!-- src/routes/colors/+page.svelte -->
<script>
	import { tailwindColors } from '$lib/colors';
	import { toast } from 'svelte-sonner';

	async function copyColor(text, type) {
		await navigator.clipboard.writeText(text);
		toast.success(`${type === 'name' ? 'Tailwind class' : 'Hex code'} copied to clipboard`);
	}
</script>

<svelte:head>
	<title>All Tailwind CSS Colors - Complete Color Reference | Tailwind ColorSnap</title>
	<meta
		name="description"
		content="Complete reference of all Tailwind CSS colors. Browse, search and copy all default Tailwind color classes and hex codes."
	/>
	<meta
		property="og:title"
		content="All Tailwind CSS Colors - Complete Color Reference | ColorSnap"
	/>
	<meta
		property="og:description"
		content="Browse all Tailwind CSS default colors. Find and copy exact hex codes and class names for your Tailwind projects."
	/>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<header class="bg-white shadow-sm">
		<div class="mx-auto max-w-7xl px-4 py-6">
			<h1 class="text-2xl font-bold text-gray-900">Tailwind CSS Colors</h1>
			<p class="mt-2 text-gray-600">
				Complete reference of all default Tailwind CSS colors. Click any color to copy its class
				name or hex code.
			</p>
		</div>
	</header>

	<main class="mx-auto max-w-7xl px-4 py-12">
		<div class="prose mb-8 max-w-none">
			<p>
				Tailwind CSS includes a modern color palette with a wide range of beautiful colors. Each
				color comes in 11 different shades, giving you precise control over your design. From light
				pastels to deep, rich tones, you'll find colors that work perfectly for any project.
			</p>
		</div>

		<!-- Color grid -->
		<div class="grid grid-cols-11 gap-4">
			{#each tailwindColors as color}
				<div class="flex flex-col rounded-lg bg-white p-3 shadow-sm">
					<div
						class="mb-2 h-8 rounded-md shadow-sm ring-1 ring-inset ring-gray-200"
						style:background-color={color.hex}
					></div>
					<div class="mb-1 text-xs font-medium text-gray-900">{color.name}</div>
					<div class="mt-auto flex gap-1">
						<button
							class="flex-1 rounded bg-gray-100 px-1.5 py-1 text-[10px] text-gray-600 hover:bg-gray-200"
							onclick={() => copyColor(color.name, 'name')}
						>
							name
						</button>
						<button
							class="flex-1 rounded bg-gray-100 px-1.5 py-1 text-[10px] text-gray-600 hover:bg-gray-200"
							onclick={() => copyColor(color.hex, 'hex')}
						>
							hex
						</button>
					</div>
				</div>
			{/each}
		</div>
		<div class="mt-8 text-center">
			<a href="/" class="font-medium text-blue-600 hover:text-blue-800">
				Back to Tailwind ColorSnap
			</a>
		</div>
	</main>

	<footer class="border-t border-gray-200 bg-white">
		<div class="mx-auto max-w-3xl px-4 pt-12">
			<p class="text-center text-sm text-gray-600">
				Created by <a
					href="https://frontandback.co.nz"
					class="font-medium text-blue-600 hover:text-blue-800">Front&Back</a
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
			<p class="mb-8 mt-2 text-center text-xs text-gray-400">
				Tailwind ColorSnap is not affiliated with, endorsed by, or sponsored by Tailwind CSS or
				Tailwind Labs Inc.
			</p>
		</div>
	</footer>
</div>
