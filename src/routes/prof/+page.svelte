<script lang="ts">
  import Fuse from "fuse.js";
  import { onMount } from "svelte";
  import prof from "$data/prof.json";
  import Dialog from "$components/Dialog.svelte";
  import ProfCard from "$components/ProfCard.svelte";

  const filteredProf = new Fuse(prof, {
    keys: ["name"],
  });

  $: searchResult = prof.slice(0, 50);
  let showOptionsDialog = false;

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
    <button class="FancyButton" on:click={() => (showOptionsDialog = true)}>
      <svg
        width="20"
        height="17"
        viewBox="0 0 20 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.1429 12.7857H7.42857M7.42857 12.7857C7.42857 14.561 5.98954 16 4.21429 16C2.43909 16 1 14.561 1 12.7857C1 11.0105 2.43909 9.57143 4.21429 9.57143C5.98954 9.57143 7.42857 11.0105 7.42857 12.7857ZM11.7143 4.21429H1M11.7143 4.21429C11.7143 5.98954 13.1533 7.42857 14.9286 7.42857C16.7038 7.42857 18.1429 5.98954 18.1429 4.21429C18.1429 2.43909 16.7038 1 14.9286 1C13.1533 1 11.7143 2.43909 11.7143 4.21429Z"
          stroke="black"
          stroke-width="1.4"
          stroke-linecap="round"
        />
      </svg>

      <Dialog bind:showModal={showOptionsDialog}>
        <h1 slot="title">Filters</h1>
        <div class="Prof__options">
          This is amazingly simple! (press esc to close)
        </div>
      </Dialog>
    </button>
  </div>
</div>

<div class="Prof__content">
  {#each searchResult as result (`${result.name}-${result.role}`)}
    <ProfCard profResult={result} />
  {/each}
</div>

<style lang="scss" src="../../styles/routes/prof.scss"></style>
