<script lang="ts">
  import ProfCard from "$components/ProfCard.svelte";
  import prof from "$data/prof.json";
  import Fuse from "fuse.js";
  import { onMount } from "svelte";

  const filteredProf = new Fuse(prof, {
    keys: ["name"],
  });

  $: searchResult = prof.slice(0, 50);

  onMount(() => {
    document.addEventListener("scroll", () => {
      const header = document.querySelector(".Prof__header")!;
      const content = document.querySelector(".Prof__content")!;
      const threshold = window.innerWidth > 585 ? 183 : 200;

      if (!header || !content) return;

      if (window.scrollY >= threshold) {
        header.classList.add("Prof__header--sticky");
        content.classList.add("Prof__content--sticky");
      } else {
        header.classList.remove("Prof__header--sticky");
        content.classList.remove("Prof__content--sticky");
      }
    });

    return () => {
      document.removeEventListener("scroll", () => {});
    };
  });
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
</div>

<div class="Prof__content">
  {#each searchResult as result (`${result.name}-${result.role}`)}
    <ProfCard profResult={result} />
  {/each}
</div>

<style lang="scss" src="../../styles/routes/prof.scss"></style>
