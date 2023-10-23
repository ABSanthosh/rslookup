<script lang="ts">
  import Fuse from "fuse.js";
  import prof from "$data/prof.json";
  import ProfCard from "$components/ProfCard.svelte";
  import { onMount } from "svelte";
  import { query } from "$lib/ParamStore";

  const filteredProf = new Fuse(prof, {
    keys: ["name"],
  });

  $: searchResult = prof.slice(0, 50);

  // const { page } = getStores();

  onMount(() => {
    query.subscribe((q) => {
      if (q === "") {
        searchResult = prof.slice(0, 50);
        return;
      }
      searchResult = filteredProf.search(q).map((item) => item.item);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });
</script>

<!-- <div class="Prof__header">
  <div class="Prof__header--top">
    <h2>Where's My Prof?</h2>
    <p>
      Locate your professors on campus hassle-free. Say goodbye to wandering
      through hallways or frantically searching for room numbers.
    </p>
  </div>
  <div class="Prof__header--bottom">
    <input
      class="Prof__search"
      type="text"
      placeholder="Search for a professor"
      on:input={(e) => {
        if (!(e.target instanceof HTMLInputElement)) {
          return;
        }

        if (e.target.value === "") {
          searchResult = prof;
          return;
        }

        $: searchResult = filteredProf
          .search(e.target.value)
          .map((item) => item.item);
      }}
    />
  </div>
</div> -->

<div class="Prof__content">
  {#each searchResult as result (`${result.name}-${result.role}`)}
    <ProfCard profResult={result} />
  {/each}
</div>

<style lang="scss" src="../../styles/routes/prof.scss"></style>
