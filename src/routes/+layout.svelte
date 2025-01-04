<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	import MatomoTracker from '$lib/components/Matomo.svelte';
	let { children } = $props();
</script>

{@render children()}
<Toaster /><MatomoTracker />
