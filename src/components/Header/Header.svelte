<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import { theme } from "$lib/ThemeStore";

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
    <button
      class="FancyButton"
      on:click={() => {
        theme.set($theme === "dark" ? "light" : "dark");
      }}
    >
      <svg
        fill="none"
        viewBox="0 0 22 22"
        style="height: 100%; width: 100%;"
        xmlns="http://www.w3.org/2000/svg"
      >
        {#if $theme === "dark"}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11 0C11.3879 0 11.7021 0.314357 11.7021 0.702128V2.57447C11.7021 2.96224 11.3879 3.2766 11 3.2766C10.6122 3.2766 10.2979 2.96224 10.2979 2.57447V0.702128C10.2979 0.314357 10.6122 0 11 0ZM11 7.02128C8.80262 7.02128 7.02128 8.80262 7.02128 11C7.02128 13.1974 8.80262 14.9787 11 14.9787C13.1974 14.9787 14.9787 13.1974 14.9787 11C14.9787 8.80262 13.1974 7.02128 11 7.02128ZM5.61702 11C5.61702 8.0271 8.0271 5.61702 11 5.61702C13.9729 5.61702 16.383 8.0271 16.383 11C16.383 13.9729 13.9729 16.383 11 16.383C8.0271 16.383 5.61702 13.9729 5.61702 11ZM4.21465 3.22183C3.94045 2.94764 3.49588 2.94764 3.22169 3.22183C2.94749 3.49603 2.94749 3.94059 3.22169 4.21479L4.54563 5.53874C4.81983 5.81293 5.26439 5.81293 5.53859 5.53874C5.81279 5.26453 5.81279 4.81998 5.53859 4.54578L4.21465 3.22183ZM22 11C22 11.3878 21.6856 11.7021 21.2979 11.7021H19.4255C19.0378 11.7021 18.7234 11.3878 18.7234 11C18.7234 10.6122 19.0378 10.2979 19.4255 10.2979H21.2979C21.6856 10.2979 22 10.6122 22 11ZM18.7784 4.21479C19.0525 3.94059 19.0525 3.49603 18.7784 3.22183C18.5042 2.94764 18.0596 2.94764 17.7854 3.22183L16.4614 4.54578C16.1872 4.81998 16.1872 5.26453 16.4614 5.53874C16.7356 5.81293 17.1801 5.81293 17.4543 5.53874L18.7784 4.21479ZM11 18.7234C11.3879 18.7234 11.7021 19.0378 11.7021 19.4255V21.2979C11.7021 21.6856 11.3879 22 11 22C10.6122 22 10.2979 21.6856 10.2979 21.2979V19.4255C10.2979 19.0378 10.6122 18.7234 11 18.7234ZM17.4545 16.4612C17.1803 16.187 16.7357 16.187 16.4615 16.4612C16.1873 16.7354 16.1873 17.18 16.4615 17.4542L17.7855 18.7782C18.0597 19.0524 18.5042 19.0524 18.7785 18.7782C19.0527 18.504 19.0527 18.0594 18.7785 17.7852L17.4545 16.4612ZM3.2766 11C3.2766 11.3878 2.96224 11.7021 2.57447 11.7021H0.702128C0.314357 11.7021 0 11.3878 0 11C0 10.6122 0.314357 10.2979 0.702128 10.2979H2.57447C2.96224 10.2979 3.2766 10.6122 3.2766 11ZM5.53845 17.4542C5.81265 17.18 5.81265 16.7354 5.53845 16.4612C5.26425 16.187 4.81969 16.187 4.54549 16.4612L3.22155 17.7852C2.94734 18.0594 2.94734 18.504 3.22155 18.7782C3.49574 19.0524 3.94031 19.0524 4.21451 18.7782L5.53845 17.4542Z"
            fill="var(--foreground)"
          />
        {:else}
          <path
            d="M20.2046 12.9405C20.2321 12.8347 20.2459 12.7818 20.2311 12.7479C20.2182 12.7183 20.1928 12.6962 20.1618 12.6874C20.1262 12.6775 20.0737 12.6992 19.9689 12.7425C18.9353 13.17 17.8024 13.4059 16.6144 13.4059C11.7636 13.4059 7.83132 9.47358 7.83132 4.62282C7.83132 3.43481 8.06714 2.30188 8.49464 1.26832C8.53804 1.16345 8.55968 1.11101 8.54971 1.07536C8.54104 1.0443 8.51886 1.01892 8.48929 1.00603C8.45543 0.991246 8.4025 1.005 8.29675 1.0325C4.09903 2.12366 1 5.93902 1 10.4782C1 15.8679 5.36924 20.2372 10.759 20.2372C15.2981 20.2372 19.1135 17.1382 20.2046 12.9405Z"
            stroke="var(--foreground)"
            stroke-width="1.92857"
          />
        {/if}
      </svg>
    </button>
  </div>
</header>

<style lang="scss" src="./Header.scss"></style>
