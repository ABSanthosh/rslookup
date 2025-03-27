<script lang="ts">
  const {
    label,
    color
  }: {
    label: string;
    color: {
      primary: string;
      secondary: string;
    };
  } = $props();
</script>

<div
  class="SchoolChip"
  data-type={color.primary}
  style="--type-primary: {color.primary};
         --type-secondary: {color.secondary};"
>
  {label}
</div>

<style lang="scss">
  .SchoolChip {
    font-size: 14px;
    font-weight: 500;
    text-align: start;
    padding: 3px 12px;
    border-radius: 25px;
    @include box(auto, auto);

    &[data-type] {
      color: var(--type-primary);
      background: var(--type-secondary);
      border: 1px solid var(--type-primary);
    }
  }
</style>
