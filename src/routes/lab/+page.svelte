<script lang="ts">
  import Fuse from "fuse.js";
  import { onMount } from "svelte";
  import labs from "$data/labs.json";
  import { flip } from "svelte/animate";
  import { query } from "$lib/ParamStore";
  import { AcademicBlocks } from "$utils/labs";
  import { flipAnimate } from "$lib/FlipAnimate";
  import { afterNavigate } from "$app/navigation";
  import { clickOutside } from "$lib/ClickOutside";

  $: pageSize = 10;
  let isFilterOpen = false;

  let filters = Object.keys(AcademicBlocks).map((item) => {
    return {
      name: AcademicBlocks[item],
      checked: true,
    };
  });

  $: filteredLabs = labs.filter((lab) =>
    filters
      .filter((item) => item.checked)
      .map((item) => item.name)
      .includes(`${lab.block} Block`)
  );

  $: labSearch = new Fuse(filteredLabs, {
    keys: ["name"],
  });

  $: searchResult = filteredLabs.slice(0, pageSize);

  onMount(() => {
    query.subscribe((q) => {
      if (q === "") {
        searchResult = filteredLabs.slice(0, pageSize);
        return;
      }
      searchResult = labSearch.search(q).map((item) => item.item);
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

<div class="Lab__header Row--between w-100">
  <h2>Where's My Lab?</h2>
  <details
    use:clickOutside
    bind:open={isFilterOpen}
    class="FancyMenu Lab__filter"
    on:outclick={() => (isFilterOpen = false)}
  >
    <summary data-no-marker data-icon={String.fromCharCode(57682)}>
      Filters
      <span>
        {filters.filter((item) => item.checked).length}
      </span>
    </summary>
    <div class="FancyMenu__content Lab__filter--content" data-align="right">
      {#each filters as filterItem}
        <label
          for={filterItem.name}
          class="Lab__filter--item"
          class:active={filterItem.checked}
        >
          <input
            type="checkbox"
            id={filterItem.name}
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

<ul class="Lab__content">
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
</ul>

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
    <option value={`${labs.length}`}>All ({labs.length})</option>
  </select>
</div>

<style lang="scss" src="../../styles/routes/lab.scss"></style>
