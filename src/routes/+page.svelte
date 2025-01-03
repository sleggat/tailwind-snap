<!-- src/routes/+page.svelte -->
<script>
	import { goto } from '$app/navigation';

	let initialColor = $state('#0203f3');

	function handleSubmit() {
		const hex = initialColor.replace('#', '');
		goto(`/hex${hex}`);
	}
</script>

<svelte:head>
	<title>Hex to Tailwind ColorSnap - Convert hex colors to Tailwind CSS classes</title>
	<meta
		name="description"
		content="Instantly convert any hex color code to its nearest Tailwind CSS color class. Perfect for converting designs to Tailwind CSS."
	/>
	<!-- Open Graph tags -->
	<meta
		property="og:title"
		content="Hex to Tailwind ColorSnap - Convert hex colors to Tailwind CSS classes"
	/>
	<meta
		property="og:description"
		content="Free tool to find the closest Tailwind CSS color class for any hex color. Perfect for converting designs to Tailwind."
	/>
	<meta property="og:type" content="website" />
	<!-- Twitter Card tags -->
	<meta name="twitter:card" content="summary" />
	<meta
		name="twitter:title"
		content="Hex to Tailwind ColorSnap - Convert hex colors to Tailwind CSS classes"
	/>
	<meta
		name="twitter:description"
		content="Instantly convert any hex color code to its nearest Tailwind CSS color class."
	/>
</svelte:head>

<div class="container">
	<div class="converter">
		<h1>Hex to Tailwind ColorSnap</h1>
		<p class="subtitle">Convert any hex color to its nearest Tailwind CSS class</p>

		<div class="input-group">
			<label for="hex-input">Enter HEX Color</label>
			<input
				id="hex-input"
				type="text"
				bind:value={initialColor}
				placeholder="#000000"
				onkeypress={(e) => e.key === 'Enter' && handleSubmit()}
			/>
		</div>

		<button onclick={handleSubmit} class="convert-button"> Convert Color </button>
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
		text-align: center;
	}

	h1 {
		margin: 0 0 0.5rem;
		font-size: 1.875rem;
		font-weight: 600;
	}

	.subtitle {
		color: #64748b;
		margin-bottom: 2rem;
	}

	/* Rest of your existing styles */
</style>
