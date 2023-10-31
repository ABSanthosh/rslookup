<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { theme } from "$lib/ThemeStore";
  import GoTop from "$components/GoTop.svelte";
  import Header from "$components/Header.svelte";
  import Footer from "$components/Footer.svelte";
  import { cubicIn, cubicOut } from "svelte/easing";
  import Toast from "$components/Toast.svelte";
  import { ToastStore } from "$lib/ToastStore";

  export let data;

  const duration = 200;
  const delay = duration + 50;
  const x = 10;

  const transitionIn = { easing: cubicOut, x: x, duration, delay };
  const transitionOut = { easing: cubicIn, x: -x, duration };

  onMount(() => {
    theme.subscribe((value) => {
      if (document) {
        document.documentElement.setAttribute("data-theme", value);
      }
    });
  });

  const contentLayout: {
    [key: string]: string;
  } = {
    "/": "Content--maxWidth",
    "/prof": "Content--maxWidth",
    "/lab": "Content--maxWidth",
    "/amenity": "Content--maxWidth",
  };
</script>

<svelte:head>
  <title>rslookup</title>
  <meta charset="utf-8" />
  <meta name="color-scheme" content={$theme} />
  <meta
    content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
    name="viewport"
  />

  <link rel="stylesheet" href="/theme/light.css" />
  <link rel="stylesheet" href="/theme/dark.css" />
</svelte:head>

<Header />
{#key data.pathname}
  <main
    class={contentLayout[data.pathname]}
    in:fly={transitionIn}
    out:fly={transitionOut}
  >
    <slot />
  </main>
{/key}
<GoTop />
{#if $ToastStore}
  {#each $ToastStore as toast (toast.id)}
    <Toast message={toast.message} />
  {/each}
{/if}
<Footer />

<style lang="scss" global>
  @import "../styles/root/global.scss";
  @import "../styles/routes/dirLayout.scss";
</style>
