<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  const ROUTES = [
    {
      name: "Professors",
      path: "prof",
      isAvailable: true,
    },
    {
      name: "Labs",
      path: "lab",
      isAvailable: true,
    },
    {
      name: "Courses",
      path: "course",
      isAvailable: false,
    },
  ] as const;

  // subscribable store that contains the current page
  let currentPage = ROUTES.find(
    (route) => route.path === $page.url.pathname.slice(1)
  );

  let isDetailsOpen = false;

  // if isDetailsOpen is true, then close it on click outside

  onMount(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDetailsOpen &&
        !(event.target as Element)?.closest(".Header__middle--mobile")
      ) {
        isDetailsOpen = false;
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<header class="Header">
  <div class="Header__left">
    <p class="Header__left--title">rslookup</p>
  </div>
  <ul class="Header__middle--desktop">
    {#each ROUTES as { name, path, isAvailable }, i}
      <li
        class="Header__middle--item"
        class:active={$page.url.pathname === `/${path}`}
      >
        {#if isAvailable}
          <a href={path}>
            {name}
          </a>
        {:else}
          <p>
            {name}
          </p>
          <span> (coming soon) </span>
        {/if}
      </li>
    {/each}
  </ul>
  <details class="Header__middle--mobile" bind:open={isDetailsOpen}>
    <summary>
      {currentPage?.name}
    </summary>
    <ul>
      {#each ROUTES as { name, path, isAvailable }, i}
        <li class:active={$page.url.pathname === `/${path}`}>
          {#if isAvailable}
            <a href={path} on:click={() => (currentPage = ROUTES[i])}>
              {name}
            </a>
          {:else}
            <p>
              {name}
            </p>
            <span> (coming soon) </span>
          {/if}
        </li>
      {/each}
    </ul>
  </details>

  <div class="Header__right">
    <a
      href="https://github.com/ABSanthosh/rslookup"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/assets/images/github.svg" alt="Github" />
    </a>
  </div>
</header>

<style lang="scss" src="./Header.scss"></style>
