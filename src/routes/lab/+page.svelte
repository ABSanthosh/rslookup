<script lang="ts">
  import { AcademicBlocks } from '$data/labs';
  import { clickOutside } from '$utils/onClickOutside';
  import { flip } from 'svelte/animate';
  import type { PageData } from './$types';
  import { flipAnimate } from '$utils/animation';

  export let data: PageData;

  $: labs = data.labs;
  $: pageSize = 20;
  let isFilterOpen = false;

  let filters = Object.keys(AcademicBlocks).map((item) => {
    return {
      name: AcademicBlocks[item],
      checked: true
    };
  });

  $: filteredLabs = labs.filter((lab) =>
    filters
      .filter((item) => item.checked)
      .map((item) => item.name)
      .includes(`${lab.block} Block`)
  );

  $: searchResult = filteredLabs.slice(0, pageSize);
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
    on:outclick={() => (isFilterOpen = false)}
  >
    <summary data-no-marker data-icon={String.fromCharCode(57682)}>
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
            checked={filterItem.checked}
            disabled={filterItem.checked && filters.filter((item) => item.checked).length === 1}
            on:change={() => {
              filterItem.checked = !filterItem.checked;
            }}
          />

          {filterItem.name}
        </label>
      {/each}
    </div>
  </details>
</div>

<ul class="Lab__content">
  {#if searchResult.length === 0}
    <i class="CrispMessage" data-type="info" data-format="box" style="grid-column: 1 / 3 ;">
      No results found.
    </i>
  {:else}
    {#each searchResult as lab (`${lab.name}-${lab.room}`)}
      <li
        class="Lab__content--item"
        animate:flip={{ duration: 250 }}
        use:flipAnimate={{ key: `${lab.name}-${lab.room}` }}
      >
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
    on:change={(e) => {
      // @ts-ignore
      pageSize = Number(e.target.value);
    }}
  >
    <option value="20">20</option>
    <option value="40">40</option>
    <option value="80">80</option>
    <option value={`${labs.length}`}>All ({labs.length})</option>
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
