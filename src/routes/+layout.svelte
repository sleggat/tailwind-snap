<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	let { children } = $props();
</script>

{@render children()}
<Toaster />
