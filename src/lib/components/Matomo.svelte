<!-- src/lib/components/Matomo.svelte -->
<script>
	import { navigating, page } from '$app/stores';
	import { browser } from '$app/environment';

	$: if (browser && window._paq && $page) {
		// Wait for navigation to complete
		if (!$navigating) {
			window._paq.push(['setCustomUrl', window.location.href]);
			window._paq.push(['setDocumentTitle', document.title]);
			window._paq.push(['trackPageView']);
		}
	}
	$: if (browser && window.dataLayer && $page) {
		if (!$navigating) {
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());

			gtag('config', 'G-CBSKC07ZT8');
		}
	}
</script>
