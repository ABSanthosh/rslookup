<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    document.addEventListener("scroll", () => {
      const header = document.querySelector(".Lab__header")!;
      const content = document.querySelector(".Lab__content")!;
      // console.log(window.scrollY);
      const threshold = window.innerWidth > 585 ? 183 : 200;
      if (window.scrollY >= threshold) {
        header.classList.add("Lab__header--sticky");
        content.classList.add("Lab__content--sticky");
      } else {
        header.classList.remove("Lab__header--sticky");
        content.classList.remove("Lab__content--sticky");
      }
    });

    return () => {
      document.removeEventListener("scroll", () => {});
    };
  });
</script>

<div class="Lab__header">
  <div class="Lab__header--top">
    <h2>Where's My Lab?</h2>
    <p>
      Finding your designated lab spaces with ease. No more wandering around
      campus, feeling lost and bewildered.
    </p>
  </div>
  <div class="Lab__header--bottom">
    <input class="Lab__search" type="text" placeholder="Search for a lab" />
  </div>
</div>
<div class="Lab__content" />

<style lang="scss" src="../../styles/routes/lab.scss"></style>
