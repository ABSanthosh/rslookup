<script lang="ts">
  import type { HTMLDialogAttributes } from "svelte/elements";
  interface $$restProps extends HTMLDialogAttributes {}
  export let { showModal } = $$props as {
    showModal: boolean;
  };

  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  class="Dialog"
  {...$$restProps}
  bind:this={dialog}
  on:close={() => (showModal = false)}
>
  <button class="Dialog--close" on:click={() => dialog.close()}>
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L10 10M10 10L19 19M10 10L19 1L1 19"
        stroke="var(--foreground)"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  {#if showModal}
    <slot name="title" />
    <hr />
    <slot />
  {/if}
</dialog>

<style lang="scss">
  .Dialog {
    top: 50%;
    left: 50%;
    padding: 20px;
    outline: none;
    cursor: default;
    border-radius: 15px;
    border: 1px solid var(--border);
    transform: translate(-50%, -50%);
    background-color: var(--background);

    & > hr {
      border: none;
      @include box(100%, 0.5px);
      border-bottom: 1px solid var(--border);
    }

    &::backdrop {
      animation: fade-in 1s;
      background: rgba(0, 0, 0, 0.49);
      backdrop-filter: blur(10px);
      @include box(auto, auto);
    }

    &[open] {
      @include make-flex($align: flex-start);
      gap: 10px;
      &::backdrop {
        animation: fadeIn 0.2s ease-out;
      }
    }

    &--close {
      top: 10px;
      right: 10px;
      padding: 6px;
      outline: none;
      cursor: pointer;
      background: none;
      border-radius: 5px;
      position: absolute;
      @include make-flex();
      @include box(25px, 25px);
      border: 1px solid var(--border);
      background-color: var(--background);

      svg {
        @include box();
      }

      &:hover {
        background-color: var(--hover);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
</style>
