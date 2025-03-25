<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLDialogAttributes } from 'svelte/elements';

  interface Props extends HTMLDialogAttributes {
    open?: boolean;
    className?: string;

    main?: Snippet;
    free?: Snippet;
    header?: Snippet;
    footer?: Snippet;
  }

  let {
    main,
    free,
    header,
    footer,
    className,
    open = $bindable(false),
    ...restProps
  }: Props = $props();

  let pane: HTMLDialogElement | null = $state(null);

  let preClose: 'open' | 'close' = $state('open');

  $effect(() => {
    if (pane) {
      if (open) pane.showModal();
      else pane.close();
    }
  });
</script>

<dialog
  class="Pane"
  class:Pane--preClose={preClose === 'close'}
  {...restProps}
  bind:this={pane}
  onkeydown={(e) => {
    if (e.key === 'Escape' && pane && open) {
      pane.close();
      open = false;
    }
  }}
  onclick={(e: Event) => {
    // if the click is outside the pane, close it
    if (e.target !== e.currentTarget) return;
    // if the click is on the pane itself, close it
    if (e.target === pane && pane && open) {
      // set a delay for 0.5s to allow for the animation to finish
      preClose = 'close';
      setTimeout(
        () => {
          if (pane && open) {
            pane.close();
            open = false;
            preClose = 'open';
          }
        },
        0.5 * 1000 - 0
      );
    }
  }}
>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div onclick={(e: Event) => e.stopPropagation()}>
    <header>
      {#if header}
        {@render header()}
      {/if}
      <button
        class="CrispButton Pane--close"
        data-type="danger"
        aria-label="Close"
        title="Close"
        type="button"
        onclick={() => {
          if (pane && open) {
            pane.close();
            open = false;
          }
        }}
        data-icon={String.fromCharCode(58829)}
      ></button>
    </header>
    {#if main}
      <main>
        {@render main()}
      </main>
    {/if}
    {#if free}
      {@render free()}
    {/if}
    {#if footer}
      <footer>
        {@render footer()}
      </footer>
    {/if}
  </div>
</dialog>

<style lang="scss">
  .Pane {
    --pane-border: 1px solid var(--t-crp-border);
    --pane-box-shadow: var(--t-crp-elevation-shadow);

    border: none;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 0;
    margin-left: auto;
    @include box(var(--paneWidth, 600px), 100dvh);

    max-width: none;
    max-height: none;
    overflow: hidden;

    @include respondAt(600px) {
      --paneWidth: auto !important;
    }

    & > div {
      z-index: 1;
      background-color: var(--prof-card-background-color);
      border-left: var(--pane-border);
      box-shadow: var(--pane-box-shadow);
      @include box(auto, 100vh);
      @include make-flex();
      outline: none;

      @include respondAt(600px) {
        @include box(100vw);
      }

      & > header {
        @include box(100%, auto);
        padding: 16px 24px;
        @include make-flex($align: flex-start);
        border-bottom: 1px solid var(--t-crp-border);
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
        border-top: 1px solid var(--t-crp-border);
      }
    }

    --animation: cubic-bezier(0.25, 0.1, 0.25, 1);;
    &--preClose {
      animation: slideOut 0.4s var(--animation) forwards !important;

      &::backdrop {
        animation: fadeOut 0.7s ease-out forwards !important;
      }
    }

    &::backdrop {
      @include box(100vw, 100vh);
      backdrop-filter: blur(1px);
      background: var(--pane-backdrop-background);
    }

    &[open] {
      animation: slideIn 0.4s var(--animation);

      &::backdrop {
        animation: fadeIn 0.5s ease-out;
      }
    }

    &--close {
      top: 50%;
      transform: translateY(-50%);
      right: 15px;
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

    @keyframes slideOut {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(100%);
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

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }
</style>
