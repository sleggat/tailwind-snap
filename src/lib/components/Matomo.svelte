<!-- src/lib/components/Matomo.svelte -->
<script>
	import { navigating, page } from '$app/stores';
	import { browser } from '$app/environment';

	// Ensure dataLayer exists globally
	if (browser) {
		window.dataLayer = window.dataLayer || [];
	}

	// Define gtag globally
	function gtag() {
		window.dataLayer.push(arguments);
	}

	// Track page views with Matomo
	$: if (browser && window._paq && $page && !$navigating) {
		window._paq.push(['setCustomUrl', window.location.href]);
		window._paq.push(['setDocumentTitle', document.title]);
		window._paq.push(['trackPageView']);
	}

	// Track page views with Google Analytics
	$: if (browser && $page && !$navigating) {
		gtag('event', 'page_view', {
			page_path: window.location.pathname,
			page_title: document.title
		});
	}
</script>
