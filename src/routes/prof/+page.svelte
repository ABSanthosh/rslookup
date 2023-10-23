<script lang="ts">
  import Fuse from "fuse.js";
  import { onMount } from "svelte";
  import prof from "$data/prof.json";
  import Dialog from "$components/Dialog.svelte";
  import ProfCard from "$components/ProfCard.svelte";
  import { schools, dept } from "$utils/prof";

  const filteredProf = new Fuse(prof, {
    keys: ["name"],
  });

  $: searchResult = prof.slice(0, 50);
  let showOptionsDialog = true;
  $: searchInFocus = false;
  $: schoolSelected = "All";
  $: departmentSelected = "All";

  onMount(() => {
    document.addEventListener("scroll", () => {
      const header = document.querySelector(".Prof__header")!;
      const content = document.querySelector(".Prof__content")!;
      const threshold = window.innerWidth > 585 ? 183 : 200;

      if (!header || !content) return;

      if (window.scrollY >= threshold || searchInFocus) {
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

<div class="Prof__header" class:Prof__header--sticky={searchInFocus}>
  <div class="Prof__header--top">
    <h2>Where's My Prof?</h2>
    <p>
      Locate your professors on campus hassle-free. Say goodbye to wandering
      through hallways or frantically searching for room numbers.
    </p>
  </div>
  <div class="Prof__header--bottom">
    {#if showOptionsDialog}
      <select
        class="FancySelect"
        bind:value={departmentSelected}
        on:change={() => {
          console.log(dept[departmentSelected]);
          showOptionsDialog = false;
        }}
      >
        {#each Object.keys(dept) as item}
          <option value={item}>{item}</option>
        {/each}
      </select>
    {:else}
      <input
        class="Prof__search"
        type="text"
        placeholder="Search for a professor"
        on:focus={() => {
          searchInFocus = true;

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        on:blur={() => (searchInFocus = false)}
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
    {/if}
    <button
      class="FancyButton"
      class:active={schoolSelected !== "All"}
      on:click={() => (showOptionsDialog = !showOptionsDialog)}
    >
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

      <!-- <Dialog bind:showModal={showOptionsDialog}>
        <h1 slot="title">Filters</h1>
        <div class="Prof__options">
          <div class="Prof__options--select">
            svelte-ignore a11y-label-has-associated-control
            <label>School</label>
            <select
              class="FancySelect"
              bind:value={schoolSelected}
              on:change={() => {
                console.log(schools[schoolSelected].slug);
                // add school[schoolSelected].slug to the url as a query param on top of the existing query params

                if (departmentSelected !== "All") {
                }
              }}
            >
              {#each Object.keys(schools) as item}
                <option value={item}>{item}</option>
              {/each}
            </select>
          </div>
          <div class="Prof__options--select">
            svelte-ignore a11y-label-has-associated-control
            <label>Department</label>
            <select
              class="FancySelect"
              bind:value={departmentSelected}
              on:change={() => {
                console.log(dept[departmentSelected]);
              }}
            >
              {#each Object.keys(dept) as item}
                <option value={item}>{item}</option>
              {/each}
            </select>
          </div>
        </div>
      </Dialog> -->
    </button>
  </div>
</div>

<div class="Prof__content" class:Prof__content--sticky={searchInFocus}>
  {#each searchResult as result (`${result.name}-${result.role}`)}
    <ProfCard profResult={result} />
  {/each}
</div>

<style lang="scss" src="../../styles/routes/prof.scss"></style>
