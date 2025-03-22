<script lang="ts">
  import { page } from '$app/state';
  import { theme, setTheme } from '$stores/ThemeStore';
  import { query } from '$stores/QueryStore';
  import { afterNavigate } from '$app/navigation';
  import { HOME_ROUTES, ROUTES } from '$data/routes';
  import clickOutside from '$utils/onClickOutside';
  import { fade } from 'svelte/transition';
  import debounce from '$utils/debounce';
  import Spinner from './Spinner/Spinner.svelte';

  afterNavigate(() => {
    isNavOpen = false;
    query.set('');
  });

  let themeToggle: HTMLButtonElement | null = $state(null);

  const themeToggleTransition = async () => {
    if (
      !themeToggle ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme($theme === 'dark' ? 'light' : 'dark');
      return;
    }

    document
      .startViewTransition(async () => {
        setTheme($theme === 'dark' ? 'light' : 'dark');
      })
      .ready.then(() => {
        // https://akashhamirwasia.com/blog/full-page-theme-toggle-animation-with-view-transitions-api/#what-is-the-grow-animation
        const { top, left, width, height } = themeToggle!.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;
        const right = window.innerWidth - left;
        const bottom = window.innerHeight - top;
        const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));
        const isDark = $theme !== 'dark';
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`
        ];

        document.documentElement.animate(
          {
            clipPath: isDark ? clipPath.reverse() : clipPath
          },
          {
            duration: 500,
            easing: 'ease-in-out',
            pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
          }
        );
      });
  };

  const noThemeRoutes = ['/convocation-2024'];

  let localQueryValue = $state('');
  let isHomeRoute = $state(
    ['/', ...HOME_ROUTES.map((r) => `/${r.route}`)].includes(page.url.pathname)
  );
  let path = $state(page.url.pathname.slice(1).split('/')[0]);
  let currentRoute = $state(ROUTES.find((r) => r.route.includes(path === '' ? 'home' : path)));
  let isNavOpen = $state(false);
  let isSearching = $state(false);
</script>

<header class="Header">
  <div class="Header__left">
    <a href="/">
      <h2>rslookup</h2>
    </a>
  </div>
  <div class="Header__right">
    {#if isHomeRoute}
      <ul class="Header__navList Header__navList--desktop">
        {#each HOME_ROUTES as item}
          <li>
            <a href={item.route} class:active={page.url.pathname === `/${item.route}`}>
              {item.name}
            </a>
          </li>
        {/each}
      </ul>
      <details
        use:clickOutside
        bind:open={isNavOpen}
        data-no-marker
        class="CrispMenu Header__tabs Header__navList--mobile"
        onOutClick={() => (isNavOpen = false)}
      >
        <summary>
          <p></p>
          <span data-icon={String.fromCharCode(58834)} aria-label="Menu"></span>
        </summary>
        <ul class="CrispMenu__content">
          {#each HOME_ROUTES as item}
            <a href={item.route} class:active={page.url.pathname === `/${item.route}`}>
              {item.name}
            </a>
          {/each}
        </ul>
      </details>
    {/if}
    {#if currentRoute?.showSearch}
      <div transition:fade class="Header__search" data-icon={String.fromCharCode(59574)}>
        <Spinner height={20} width={20} style="display: {isSearching ? 'block' : 'none'};" />
        <input
          type="text"
          class="CrispInput"
          placeholder={`Search for ${currentRoute?.name.toLowerCase()}`}
          bind:value={localQueryValue}
          use:debounce={{
            value: localQueryValue,
            func: () => {
              query.set(localQueryValue);
              isSearching = false;
            },
            duration: 500
          }}
          oninput={(e) => {
            if (!(e.target instanceof HTMLInputElement)) return;
            if (e.target.value === '') {
              query.set('');
              return;
            } else {
              isSearching = true;
            }
          }}
        />
        {#if $query !== ''}
          <button
            class="CrispButton"
            data-type="danger"
            onclick={() => {
              query.set('');
              localQueryValue = '';
            }}
            data-icon={String.fromCharCode(58829)}
            aria-label="Clear search"
          ></button>
        {/if}
      </div>
      <hr />
    {/if}
    {#if currentRoute}
      <details
        use:clickOutside
        bind:open={isNavOpen}
        class="CrispMenu Header__tabs"
        onOutClick={() => (isNavOpen = false)}
      >
        <summary>
          <p>
            {currentRoute?.name}
          </p>
          <span data-icon={String.fromCharCode(currentRoute?.icon || 0)}></span>
        </summary>
        <ul class="CrispMenu__content">
          {#each ROUTES as { name, route, separator }, i}
            {#if separator}
              <hr class="CrispMenu__separator" />
            {/if}

            <a
              href="/{route}"
              onclick={() => (currentRoute = ROUTES[i])}
              data-icon={String.fromCharCode(ROUTES[i].icon)}
              class:active={page.url.pathname === `/${route}`}
            >
              {name}
            </a>
          {/each}
        </ul>
      </details>
    {/if}
    {#if !noThemeRoutes.includes(page.url.pathname)}
      <button
        bind:this={themeToggle}
        aria-label="Toggle theme"
        class="CrispButton Header__theme-toggle"
        onclick={async () => await themeToggleTransition()}
        data-icon={String.fromCharCode($theme === 'dark' ? 58416 : 58652)}
      ></button>
    {/if}
  </div>
</header>

<style lang="scss">
  :root {
    &::view-transition-old(root),
    &::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }
  }

  .Header {
    top: 0;
    left: 0;
    right: 0;
    gap: 10px;
    z-index: 5;
    position: fixed;
    padding: 15px 20px;
    @include box(100%, 64px);
    @include make-flex($dir: row);
    background: var(--elevation-1);
    border-bottom: 1px solid var(--t-crp-border);

    &__left {
      & > a {
        font-size: 20px;
        user-select: none;
        line-height: 100%;
        position: relative;
        font-style: italic;

        text-decoration: none;
        color: var(--foreground);
        font-family: 'Fraunces', serif;
        font-variation-settings:
          'SOFT' 80,
          'WONK' 0;

        h2 {
          font-weight: 500;
          margin-bottom: 5px;
        }

        @include respondAt(700px) {
          font-size: 18px;
          h2 {
            margin-bottom: 0px;
          }
        }
      }
    }

    &__right {
      gap: 10px;
      @include box(auto);
      margin-left: auto;
      @include make-flex($dir: row, $just: flex-end);

      @include respondAt(585px) {
        gap: 10px;
      }

      & > hr {
        border: none;
        @include box(1px, 75%);
        background: var(--t-crp-border);
      }
    }

    &__theme-toggle {
      padding: 7px;
      @include make-flex();
      @include box(30px, 30px);
      --crp-button-background-color: var(--elevation-1);
    }

    &__navList {
      margin: 0;
      padding: 0;
      list-style: none;
      @include make-flex($dir: row, $just: flex-start);

      &--desktop {
        @include respondAt(450px) {
          display: none;
        }
      }

      &--mobile {
        display: none;
        @include respondAt(450px) {
          display: block;
        }
      }

      & > li {
        @include make-flex($dir: row, $just: flex-start);
        & > a {
          font-weight: 500;
          padding: 5px 10px;
          @include box(auto);
          text-decoration: none;
          color: var(--subFg-1);
          transition: all 0.1s ease-in-out;

          &:hover {
            color: var(--foreground);
          }
          &.active {
            color: var(--foreground);
          }
        }
      }
    }

    &__search {
      max-width: 260px;
      position: relative;
      @include box(100%, 30px);

      & > button {
        top: 50%;
        padding: 0;
        right: 0px;
        position: absolute;
        transform: translateY(-50%);

        --crp-button-width: 30px;
        --crp-button-height: 100%;
        border-radius: 0 6px 6px 0;
        --crp-button-background-color: var(--elevation-2);

        @include respondAt(700px) {
          display: none;
        }
        &::before {
          font-size: 15px;
        }
      }

      :global(.Spinner) {
        left: 5px;
        margin-top: 5px;
        position: absolute;
        pointer-events: none;
        background-color: var(--elevation-1);
      }
      &::before {
        top: 52%;
        left: 7px;
        font-size: 18px;
        position: absolute;
        pointer-events: none;
        transform: translateY(-50%);

        @include respondAt(700px) {
          left: 6px;
        }
      }

      &:has(input:focus),
      &:has(input:active),
      &:has(input:hover) {
        :global(.Spinner) {
          background-color: var(--t-crp-background-hover);
        }

        & > button {
          border-top: 1px solid var(--t-crp-border-hover);
          border-right: 1px solid var(--t-crp-border-hover);
          border-bottom: 1px solid var(--t-crp-border-hover);

          &:hover {
            border: var(--crp-button-border-hover);
            background-color: var(--crp-button-background-color-hover);
          }
        }
      }

      @include respondAt(700px) {
        // @include box(auto);
        width: auto;

        &:has(input:focus),
        &:has(input:active) {
          top: 18px;
          left: 50%;
          z-index: 2;
          position: fixed;
          max-width: none;
          transform: translateX(-50%);
          @include box(calc(100vw - 30px), 30px);

          & > button {
            display: flex;
          }
        }
      }

      & > input {
        @include box();
        font-size: 16px;
        // border-radius: 6px;
        padding: 0 24px 0 30px;

        @include respondAt(700px) {
          padding: 0;
          color: transparent;
          @include box(30px, 30px);
          &:not(:focus)::placeholder {
            color: transparent;
          }
        }

        &:active,
        &:focus {
          @include respondAt(700px) {
            @include box();
            padding: 0 24px 0 30px;
            color: var(--foreground);

            &:not(:focus)::placeholder {
              color: unset;
            }
          }
        }
      }
    }

    &__tabs {
      $responsiveWidth: 600px;

      @include respondAt($responsiveWidth) {
        --crp-menu-min-width: unset;
      }
      summary {
        & > span {
          display: none;
          @include respondAt($responsiveWidth) {
            @include make-flex();
          }
        }

        p {
          @include respondAt($responsiveWidth) {
            display: none;
          }
        }
      }

      & > ul {
        width: 220px;
        & > a {
          gap: 7px;
          padding: 6px 8px;
          user-select: none;
          border-radius: 6px;
          white-space: nowrap;
          text-decoration: none;
          color: var(--foreground);
          @include box(100%, 30px);
          @include make-flex($dir: row, $just: flex-start);
        }
        a {
          &.active,
          &:hover {
            background-color: var(--t-crp-background-hover);
          }
        }
      }
    }
  }
</style>
