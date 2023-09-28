<script>
  import Header from "$components/Header/Header.svelte";
</script>

<Header />
<main class="Content">
  <slot />
</main>

<style lang="scss" global>
  @import "../styles/root/global.scss";
</style>
