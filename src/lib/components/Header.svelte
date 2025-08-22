<script lang="ts">
  import { page } from '$app/state';
  import debounce from '$utils/debounce';
  import { fade } from 'svelte/transition';
  import { theme } from '$stores/ThemeStore';
  import { query } from '$stores/QueryStore';
  import Spinner from './Spinner/Spinner.svelte';
  import { afterNavigate } from '$app/navigation';
  import clickOutside from '$utils/onClickOutside';
  import { APP_ROUTES, HOME_ROUTES, ROUTES } from '$data/routes';
  import { themeToggleTransition } from '$utils/themeToggle';
  import { getContext } from 'svelte';
  import type { User } from '$types/db/User.type';

  afterNavigate(() => {
    isNavOpen = false;
    query.set('');
  });

  const noThemeRoutes = ['/convocation-2024'];

  let localQueryValue = $state('');
  let isHomeRoute = $derived(
    ['/', ...HOME_ROUTES.map((r) => `/${r.route}`)].includes(page.url.pathname)
  );
  let path = $derived(page.url.pathname.slice(1).split('/')[0]);
  let currentRoute = $derived(ROUTES.find((r) => r.route.includes(path === '' ? 'home' : path)));

  let isAppRoute = $derived(page.url.pathname.startsWith('/app'));
  let isNavOpen = $state(false);
  let isSearching = $state(false);

  const { user }: { user: User } = getContext('user');
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
        data-no-marker
        use:clickOutside
        bind:open={isNavOpen}
        onOutClick={() => (isNavOpen = false)}
        class="CrispMenu Header__tabs Header__navList--mobile"
      >
        <summary>
          <p></p>
          <span data-icon="menu" aria-label="Menu"></span>
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
      <div transition:fade class="Header__search" data-icon="search">
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
            data-icon="close"
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
          <span data-icon={currentRoute?.icon}></span>
        </summary>
        <ul class="CrispMenu__content">
          {#each ROUTES as { name, route, separator }, i}
            {#if separator}
              <hr class="CrispMenu__separator" />
            {/if}

            <a
              href="/{route}"
              data-icon={ROUTES[i].icon}
              class:active={page.url.pathname === `/${route}`}
            >
              {name}
            </a>
          {/each}
        </ul>
      </details>
    {/if}
    {#if isAppRoute}
      <ul class="Header__navList Header__navList--desktop">
        {#each APP_ROUTES as item}
          <li>
            <a href={item.route} class:active={page.url.pathname === `/${item.route}`}>
              {item.name}
            </a>
            <!-- logout -->
            <form hidden action="/auth?/logout" method="POST" id="logout-form"></form>
            <button
              class="CrispButton"
              type="submit"
              form="logout-form"
              data-icon="logout"
              aria-label="Logout"
            >
              Logout
            </button>
          </li>
        {/each}
      </ul>
    {:else if user}
      <a href="app" class="CrispButton">Dashboard</a>
    {:else}
      <form hidden action="/auth?/login" method="POST" id="google-login"></form>
      <button class="CrispButton" type="submit" form="google-login">Sign In</button>
    {/if}
    {#if !noThemeRoutes.includes(page.url.pathname)}
      <button
        aria-label="Toggle theme"
        use:themeToggleTransition
        class="CrispButton Header__theme-toggle"
        data-icon={$theme === 'dark' ? 'light_mode' : 'dark_mode'}
      ></button>
    {/if}
  </div>
</header>

<style lang="scss">
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
      // background-color: aqua;

      & > button {
        top: 50%;
        padding: 0;
        right: 0px;
        position: absolute;
        transform: translateY(-50%);

        --crp-button-width: 30px;
        --crp-button-height: 100%;
        border-radius: 0 7.8px 7.8px 0;
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
          top: 50%;
          left: 50%;
          z-index: 2;
          position: absolute;
          max-width: none;
          transform: translate(-50%, -50%);
          @include box(calc(100vw - 30px), 33px);

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
          transition: width 0.1s ease-in-out;
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
