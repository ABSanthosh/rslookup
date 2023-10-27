<script lang="ts">
  import Fuse from "fuse.js";
  import prof from "$data/prof.json";
  import ProfCard from "$components/ProfCard.svelte";
  import { afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import { query } from "$lib/ParamStore";
  import { profColors, schools } from "$utils/prof";
  import GoTop from "$components/GoTop.svelte";

  $: pageSize = 10;
  let filters = Object.keys(schools).map((item) => {
    return {
      name: item,
      checked: true,
      slug: schools[item].slug,
      color: schools[item].color,
    };
  });

  $: filteredProf = prof.filter((item) =>
    filters
      .filter((item) => item.checked)
      .map((item) => item.name)
      .includes(item.school)
  );

  $: profSearch = new Fuse(filteredProf, {
    keys: ["name"],
  });

  $: searchResult = filteredProf.slice(0, pageSize);
  let isFilterOpen = false;

  onMount(() => {
    query.subscribe((q) => {
      if (q === "") {
        searchResult = filteredProf.slice(0, 50);
        return;
      }
      searchResult = profSearch.search(q).map((item) => item.item);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFilterOpen &&
        !(event.target as Element)?.closest(".FancyMenu.Prof__filter")
      ) {
        isFilterOpen = false;
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
  afterNavigate(() => {
    isFilterOpen = false;
  });
</script>

<div class="Prof__header Row--between w-100">
  <h2>Where's My Prof?</h2>
  <details class="FancyMenu Prof__filter" bind:open={isFilterOpen}>
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
    <ProfCard profResult={result} />
  {/each}
</div>

<div class="Prof__bottom Row--end w-100">
  <select
    class="FancySelect"
    value={`${pageSize}`}
    on:change={(e) => {
      // @ts-ignore
      pageSize = Number(e.target.value);
      // searchResult = filteredProf.slice(0, pageSize);
    }}
  >
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="50">50</option>
    <option value={`${prof.length}`}>All ({prof.length})</option>
  </select>
</div>

<GoTop />

<style lang="scss" src="../../styles/routes/prof.scss"></style>
