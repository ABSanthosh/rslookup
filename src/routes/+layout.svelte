<script lang="ts">
  import Header from "$components/Header/Header.svelte";
  import { fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";

  export let data;

  const duration = 200;
  const delay = duration + 50;
  const x = 10;

  const transitionIn = { easing: cubicOut, x: x, duration, delay };
  const transitionOut = { easing: cubicIn, x: -x, duration };
</script>

<Header />
{#key data.pathname}
  <main class="Content" in:fly={transitionIn} out:fly={transitionOut}>
    <slot />
  </main>
{/key}

<style lang="scss" global>
  @import "../styles/root/global.scss";
  @import "../styles/routes/dirLayout.scss";
</style>
