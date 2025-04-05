<script lang="ts">
  import Spinner from './Spinner.svelte';

  const {
    style
  }: {
    style?: string;
  } = $props();
</script>

<div class="BlurredSpinnerWrapper" {style}>
  <Spinner />
</div>

<style lang="scss">
  .BlurredSpinnerWrapper {
    top: 0;
    left: 0;
    z-index: 15;
    @include box();
    position: absolute;
    @include make-flex();
    background: #00000024;
    backdrop-filter: blur(15px);
  }
</style>
