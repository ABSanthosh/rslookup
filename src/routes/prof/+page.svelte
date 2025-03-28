<script lang="ts">
  import ProfCard from '$components/ProfCard/ProfCard.svelte';
  import { profColors, schools } from '$data/prof';
  import clickOutside from '$utils/onClickOutside';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { query } from '$stores/QueryStore';
  import { search } from 'fast-fuzzy';
  import Pagination from '$components/Pagination.svelte';

  let { data }: { data: PageData } = $props();

  let isFilterOpen = $state(false);
  let isDisclaimerOpen = $state(false);

  let filters = $state(
    Object.keys(schools).map((item) => {
      return {
        name: item,
        checked: true,
        slug: schools[item].slug,
        color: schools[item].color
      };
    })
  );

  const prof = data.prof; // won't change. This is the original data

  let paginationConfig = $state({
    pageSize: 20,
    start: 0,
    end: 20
  });

  // We need 3 filters applied to the prof data here
  // 1. Filter by school
  // 2. Filter by search query on the filtered by school data
  // 3. Paginate the search result

  let profSearch = $state(prof); // We alter this data according to search query
  let finalProfList = $derived.by(() => {
    const filteredSchools = filters.filter((item) => item.checked).map((item) => item.name);
    const unPaginatedProfList = profSearch.filter((item) => {
      if (!Object.keys(schools).includes(item.school)) {
        return filteredSchools.includes('Miscellaneous');
      }
      return filteredSchools.includes(item.school);
    });

    return unPaginatedProfList.slice(paginationConfig.start, paginationConfig.end);
  });

  onMount(() => {
    query.subscribe((q: string) => {
      if (q === '') {
        profSearch = prof;
        return;
      }

      if (paginationConfig.start !== 0 || paginationConfig.end !== paginationConfig.pageSize) {
        paginationConfig.start = 0;
        paginationConfig.end = 20;
        paginationConfig.pageSize = 20;
      }

      console.log('searching for', q);

      profSearch = search(q, prof, {
        keySelector: (item) => item.name
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
</script>

<svelte:head>
  <title>Professors</title>
  <meta name="description" content="Find essential details about your professors here." />
  <meta
    name="keywords"
    content={`
    professors, 
    teachers, 
    educators, 
    snu, 
    snioe, 
    Shiv Nadar University, 
    room number,
    room no.,
    snu.edu.in,
    ${prof.map((item) => item.name).join(', ')},
    ${prof.map((item) => item.school).join(', ')},
    ${prof.map((item) => item.mail).join(', ')}
    `}
  />
  <meta name="author" content="Santhosh" />
  <meta name="robots" content="index, follow" />
</svelte:head>

<div class="Layout__header Row--between w-100">
  <h2>Where's My Prof?</h2>
  <details
    use:clickOutside
    bind:open={isFilterOpen}
    class="CrispMenu Layout__filter"
    onOutClick={() => (isFilterOpen = false)}
  >
    <summary data-no-marker data-icon="filter_list">
      Filters
      <span>
        {filters.filter((item) => item.checked).length}
      </span>
    </summary>
    <div class="CrispMenu__content Layout__filter--content">
      {#each filters as filterItem}
        <label
          for={filterItem.slug}
          class="Layout__filter--item"
          class:active={filterItem.checked}
          style={`
          --type-primary: ${profColors[filterItem.color].primary};
          --type-secondary: ${profColors[filterItem.color].secondary};
          `}
        >
          <input
            type="checkbox"
            class="CrispInput"
            id={filterItem.slug}
            checked={filterItem.checked}
            disabled={filterItem.checked && filters.filter((item) => item.checked).length === 1}
            onchange={() => {
              filterItem.checked = !filterItem.checked;
            }}
          />

          {filterItem.name}
        </label>
      {/each}
    </div>
  </details>
</div>

<details
  data-no-icon
  data-type="info"
  data-format="box"
  use:clickOutside
  bind:open={isDisclaimerOpen}
  class="Prof__disclaimer CrispMessage"
  onOutClick={() => (isDisclaimerOpen = false)}
>
  <summary class="CrispMessage" data-type="info">
    Disclosure -
    <i style="color: inherit;"> Click to expand </i>
  </summary>
  <div class="Prof__disclaimer--content">
    This information may not always be accurate as cabin numbers are subject to change. Incase of
    any discrepancies, please verify with D block security and notify us so we can make the
    necessary updates.
  </div>
</details>

{#key finalProfList}
  <div class="Prof__content">
    {#if finalProfList.length === 0}
      <i
        class="CrispMessage"
        data-type="error"
        data-format="box"
        style="height: 40px; grid-column: 1 / 3 ;"
      >
        No results found.
      </i>
    {:else}
      {#each finalProfList as profItem (`${profItem.name}-${profItem.role}`)}
        <ProfCard {...profItem} />
      {/each}
    {/if}
  </div>
{/key}

<div class="Prof__bottom w-100">
  <select
    class="CrispSelect"
    value={`${paginationConfig.pageSize}`}
    onchange={(e: Event) => {
      const target = e.target as HTMLSelectElement;
      if (target) {
        paginationConfig.pageSize = Number(target.value);
        paginationConfig.start = 0;
        paginationConfig.end = paginationConfig.pageSize;
      }
    }}
    disabled={$query !== ''}
  >
    <option value="20">20</option>
    <option value="40">40</option>
    <option value="80">80</option>
    <option value={`${prof.length}`}>All ({prof.length})</option>
  </select>
  <Pagination disabled={$query !== ''} bind:paginationConfig bind:itemsLength={profSearch.length} />
</div>

<style lang="scss">
  .Layout {
    &__filter {
      &--item {
        user-select: none;
        &.active {
          color: var(--type-primary);
          background: var(--type-secondary);
          border: 1px solid var(--type-primary);
        }
      }
    }
  }

  .Prof {
    &__content {
      gap: 18px;
      min-width: 0;
      @include box();

      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: minmax(50px, auto) 1fr;
      @include respondAt(800px) {
        grid-template-columns: 1fr;
      }

      & > span {
        max-width: 100%;
        overflow-x: hidden;
        @include make-flex();
      }
    }

    &__bottom {
      gap: 20px;
      margin-top: auto;
      @include make-flex($dir: row, $just: space-between);

      @include respondAt(345px) {
        flex-direction: column;
      }

      @include respondAt(440px) {
        & > select {
          margin-right: auto;
          --crp-select-width: 70px;
          --crp-select-min-width: 70px;
        }

        :global(.Pagination) {
          margin-left: auto;
        }
      }
    }

    &__disclaimer {
      --crp-message-padding: 8px;
      margin-bottom: -8px;
      background-repeat: no-repeat;
      background-size: right 5px top 50%;
      background-position: right 5px top 7px;
      background-image: var(--t-crp-select-downArrow);
      @include make-flex($just: flex-start, $align: flex-start);

      & > summary {
        cursor: pointer;
        list-style: none;

        &::marker,
        &::-webkit-details-marker {
          display: none;
        }

        &:first-of-type {
          list-style-type: none;
        }
      }

      &--content {
        @include box();
        line-height: 1.4;
        padding: 10px 6px 4px 6px;
      }
    }
  }
</style>
