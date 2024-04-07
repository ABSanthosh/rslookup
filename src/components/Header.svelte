<script lang="ts">
  import { page } from "$app/stores";
  import { theme } from "$lib/ThemeStore";
  import { query } from "$lib/ParamStore";
  import { fade } from "svelte/transition";
  import { afterNavigate } from "$app/navigation";
  import { clickOutside } from "$lib/ClickOutside";
  import { HOME_ROUTES, ROUTES } from "$data/routes";

  // currentPage use the root of the url to determine the current page
  // this is because the url can be /course/... or /course
  // so we need to remove the trailing slash
  $: currentPage = ROUTES.find(
    (route) => route.route === $page.url.pathname.slice(1).split("/")[0]
  );

  $: isHome = $page.url.pathname === "/";
  $: isFeaturePage = HOME_ROUTES.map((route) => `/${route.route}`).includes(
    $page.url.pathname
  );

  let isDetailsOpen = false;
  let searchInput: HTMLInputElement;

  afterNavigate(() => {
    isDetailsOpen = false;
    query.set("");
  });
</script>

<svelte:head>
  <title>
    rslookup {currentPage !== undefined ? `| ${currentPage?.name}` : ""}
  </title>
</svelte:head>

<header class="Header">
  <div class="Header__left">
    <a
      class="Header__left--title"
      href="/"
      data-icon={isHome ? "" : String.fromCharCode(58848)}
    >
      rslookup
    </a>
  </div>
  {#if currentPage?.showSearch}
    <div
      transition:fade
      class="Header__search"
      data-icon={String.fromCharCode(59574)}
    >
      <input
        type="text"
        class="CrispInput"
        bind:this={searchInput}
        placeholder={`Search for a ${currentPage?.name.toLowerCase()}`}
        bind:value={$query}
        on:input={(e) => {
          if (!(e.target instanceof HTMLInputElement)) {
            return;
          }

          if (e.target.value === "") {
            query.set("");
            return;
          }

          query.set(e.target.value);
        }}
      />
    </div>
    <hr />
  {/if}

  {#if !isHome && !isFeaturePage}
    <details
      use:clickOutside
      bind:open={isDetailsOpen}
      class="CrispMenu Header__tabs"
      on:outclick={() => (isDetailsOpen = false)}
    >
      <summary>
        <p>
          {currentPage?.name}
        </p>
        <span data-icon={String.fromCharCode(currentPage?.icon || 0)} />
      </summary>
      <ul class="CrispMenu__content">
        {#each ROUTES as { name, route, disabled }, i}
          {#if !disabled}
            <a
              href="/{route}"
              on:click={() => (currentPage = ROUTES[i])}
              data-icon={String.fromCharCode(ROUTES[i].icon)}
              class:active={$page.url.pathname === `/${route}`}
            >
              {name}
            </a>
          {:else}
            <div data-icon={String.fromCharCode(ROUTES[i].icon)}>
              <p>
                {name}
              </p>
              <span> (coming soon) </span>
            </div>
          {/if}
        {/each}
      </ul>
    </details>
  {:else}
    <ul class="Header__navList">
      {#each HOME_ROUTES as item}
        <li>
          <a
            href={item.route}
            class:active={$page.url.pathname === `/${item.route}`}
          >
            {item.name}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
  <div class="Header__right">
    <button
      class="CrispButton"
      data-icon={String.fromCharCode($theme === "dark" ? 58416 : 58652)}
      aria-label="Toggle theme"
      on:click={() => {
        theme.set($theme === "dark" ? "light" : "dark");
      }}
    />
  </div>
</header>

<style lang="scss">
  .Header {
    --__BG: var(--elevatedBG);

    align-items: center;
    @include make-flex($dir: row);

    top: 0;
    left: 0;
    right: 0;
    gap: 10px;
    z-index: 5;
    position: fixed;
    padding: 16px 20px;
    background: var(--__BG);
    @include box(100%, 64px);
    border-bottom: 1px solid var(--border);

    & > hr {
      background: var(--border);
      @include box(1px, 75%);
      border: none;
    }

    &__left {
      gap: 5px;
      flex-grow: 1;
      font-size: 20px;
      overflow: hidden;
      font-weight: 400;
      @include box(auto);
      margin-left: -13px;
      padding-left: 13px;
      white-space: nowrap;
      text-overflow: ellipsis;
      @include make-flex($dir: row, $just: flex-start);
      margin-bottom: -1px;
      &--title {
        font-size: 30px;
        font-weight: 500;
        user-select: none;
        line-height: 100%;
        position: relative;
        font-style: italic;
        margin-bottom: 5px;

        text-decoration: none;
        color: var(--foreground);
        font-family: "Fraunces", serif;
        font-optical-sizing: auto;
        font-variation-settings: "SOFT" 100, "WONK" 0;

        &::before {
          left: 0;
          opacity: 0;
          position: absolute;
          top: calc(50% + 3px);
          transform: translate(0px, -50%);
          transition: opacity 0.3s, transform 0.3s ease;
        }

        &:hover {
          &::before {
            opacity: 1;
            transform: translate(-14px, -50%);
          }
        }
      }
    }

    &__search {
      @include box();
      position: relative;
      max-width: 260px;
      &::before {
        top: 52%;
        left: 7px;
        font-size: 18px;
        position: absolute;
        pointer-events: none;
        transform: translateY(-50%);
      }

      @include respondAt(700px) {
        @include box(auto);
        &:has(input:focus) {
          position: fixed;
          @include box(calc(100vw - 40px), 32px);
          max-width: none;
          left: 50%;
          z-index: 2;
          transform: translateX(-50%);
        }
      }

      & > input {
        @include box();
        font-size: 16px;
        border-radius: 6px;
        padding: 0 24px 0 30px;

        @include respondAt(700px) {
          padding: 0;
          color: transparent;
          @include box(32px, 32px);
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
        & > a,
        & > div {
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
          &:hover {
            background-color: var(--buttonHoverBG);
          }
          &.active {
            background-color: var(--activeNav);
          }
        }
        & > div {
          cursor: not-allowed;
          & > span {
            position: relative;
            white-space: nowrap;
            bottom: 0;
            gap: 10px;
            font-size: 12px;
          }
        }
      }
    }

    &__right {
      @include make-flex($dir: row, $just: flex-end);
      @include box(auto);
      gap: 15px;

      @include respondAt(585px) {
        gap: 10px;
      }

      & > button {
        padding: 7px;
        @include make-flex();
        @include box(32px, 32px);
        background-color: var(--__BG);

        &::before {
          font-size: 18px;
          transition: all 0.1s ease-in-out;
        }

        &:hover {
          &::before {
            color: var(--foreground);
          }
        }
      }
    }

    &__navList {
      @include make-flex($dir: row, $just: flex-start);
      list-style: none;
      padding: 0;
      margin: 0;

      & > li {
        @include make-flex($dir: row, $just: flex-start);
        & > a {
          text-decoration: none;
          color: var(--subText);
          padding: 5px 10px;
          @include box(auto);
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
  }
</style>
