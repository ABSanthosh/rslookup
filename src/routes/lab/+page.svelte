<script lang="ts">
  import { onMount } from 'svelte';
  import { search } from 'fast-fuzzy';
  import type { PageData } from './$types';
  import { query } from '$stores/QueryStore';
  import { AcademicBlocks } from '$data/labs';
  import clickOutside from '$utils/onClickOutside';
  import { flip } from 'svelte/animate';

  let {
    data
  }: {
    data: PageData;
  } = $props();

  let isFilterOpen = $state(false);

  const labs = data.labs; // won't change. This is the original data
  let pageSize = $state(20);

  let filters = $state(
    Object.keys(AcademicBlocks).map((item) => {
      return {
        name: AcademicBlocks[item],
        checked: true
      };
    })
  );

  let labSearch = $state(labs);

  // Precompute the lookup index to avoid filtering over and over
  let labIndex = $derived.by(() => {
    const index = new Map();
    for (const lab of labSearch) {
      const blockKey = `${lab.block} Block`;
      if (!index.has(blockKey)) {
        index.set(blockKey, []);
      }
      index.get(blockKey).push(lab);
    }
    return index;
  });

  // Efficient filtering using a Set for O(1) lookups
  let filteredLabList = $derived.by(() => {
    const activeBlocks = new Set(filters.filter((item) => item.checked).map((item) => item.name));
    let result = [];
    for (const block of activeBlocks) {
      if (labIndex.has(block)) {
        result.push(...labIndex.get(block)); // Fast retrieval
      }
    }
    return result;
  });

  let finalLabList = $derived(filteredLabList.slice(0, pageSize));

  onMount(() => {
    query.subscribe((q: string) => {
      if (q === '') {
        labSearch = labs;
        return;
      }

      labSearch = search(q, labs, {
        keySelector: (lab) => lab.name
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
</script>

<svelte:head>
  <title>SNU Labs</title>
  <meta name="description" content="Find your lab in SNU" />
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
    ${labs.map((lab) => lab.name).join(', ')}
    `}
  />
</svelte:head>

<div class="Layout__header Row--between w-100">
  <h2>Where's My Lab?</h2>
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
        <label for={filterItem.name} class="Layout__filter--item" class:active={filterItem.checked}>
          <input
            type="checkbox"
            class="CrispInput"
            id={filterItem.name}
            bind:checked={filterItem.checked}
            disabled={filterItem.checked && filters.filter((item) => item.checked).length === 1}
          />

          {filterItem.name}
        </label>
      {/each}
    </div>
  </details>
</div>

<ul class="Lab__content">
  {#if finalLabList.length === 0}
    <i class="CrispMessage" data-type="info" data-format="box" style="grid-column: 1 / 3 ;">
      No results found.
    </i>
  {:else}
    {#each finalLabList as lab (`${lab.name}-${lab.room}`)}
      <li class="Lab__content--item" animate:flip={{ duration: 500 }}>
        <h4>{lab.name}</h4>
        <hr />
        <span>{lab.room}</span>
      </li>
    {/each}
  {/if}
</ul>

<div class="Row--end w-100">
  <select
    class="CrispSelect"
    value={`${pageSize}`}
    onchange={(e) => {
      pageSize = Number((e.target as HTMLSelectElement).value);
    }}
  >
    <option value="20">20</option>
    <option value="40">40</option>
    <option value="80">80</option>
    <option value={`${labSearch.length}`}>All ({labSearch.length})</option>
  </select>
</div>

<style lang="scss">
  .Lab {
    &__content {
      gap: 10px;
      display: grid;
      @include box();

      &--item {
        gap: 12px;
        padding: 12px;
        display: grid;
        align-items: center;
        border-radius: 12px;
        text-decoration: none;
        @include box($height: auto);
        background-color: var(--lab-item-bg);
        grid-template-columns: auto 1fr 55px;

        & > h4 {
          white-space: nowrap;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          user-select: none;
        }

        & > hr {
          border-bottom: 1px solid var(--lab-item-separator);
          border-top: none;
          border-left: none;
          border-right: none;
          flex-grow: 1;
          user-select: none;
        }
      }
    }
  }
</style>
