<!-- TODO: Fix transition between club types  -->
<!-- TEST: Add test to check if tab changes works -->
<script lang="ts">
  import { page } from '$app/state';
  import type { Snippet } from 'svelte';
  import { fly } from 'svelte/transition';
  import type { LayoutData } from './$types';
  import { cubicIn, cubicOut } from 'svelte/easing';

  let {
    data,
    children
  }: {
    data: LayoutData;
    children?: Snippet;
  } = $props();

  const duration = 200;
  const delay = duration + 50;
  const x = 10;

  const transitionIn = { easing: cubicOut, x: x, duration, delay };
  const transitionOut = { easing: cubicIn, x: -x, duration };
</script>

<main class="ClubLayout">
  <section class="ClubLayout__hero">
    <h2>What are the clubs?</h2>
    <p>Discover Your Campus Crew: Get Acquainted with SNIoE's Club Leaders and Members!</p>
  </section>
  <ul class="ClubLayout__tabs">
    <li>
      <a href="/clubs/cultural" class:active={page.url.pathname === '/clubs/cultural'}>
        Cultural
      </a>
    </li>
    <li>
      <a href="/clubs/technical" class:active={page.url.pathname === '/clubs/technical'}>
        Technical
      </a>
    </li>
  </ul>
</main>

{#key data.url}
  <main in:fly={transitionIn} out:fly={transitionOut}>
    {@render children?.()}
  </main>
{/key}

<style lang="scss">
  .ClubLayout {
    width: 100%;

    &__tabs {
      gap: 10px;
      width: auto;
      padding: 4px;
      list-style: none;
      max-width: 400px;
      border-radius: 6px;
      @include box(100%, 40px);
      background-color: var(--crp-tab-background-color);
      margin-bottom: 30px;
      @include make-flex($dir: row, $just: space-between);

      li {
        @include box();

        a {
          @include box();

          line-height: 1.2;
          padding: 6px 12px;
          border-radius: 4px;
          @include make-flex();
          text-decoration: none;

          &.active {
            background-color: var(--crp-tab-item-background-color);
          }
        }
      }
    }

    &__hero {
      @include make-flex($just: flex-start, $align: flex-start);
      margin: 40px 0 30px 0;
      gap: 10px;
      width: 100%;

      & > h2 {
        font-size: 40px;
        font-weight: 900;
        color: var(--foreground);
      }

      & > p {
        font-size: 20px;
        font-weight: 400;
        color: var(--subFg-1);
      }
    }
  }
</style>
