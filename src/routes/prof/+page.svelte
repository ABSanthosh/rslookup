<script lang="ts">
  import Fuse from "fuse.js";
  import { onMount } from "svelte";
  import prof from "$data/prof.json";
  import { flip } from "svelte/animate";
  import { query } from "$lib/ParamStore";
  import { flipAnimate } from "$lib/FlipAnimate";
  import { afterNavigate } from "$app/navigation";
  import { clickOutside } from "$lib/ClickOutside";
  import { profColors, schools } from "$utils/prof";
  import ProfCard from "$components/ProfCard.svelte";

  $: pageSize = 10;
  let isFilterOpen = false;

  let filters = Object.keys(schools).map((item) => {
    return {
      name: item,
      checked: true,
      slug: schools[item].slug,
      color: schools[item].color,
    };
  });

  $: filteredSchools = filters
    .filter((item) => item.checked)
    .map((item) => item.name);

  $: filteredProf = prof.filter((item) => {
    if (!Object.keys(schools).includes(item.school)) {
      return filteredSchools.includes("Miscellaneous");
    }
    return filteredSchools.includes(item.school);
  });

  $: profSearch = new Fuse(filteredProf, {
    keys: ["name"],
  });

  $: searchResult = filteredProf.slice(0, pageSize);

  onMount(() => {
    query.subscribe((q) => {
      if (q === "") {
        searchResult = filteredProf.slice(0, pageSize);
        return;
      }
      searchResult = profSearch
        .search(q)
        .map((item) => item.item)
        .slice(0, 10);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });
  afterNavigate(() => {
    isFilterOpen = false;
  });
</script>

<div class="Prof__header Row--between w-100">
  <h2>Where's My Prof?</h2>
  <details
    use:clickOutside
    bind:open={isFilterOpen}
    class="FancyMenu Prof__filter"
    on:outclick={() => (isFilterOpen = false)}
  >
    <summary data-no-marker data-icon={String.fromCharCode(57682)}>
      Filters
      <span>
        {filters.filter((item) => item.checked).length}
      </span>
    </summary>
    <div class="FancyMenu__content Prof__filter--content" data-align="right">
      {#each filters as filterItem}
        <label
          for={filterItem.slug}
          class="Prof__filter--item"
          class:active={filterItem.checked}
          style={`
          --type-primary: ${profColors[filterItem.color].primary};
          --type-secondary: ${profColors[filterItem.color].secondary};
          `}
        >
          <input
            type="checkbox"
            id={filterItem.slug}
            checked={filterItem.checked}
            disabled={filterItem.checked &&
              filters.filter((item) => item.checked).length === 1}
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

<div class="Prof__content">
  {#each searchResult as result (`${result.name}-${result.role}`)}
    <span
      animate:flip={{ duration: 250 }}
      use:flipAnimate={{ key: `${result.name}-${result.role}` }}
    >
      <ProfCard profResult={result} />
    </span>
  {/each}
</div>

<div class="Row--end w-100">
  <select
    class="FancySelect"
    value={`${pageSize}`}
    on:change={(e) => {
      // @ts-ignore
      pageSize = Number(e.target.value);
    }}
  >
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="50">50</option>
    <option value={`${filteredProf.length}`}>All ({filteredProf.length})</option
    >
  </select>
</div>

<style lang="scss">
  .Prof {
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
    &__content {
      gap: 18px;
      min-width: 0;
      display: grid;
      @include box();
      grid-template-columns: 1fr 1fr;
      grid-template-rows: minmax(50px, auto) 1fr;

      & > span {
        max-width: 100%;
        overflow-x: hidden;
        @include make-flex();
        @include box($height: max(100%, fit-content));
      }

      @include respondAt(800px) {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
