<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { theme } from "$lib/ThemeStore";
  import GoTop from "$components/GoTop.svelte";
  import Header from "$components/Header.svelte";
  import Footer from "$components/Footer.svelte";
  import Toast from "$components/Toast.svelte";
  import { ToastStore } from "$lib/ToastStore";
  import { navigating } from "$app/stores";
  import BlurredSpinner from "$components/BlurredSpinner.svelte";
  import { EasterEgg } from "$utils/EasterEgg.js";

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
    EasterEgg();
  });
</script>

<svelte:head>
  <title>rslookup | SNU</title>
  <meta name="color-scheme" content={$theme} />
  <link rel="stylesheet" href="/theme/light.css" />
  <link rel="stylesheet" href="/theme/dark.css" />
</svelte:head>

<Header />
{#if $navigating}
  <BlurredSpinner style="position: fixed;" />
{/if}
{#key data.pathname}
  <main class="Content--maxWidth" in:fly={transitionIn} out:fly={transitionOut}>
    <slot />
  </main>
{/key}
<GoTop />
{#if $ToastStore}
  {#each $ToastStore as toast (toast.id)}
    <Toast {...toast} />
  {/each}
{/if}
<Footer />

<style lang="scss" global>
  @import "../styles/root/global.scss";
  @import "../styles/routes/dirLayout.scss";
</style>
