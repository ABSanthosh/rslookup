<script lang="ts">
  import { onMount } from "svelte";
  import Header from "$components/Header.svelte";

  onMount(() => {
    document.addEventListener("scroll", () => {
      const header = document.querySelector(".Lab__header")!;
      const content = document.querySelector(".Lab__content")!;
      const threshold = window.innerWidth > 585 ? 183 : 200;

      if (!header || !content) return;

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

<div class="Lab__content" />

<style lang="scss" src="../../styles/routes/lab.scss"></style>
