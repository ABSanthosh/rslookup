<script lang="ts">
  import type { HTMLDialogAttributes } from "svelte/elements";
  interface $$restProps extends HTMLDialogAttributes {}

  export let { open = false, className } = $$props as {
    open: boolean;
    className?: string;
  };

  let pane: HTMLDialogElement;

  $: if (pane) {
    if (open) pane.showModal();
    else pane.close();
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  class="Pane"
  {...$$restProps}
  bind:this={pane}
  on:close
  on:keydown={(e) => {
    if (e.key === "Escape") {
      pane.close();
      open = false;
    }
  }}
  on:click|self={() => {
    pane.close();
    open = false;
  }}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <header>
      <slot name="header" />
      <button
        class="CrispButton Pane--close"
        data-type="danger"
        on:click={() => {
          pane.close();
          open = false;
        }}
        data-icon={String.fromCharCode(58829)}
      />
    </header>
    {#if $$slots.main}
      <main>
        <slot name="main" />
      </main>
    {:else}
      <slot name="free" />
    {/if}
    {#if $$slots.footer}
      <footer>
        <slot name="footer" />
      </footer>
    {/if}
  </div>
</dialog>

<style lang="scss">
  .Pane {
    --pane-background: ;
    --pane-border: 1px solid var(--border);
    --pane-box-shadow: var(--elevatedShadow);
    // --pane-backdrop-background: var(--pane-backdrop-background);

    &__backdrop {
      top: 0;
      left: 0;
      z-index: -1;
      position: fixed;
      @include box(100vw, 100vh);
    }

    border: none;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 0;
    margin-left: auto;
    @include box(var(--paneWidth, 600px), 100vh);

    max-width: none;
    max-height: none;
    overflow: hidden;

    @include respondAt(600px) {
      --paneWidth: auto !important;
    }

    & > div {
      z-index: 1;
      background-color: var(--pane-background);
      border-left: var(--pane-border);
      box-shadow: var(--pane-box-shadow);
      @include box(auto, 100vh);
      @include make-flex();
      outline: none;

      @include respondAt(600px) {
        @include box(100vw);
      }
      // @include box();
      & > header {
        @include box(100%, auto);
        padding: 16px 24px;
        @include make-flex($align: flex-start);
        border-bottom: 1px solid var(--border);
        position: relative;
      }

      & > main {
        @include box(100%, auto);
        padding: 24px;
        flex: 1 1 0%;
        overflow-y: auto;
      }

      & > footer {
        @include box(100%, auto);
        padding: 12px 16px;
        @include make-flex($align: flex-end);
        border-top: 1px solid var(--border);
      }
    }

    &::backdrop {
      @include box(100vw, 100vh);
      backdrop-filter: blur(1px);
      background: var(--pane-backdrop-background);
    }

    &[open] {
      animation: slideIn 0.2s cubic-bezier(0.87, 0, 0.13, 1);

      &::backdrop {
        animation: fadeIn 0.2s ease-out;
      }
    }

    &--close {
      top: 50%;
      transform: translateY(-50%);
      right: 10px;
      padding: 6px;
      outline: none;
      cursor: pointer;
      border-radius: 5px;
      position: absolute;
      @include make-flex();
      @include box(25px, 25px);
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
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
