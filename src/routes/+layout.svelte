<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { getCookie } from '$utils/cookie';
  import Toast from '$components/Toast.svelte';
  import GoTop from '$components/GoTop.svelte';
  import Header from '$components/Header.svelte';
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { ToastStore } from '$stores/ToastStore.js';
  import { theme, setTheme } from '$stores/ThemeStore';
  import { navigating } from '$app/stores';
  import BlurredSpinner from '$components/Spinner/BlurredSpinner.svelte';
  import Footer from '$components/Footer.svelte';
  import { EasterEgg } from '$utils/EasterEgg.js';

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

    if (process.env.NODE_ENV === 'production') EasterEgg();
  });
</script>

<svelte:head>
  <title>rslookup | SNU</title>
  <meta name="color-scheme" content={$theme} />
  <meta name="theme-color" content={$theme === 'light' ? '#f6f8fa' : '#1a1a1b'} />
  <link rel="stylesheet" href="/theme/colors.css" />
  <link rel="stylesheet" href="/theme/light.css" />
  <link rel="stylesheet" href="/theme/dark.css" />
</svelte:head>

<Header />

{#if $navigating}
  <BlurredSpinner style="position: fixed;" />
{/if}

{#if !data.url.includes('clubs')}
  {#key data.url}
    <main class="MainContainer" in:fly={transitionIn} out:fly={transitionOut}>
      <slot />
    </main>
  {/key}
{:else}
  <main class="MainContainer">
    <slot />
  </main>
{/if}

<GoTop />

{#if $ToastStore}
  {#each $ToastStore as toast (toast.id)}
    <Toast {...toast} />
  {/each}
{/if}

<Footer />

<style lang="scss" global>
  @import '../styles/root/global.scss';

  .Layout {
    &__header {
      margin-top: 20px;
    }
    &__filter {
      min-width: unset;
      @include box(auto, 30px);
      & > summary {
        gap: 8px;
        padding: 5px 12px;
        background-color: var(--elevation-1);

        &::before {
          position: relative;
        }

        & > span {
          flex-shrink: 0;
          font-size: 12px;
          font-weight: 500;
          border-radius: 50%;
          @include make-flex();
          @include box(20px, 20px);
          background-color: var(--elevation-2);
        }
      }

      &--content {
        gap: 8px;
        @include respondAt(421px) {
          width: 80vw;
        }
      }

      &--item {
        gap: 8px;
        padding: 8px;
        @include box();
        cursor: pointer;
        border-radius: 5px;
        white-space: nowrap;
        border: 1px solid transparent;
        @include make-flex($dir: row, $just: flex-start);
        &:hover {
          background-color: var(--buttonHoverBG);
        }

        @include respondAt(421px) {
          white-space: normal;
        }
      }
    }
  }
</style>
