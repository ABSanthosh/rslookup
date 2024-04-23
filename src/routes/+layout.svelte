<script lang="ts">
	import GoTop from '$components/GoTop.svelte';
	import Header from '$components/Header.svelte';
	import { theme, setTheme } from '$stores/ThemeStore';
	import { getCookie } from '$utils/cookie';
	import { onMount } from 'svelte';

	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	export let data;

	const duration = 200;
	const delay = duration + 50;
	const x = 10;

	const transitionIn = { easing: cubicOut, x: x, duration, delay };
	const transitionOut = { easing: cubicIn, x: -x, duration };

	onMount(() => {
		const cookieTheme = getCookie(document.cookie, 'theme') as Theme | null | '';

		if (cookieTheme) theme.set(cookieTheme);
		else if (window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');
		else setTheme('dark');
	});
</script>

<svelte:head>
	<title>rslookup | SNU</title>
	<meta name="color-scheme" content={$theme} />
	<link rel="stylesheet" href="/theme/colors.css" />
	<link rel="stylesheet" href="/theme/light.css" />
	<link rel="stylesheet" href="/theme/dark.css" />
</svelte:head>

<Header />
{#key data.url}
	<main class="MainContainer" in:fly={transitionIn} out:fly={transitionOut}>
		<slot />
	</main>
{/key}

<GoTop />

<style lang="scss" global>
	@import '../styles/root/global.scss';
</style>
