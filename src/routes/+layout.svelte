<script lang="ts">
  import { onMount, setContext, type Snippet } from 'svelte';
  import { fly } from 'svelte/transition';
  import { navigating } from '$app/state';
  import GoTop from '$components/GoTop.svelte';
  import Toast from '$components/Toast.svelte';
  import Footer from '$components/Footer.svelte';
  import Header from '$components/Header.svelte';
  import { EasterEgg } from '$utils/EasterEgg.js';
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { ToastStore } from '$stores/ToastStore.js';
  import { theme, setTheme } from '$stores/ThemeStore';
  import BlurredSpinner from '$components/Spinner/BlurredSpinner.svelte';

  import '../styles/root/global.scss';
  import '../styles/root/theme.scss';
  import type { LayoutData } from './$types';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  const duration = 200;
  const delay = duration + 50;
  const x = 10;

  const transitionIn = { easing: cubicOut, x: x, duration, delay };
  const transitionOut = { easing: cubicIn, x: -x, duration };

  onMount(() => {
    const saved_theme = document.documentElement.getAttribute('data-theme');
    if (saved_theme) {
      setTheme(saved_theme as Theme);
    } else {
      const preference_is_dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = preference_is_dark ? 'dark' : 'light';
      setTheme(theme);
    }

    if (process.env.NODE_ENV === 'production') EasterEgg();
  });

  const user = $state(data);
  $inspect(user, 'user');

  setContext('user', user);
</script>

<svelte:head>
  <title>rslookup | SNU</title>
  <meta name="color-scheme" content={$theme} />
  <meta name="theme-color" content={$theme === 'light' ? '#f6f8fa' : '#1a1a1b'} />
</svelte:head>

<Header />

{#if navigating.type}
  <BlurredSpinner style="position: fixed;" />
{/if}

{#if !data.url.includes('clubs')}
  {#key data.url}
    <main class="MainContainer" in:fly={transitionIn} out:fly={transitionOut}>
      {@render children?.()}
    </main>
  {/key}
{:else}
  <main class="MainContainer">
    {@render children?.()}
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
        @include respondAt(444px) {
          width: calc(100vw - 40px);
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
