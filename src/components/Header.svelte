<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import { theme } from "$lib/ThemeStore";
  import { query } from "$lib/ParamStore";

  const ROUTES = [
    {
      name: "Professors",
      path: "prof",
      icon: 59389,
      title: "Where's My Prof?",
      isAvailable: true,
    },
    {
      name: "Labs",
      path: "lab",
      icon: 59962,
      title: "Where's My Lab?",
      isAvailable: true,
    },
    {
      name: "Courses",
      path: "course",
      icon: 62779,
      title: "Where's My Course?",
      isAvailable: false,
    },
  ] as const;

  // subscribable store that contains the current page
  $: currentPage = ROUTES.find(
    (route) => route.path === $page.url.pathname.slice(1)
  );

  let isDetailsOpen = false;

  onMount(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDetailsOpen &&
        !(event.target as Element)?.closest(".FancyMenu.Header__tabs")
      ) {
        isDetailsOpen = false;
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  afterNavigate(() => {
    isDetailsOpen = false;
  });
</script>

<svelte:head>
  <title>rslookup | {currentPage?.name}</title>
</svelte:head>

<header class="Header">
  <div class="Header__left">
    <p class="Header__left--title">rslookup</p>
  </div>
  <div class="Header__search" data-icon={String.fromCharCode(59574)}>
    <input
      type="text"
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
    {#if $query !== ""}
      <button
        data-icon={String.fromCharCode(58829)}
        on:click={() => {
          query.set("");
        }}
      />
    {/if}
  </div>
  <hr />
  <details class="FancyMenu Header__tabs" bind:open={isDetailsOpen}>
    <summary>
      <p>
        {currentPage?.name}
      </p>
      <span data-icon={String.fromCharCode(currentPage?.icon || 0)} />
    </summary>
    <ul class="FancyMenu__content" data-align="right">
      {#each ROUTES as { name, path, isAvailable }, i}
        {#if isAvailable}
          <a
            href={path}
            on:click={() => (currentPage = ROUTES[i])}
            data-icon={String.fromCharCode(ROUTES[i].icon)}
            class:active={$page.url.pathname === `/${path}`}
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
  <div class="Header__right">
    <button
      class="FancyButton"
      data-icon={String.fromCharCode($theme === "dark" ? 58416 : 58652)}
      on:click={() => {
        theme.set($theme === "dark" ? "light" : "dark");
      }}
    />
  </div>
</header>

<style lang="scss">
  .Header {
    --__BG: var(--elevatedBG);

    display: grid;
    grid-template-columns: 1fr auto auto auto auto;
    align-items: center;

    top: 0;
    right: 0;
    left: 0;
    z-index: 5;
    position: fixed;
    gap: 10px;
    padding: 16px 20px;
    @include box(100%, 64px);
    background: var(--__BG);
    // border-bottom: 1px solid var(--border);
    box-shadow: var(--headerBorder);

    & > hr {
      background: var(--border);
      @include box(1px, 75%);
      border: none;
    }

    &__left {
      gap: 5px;
      font-size: 20px;
      overflow: hidden;
      font-weight: 400;
      @include box(auto);
      white-space: nowrap;
      text-overflow: ellipsis;
      @include make-flex($dir: row, $just: flex-start);

      &--title {
        font-family: "Nohemi", sans-serif;
        font-size: 30px;
        font-weight: 500;
        color: var(--foreground);
      }
    }

    &__search {
      @include box();
      position: relative;
      &::before {
        top: 50%;
        left: 7px;
        font-size: 18px;
        position: absolute;
        pointer-events: none;
        transform: translateY(-50%);
      }

      @include respondAt(700px) {
        @include box(auto);
      }

      & > button {
        top: 50%;
        right: 1px;
        border: none;
        outline: none;
        @include box(auto, calc(100% - 2px));
        cursor: pointer;
        font-size: 18px;
        position: absolute;
        @include make-flex();
        border-radius: 0 6px 6px 0;
        transform: translateY(-50%);
        background-color: transparent;
        border-left: 1px solid var(--border);

        &:hover {
          background-color: var(--buttonHoverBG);
        }

        @include respondAt(700px) {
          display: none;
        }
      }

      & > input {
        outline: none;
        @include box();
        font-size: 14px;
        border-radius: 6px;
        padding: 0 24px 0 30px;
        color: var(--foreground);
        background-color: var(--__BG);
        border: 1px solid var(--border);
        box-shadow: var(--buttonShadow);

        @include respondAt(700px) {
          padding: 0;
          @include box(32px, 32px);

          color: transparent;
          &::placeholder {
            color: transparent;
          }
        }

        &:active,
        &:focus {
          background-color: var(--buttonHoverBG);
          border: 1px solid var(--buttonHoverBorder);

          @include respondAt(700px) {
            @include box();
            padding: 0 24px 0 30px;
            color: var(--foreground);

            &::placeholder {
              color: unset;
            }
          }
        }
      }
    }

    &__tabs {
      $responsiveWidth: 600px;
      summary {
        background-color: var(--__BG);
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
  }
</style>
