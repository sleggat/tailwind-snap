<!-- src/lib/components/Matomo.svelte -->
<script>
	import { navigating, page } from '$app/stores';
	import { browser } from '$app/environment';

	// Track page views with Matomo
	$: if (browser && window._paq && $page && !$navigating) {
		window._paq.push(['setCustomUrl', window.location.href]);
		window._paq.push(['setDocumentTitle', document.title]);
		window._paq.push(['trackPageView']);
	}

	// Track page views with Google Analytics
	export function trackPageview(url) {
		if (window.gtag) {
			window.gtag('config', 'G-CBSKC07ZT8', {
				page_path: url,
				page_title: document.title
			});
		}
	}

	// Listen for route changes and track them
	page.subscribe(($page) => {
		trackPageview($page.url.pathname);
	});
</script>
