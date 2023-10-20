<script lang="ts">
  let isDetailsOpen = false;

  export let { summary } = $$props;
</script>

<details class="TipDetail" bind:open={isDetailsOpen}>
  <summary>
    <slot name="summary" />
  </summary>
  <slot />
</details>

<style lang="scss">
  .TipDetail {
    top: 0;
    cursor: pointer;
    grid-area: middle;
    position: relative;
    @include box(auto, 32px);

    @include respondAt(585px) {
      display: block;
    }

    summary {
      padding: 10px;
      @include box();
      border-radius: 5px;
      @include make-flex();
      color: var(--foreground);
      border: 1px solid var(--border);

      &::after,
      &::before {
        content: " ";
        position: absolute;
        clip-path: polygon(50% 0, 100% 100%, 0 100%);
        left: 50%;
        transform: translateX(-50%);
      }

      &::after {
        width: 18px;
        height: 10px;
        background-color: var(--border);
        top: -11px;
      }

      &::before {
        background-color: var(--background);
        width: 17px;
        height: 10px;
        z-index: 1;
        top: -9.5px;
      }
    }
  }
</style>
