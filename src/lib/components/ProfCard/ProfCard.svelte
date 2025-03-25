<script lang="ts">
  import SubChip from './SubChip.svelte';
  import Pane from '$components/Pane.svelte';
  import SchoolChip from './SchoolChip.svelte';
  import { profColors, schools } from '$data/prof';
  import { clipboard } from '$utils/CopyToClipboard';
  import type { ProfItem } from '$lib/types/Prof.types';
  import userNamePlaceholder from '$utils/userNamePlaceholder';

  let {
    img,
    name,
    mail,
    role,
    room,
    phone,
    block,
    school,
    website,
    timesheet,
    department
  }: ProfItem = $props();

  let isProfPaneOpen = $state(false);
  $effect(() => {
    if (isProfPaneOpen) {
      document.documentElement.style.scrollbarGutter = 'unset';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.scrollbarGutter = '';
      document.documentElement.style.overflow = '';
    }
  });
</script>

{#if isProfPaneOpen}
  <Pane
    bind:open={isProfPaneOpen}
    style="--paneWidth: 380px;"
    onclose={() => (isProfPaneOpen = false)}
  >
    {#snippet header()}
      <p>Prof: {name}</p>
    {/snippet}
    {#snippet main()}
      <div class="ProfCardPane">
        <span class="ProfCardPane__top--profileBox">
          <h2
            class="ProfCardPane__top--profile"
            style="
          background-color: {profColors[schools[school]?.color]?.secondary ||
              profColors.gray.secondary};
          color: {profColors[schools[school]?.color]?.primary || profColors.gray.primary};
          "
          >
            {userNamePlaceholder(name)}
          </h2>
          {@html `
          <img 
            src="${img}" 
            alt="${name}" 
            onerror="this.style.visibility = 'hidden'" 
            loading="lazy" 
            style = "
              background-color: ${
                profColors[schools[school]?.color]?.secondary || profColors.gray.secondary
              };
              border: 1px solid ${
                profColors[schools[school]?.color]?.primary || profColors.gray.primary
              }
            "/>
          `}
        </span>
        <div class="Col--center w-100 gap-5">
          <h3 class="ProfCardPane__title">
            {name}
          </h3>
          <p class="ProfCardPane__sub">
            {role} - {room}
          </p>
        </div>
        <div class="Col--center w-100 gap-15">
          {#if school !== '' && school !== '-'}
            <SchoolChip
              label={school}
              color={profColors[schools[school]?.color] || profColors.gray}
            />
          {/if}
          {#if department !== '' && department !== '-'}
            <SubChip
              label={department}
              color={profColors[schools[school]?.color] || profColors.gray}
            />
          {/if}
        </div>

        <hr />

        <div class="Col--a-start w-100 gap-5">
          <h3>Office Hours</h3>
          <p>{timesheet}</p>
        </div>
      </div>
    {/snippet}
    {#snippet footer()}
      <a
        target="_blank"
        style="height: 35px;"
        rel="noopener noreferrer"
        data-icon-after={String.fromCharCode(58840)}
        class:disabled={website === '' || website === '-'}
        class="ProfCard__bottom--website Row--between gap-10 w-100"
        href={website === '' || website === '-' ? '#' : website}
      >
        <span> website </span>
      </a>
    {/snippet}
  </Pane>
{/if}

<div class="ProfCard gap-20">
  <div class="ProfCard__top gap-15">
    <span class="ProfCard__top--profileBox">
      <h2
        class="ProfCard__top--profile"
        style="
        background-color: {profColors[schools[school]?.color]?.secondary ||
          profColors.gray.secondary};
        color: {profColors[schools[school]?.color]?.primary || profColors.gray.primary}
        "
      >
        {userNamePlaceholder(name)}
      </h2>
      {@html `
        <img 
          src="${img}" 
          alt="${name}" 
          onerror="this.style.visibility = 'hidden'" 
          loading="lazy" 
          style = "
            background-color: ${
              profColors[schools[school]?.color]?.secondary || profColors.gray.secondary
            };
          "/>
        `}
    </span>
    <div class="ProfCard__header Col--a-start gap-10">
      <h3>{name}</h3>
      <span>{role} - {room}</span>
    </div>
    {#if timesheet !== ''}
      <button
        class="CrispButton"
        style="
        margin-left: auto; 
        margin-bottom: auto;
        --crp-button-padding-left: 5px;
        --crp-button-padding-right: 5px;
        --crp-button-padding-top: 5px;
        --crp-button-padding-bottom: 5px;
        --crp-button-background-color: var(--prof-card-background-color);
      "
        title="Click to view timesheet"
        aria-label="View timesheet"
        onclick={() => (isProfPaneOpen = true)}
        data-icon={String.fromCharCode(59573)}
      ></button>
    {/if}
  </div>
  {#if school && department && school !== '' && school !== '-' && department !== '' && department !== '-'}
    <div class="ProfCard__middle">
      {#if school !== '' && school !== '-'}
        <SchoolChip label={school} color={profColors[schools[school]?.color] || profColors.gray} />
      {/if}
      {#if department !== '' && department !== '-'}
        <SubChip label={department} color={profColors[schools[school]?.color] || profColors.gray} />
      {/if}
    </div>
  {/if}

  <div class="ProfCard__bottom">
    <div class="ProfCard__contact">
      {#if phone !== undefined && phone !== ''}
        <button
          class="CopyButton w-100"
          data-icon={String.fromCharCode(57520)}
          use:clipboard={{ text: phone }}
          title="Click to copy extension"
        >
          <span>
            Extension: {phone}
          </span>
        </button>
      {/if}
      {#if mail !== undefined && mail !== ''}
        <button
          class="CopyButton w-100"
          data-icon={String.fromCharCode(57688)}
          use:clipboard={{ text: mail }}
          title="Click to copy email"
        >
          <span>
            {mail}
          </span>
        </button>
      {/if}
    </div>

    <a
      target="_blank"
      rel="noopener noreferrer"
      data-icon-after={String.fromCharCode(58840)}
      class:disabled={website === '' || website === '-'}
      class="ProfCard__bottom--website Row--between gap-10"
      href={website === '' || website === '-' ? '#' : website}
    >
      <span> website </span>
    </a>
  </div>
</div>

<style lang="scss">
  .ProfCard {
    @include box();
    padding: 15px;
    border-radius: 15px;
    @include make-flex($align: stretch);
    border: 1px solid var(--t-crp-border);
    background: var(--prof-card-background-color);

    &__header {
      h3 {
        line-height: 1;
        font-size: 20px;
        max-width: 100%;
        overflow: hidden;
        text-wrap: nowrap;
        text-overflow: ellipsis;
      }

      span {
        line-height: 1;
        font-size: 16px;
        font-weight: 400;
        // overflow: hidden;
        // text-wrap: nowrap;
        // max-width: 100%;
        // text-overflow: ellipsis;
        color: var(--subFg-1);
      }
    }

    &__top {
      max-width: 100%;
      @include box(100%, auto);
      @include make-flex($dir: row, $just: flex-start, $align: flex-start);

      :global(img) {
        @include box(100%, auto);
        aspect-ratio: 1/1;
        max-width: 55px;
        object-fit: cover;
        border-radius: 50%;
        object-position: top;
      }

      & > div {
        max-width: 100%;
        overflow: hidden;
      }

      &--profile {
        flex-shrink: 0;
        @include box();
        line-height: 55px;
        border-radius: 50%;
        text-align: center;
        @include make-flex();
      }

      &--profileBox {
        gap: 10px;
        position: relative;
        aspect-ratio: 1 / 1;
        @include box(55px, auto);
        @include make-flex($dir: column, $just: flex-start, $align: flex-start);

        :global(img) {
          top: 0;
          right: 0;
          position: absolute;
        }
      }
    }

    &__middle {
      gap: 10px;
      @include box(100%, auto);
      @include make-flex($align: flex-start);
    }

    &__contact {
      gap: 5px;
      min-width: 0;
      font-size: 14px;
      color: var(--subFg-1);
      @include box(100%, auto);
      @include make-flex($dir: column, $just: flex-start, $align: flex-start);

      &::before {
        font-size: 18px;
      }
    }

    &__bottom {
      gap: 10px;
      max-width: 100%;
      margin-top: auto;
      @include box(100%, auto);
      @include make-flex($dir: row, $just: space-between, $align: flex-end);

      &--website,
      &--website.disabled {
        font-size: 16px;
        font-weight: 400;
        padding: 5px 10px;
        user-select: none;
        border-radius: 30px;
        text-decoration: none;
        transition: box-shadow 0.3s;
        line-height: 1;
      }

      &--website {
        & > span {
          color: var(--white);
        }

        background: var(--prof-card-website-bg);
        &:hover {
          box-shadow: var(--t-crp-elevation-shadow);
        }

        &::after {
          color: var(--white);
          transform: rotate(45deg);
          @include box(17px, 17px);
        }
        &.disabled {
          cursor: not-allowed;
          background: var(--prof-card-website-bg-disabled);

          span {
            text-decoration: line-through;
            color: var(--prof-card-website-fg-disabled);
          }
          &::after {
            text-decoration: none;
            color: var(--prof-card-website-fg-disabled);
          }
        }
      }
    }
  }

  .ProfCardPane {
    gap: 15px;
    @include box();
    @include make-flex($dir: column, $just: flex-start);

    & > hr {
      // flex-grow: 1;
      border: none;
      @include box(100%, 1px);
      background: var(--t-crp-light-border);
    }

    &__top--profileBox {
      gap: 10px;
      position: relative;
      @include box(80%, auto);
      @include make-flex($dir: column, $just: flex-start, $align: flex-start);

      @include respondAt(600px) {
        @include box(55%, auto);
      }

      :global(img) {
        z-index: 1;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 50%;
        object-position: top;
        @include box(100%, auto);
      }

      h2 {
        top: 0;
        right: 0;
        flex-shrink: 0;
        font-size: 90px;
        position: absolute;
        border-radius: 50%;
        text-align: center;
        @include make-flex();
        @include box($height: 100%);
      }
    }

    &__title {
      width: 100%;
      font-size: 25px;
      font-weight: 500;
      text-align: center;
    }

    &__sub {
      width: 100%;
      font-size: 18px;
      font-weight: 400;
      text-align: center;
      color: var(--subFg-1);
    }
  }
</style>
