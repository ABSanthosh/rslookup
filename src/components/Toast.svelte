<script lang="ts">
  import { fly } from "svelte/transition";
  export let { message, timeout } = $$props;
</script>

<span class="Toast" transition:fly={{ y: 20, duration: 350 }}>
  {message}
</span>

<style lang="scss">
  .Toast {
    right: 50%;
    bottom: 20px;
    z-index: 100;
    position: fixed;
    padding: 10px 20px;
    border-radius: 50px;
    white-space: nowrap;
    color: var(--foreground);
    transform: translateX(50%);
    box-shadow: var(--toastShadow);
    border: 1px solid var(--border);
    background-color: var(--elevatedBG);
  }
</style>
