<script lang="ts">
  export let { label, color } = $$props;
</script>

<div class="SubChip" data-color={color.primary} style="--type-color: {color.primary};">
  {label}
</div>

<style lang="scss">
  .SubChip {
    gap: 5px;
    display: grid;
    font-size: 14px;
    padding: 4px 10px;
    text-align: start;
    align-items: center;
    border-radius: 25px;
    background: var(--elevation-1);
    @include box(auto, auto);
    border: 1px solid var(--t-crp-border);
    grid-template-columns: 10px 1fr;

    &::before {
      content: '';
      border-radius: 50%;
      @include box(10px, 10px);
    }

    &[data-color] {
      color: var(--type-color);

      &::before {
        background: var(--type-color);
      }
    }
  }
</style>
