<script lang="ts">
	import GoTop from '$lib/components/GoTop.svelte';
	import { theme, setTheme } from '$stores/ThemeStore';
	import { getCookie } from '$utils/cookie';
	import { onMount } from 'svelte';

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

<button
	class="CrispButton"
	on:click={() => {
		setTheme($theme === 'light' ? 'dark' : 'light');
	}}
>
	{$theme === 'light' ? '🌙' : '☀️'}
</button>

<slot />

<GoTop />

<style lang="scss" global>
	@import '../styles/root/global.scss';
</style>
