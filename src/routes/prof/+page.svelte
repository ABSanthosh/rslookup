<script lang="ts">
  import Fuse from "fuse.js";
  import { onMount } from "svelte";
  import prof from "$data/prof.json";
  import { query } from "$lib/ParamStore";
  import { afterNavigate } from "$app/navigation";
  import { profColors, schools } from "$utils/prof";
  import ProfCard from "$components/ProfCard.svelte";
  import { clickOutside } from "$lib/ClickOutside";

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
      searchResult = profSearch.search(q).map((item) => item.item);
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
    <!-- <span> -->
    <ProfCard profResult={result} />
    <!-- </span> -->
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

<style lang="scss" src="../../styles/routes/prof.scss"></style>
