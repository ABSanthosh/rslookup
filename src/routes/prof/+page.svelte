<script>
  import ProfCard from "$components/ProfCard.svelte";
  import prof from "$data/prof.json";
  import Fuse from "fuse.js";

  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";

  const filteredProf = new Fuse(prof, {
    keys: ["name"],
  });

  $: searchResult = prof;
</script>

<div class="Prof__header">
  <div class="Prof__header--top">
    <h2>Where's My Prof?</h2>
    <p>
      Locate your professors on campus hassle-free. Say goodbye to wandering
      through hallways or frantically searching for room numbers.
    </p>
  </div>
  <div class="Prof__header--bottom">
    <!-- <div> -->
    <!-- <img src="/assets/images/search.svg" alt="search" /> -->
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
    <!-- </div> -->
  </div>
</div>

<div class="Prof__content">
  <!-- {#each searchResult as { name, role, room, block, website, school, department, img } (`${name}-${role}`)}
    <ProfCard
      {name}
      {role}
      {room}
      {block}
      {website}
      {school}
      {department}
      {img}
    />
  {/each} -->
</div>

<style lang="scss" src="../../styles/routes/prof.scss"></style>
