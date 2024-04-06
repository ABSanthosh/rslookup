<script lang="ts">
  import SubChip from "$components/SubChip.svelte";
  import { profColors, schools } from "$utils/prof";
  import type { ProfItem } from "$types/Prof.types";
  import copyToClipboard from "$utils/CopyToClipboard";
  import SchoolChip from "$components/SchoolChip.svelte";
  import Pane from "./Pane.svelte";
  import { browser } from "$app/environment";

  export let profResult = $$props as ProfItem;

  let { name, role, room, website, school, department, img, mail, timesheet } =
    profResult;

  let profile = name
    .match(/(\b\S)?/g)!
    .join("")
    .match(/(^\S|\S$)?/g)!
    .join("")
    .toUpperCase();

  $: isProfPaneOpen = false;
  $: if (browser) {
    if (isProfPaneOpen) {
      document.documentElement.style.scrollbarGutter = "unset";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.scrollbarGutter = "";
      document.documentElement.style.overflow = "";
    }
  }
</script>

{#if isProfPaneOpen}
  <Pane
    bind:open={isProfPaneOpen}
    style="--paneWidth: 380px;"
    on:close={() => (isProfPaneOpen = false)}
  >
    <p slot="header">Prof: {name}</p>
    <svelte:fragment slot="main">
      <div class="ProfCardPane">
        <span class="ProfCardPane__top--profileBox">
          <h2
            class="ProfCardPane__top--profile"
            style="
            background-color: {profColors[schools[school]?.color]?.secondary ||
              profColors.gray.secondary};
            color: {profColors[schools[school]?.color]?.primary ||
              profColors.gray.primary};
            "
          >
            {profile}
          </h2>
          {@html `
            <img 
              src="${img}" 
              alt="${name}" 
              onerror="this.style.visibility = 'hidden'" 
              loading="lazy" 
              style = "
                background-color: ${
                  profColors[schools[school]?.color]?.secondary ||
                  profColors.gray.secondary
                };
                border: 1px solid ${
                  profColors[schools[school]?.color]?.primary ||
                  profColors.gray.primary
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
          <SchoolChip
            label={school}
            color={profColors[schools[school]?.color] || profColors.gray}
          />
          {#if department !== "" && department !== "-"}
            <SubChip
              label={department}
              color={profColors[schools[school]?.color] || profColors.gray}
            />
          {/if}
        </div>
        <div class="Col--a-start w-100 gap-5">
          <h3>Office Hours</h3>
          <p>{timesheet}</p>
        </div>
      </div>
    </svelte:fragment>
    <svelte:fragment slot="footer">
      {#if website === "" || website === "-"}
        <span
          class="ProfCard__bottom--website disabled Row--between gap-10 w-100"
        >
          website
        </span>
      {:else}
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          class="ProfCard__bottom--website Row--between gap-10 w-100"
        >
          website
        </a>
      {/if}
    </svelte:fragment>
  </Pane>
{/if}

<div class="ProfCard gap-20">
  <div class="ProfCard__top Row--start gap-15">
    <span class="ProfCard__top--profileBox">
      <h2
        class="ProfCard__top--profile"
        style="
        background-color: {profColors[schools[school]?.color]?.secondary ||
          profColors.gray.secondary};
        color: {profColors[schools[school]?.color]?.primary ||
          profColors.gray.primary}
        "
      >
        {profile}
      </h2>
      {@html `
        <img 
          src="${img}" 
          alt="${name}" 
          onerror="this.style.visibility = 'hidden'" 
          loading="lazy" 
          style = "
            background-color: ${
              profColors[schools[school]?.color]?.secondary ||
              profColors.gray.secondary
            };
          "/>
        `}
    </span>
    <div class="Col--a-start gap-5">
      <h3>{name}</h3>
      <span>{role} - {room}</span>
    </div>
    {#if timesheet !== ""}
      <button
        class="CrispButton"
        style="
        margin-left: auto; 
        margin-bottom: auto;
        --crp-button-padding-left: 5px;
        --crp-button-padding-right: 5px;
        --crp-button-padding-top: 5px;
        --crp-button-padding-bottom: 5px;
      "
        title="Click to view timesheet"
        on:click={() => (isProfPaneOpen = true)}
        data-icon={String.fromCharCode(59573)}
      />
    {/if}
  </div>
  <div class="ProfCard__middle">
    <SchoolChip
      label={school}
      color={profColors[schools[school]?.color] || profColors.gray}
    />
    {#if department !== "" && department !== "-"}
      <SubChip
        label={department}
        color={profColors[schools[school]?.color] || profColors.gray}
      />
    {/if}
  </div>
  <div class="ProfCard__bottom">
    <div class="ProfCard__contact">
      <a
        href={`#`}
        data-icon={String.fromCharCode(57688)}
        on:keydown={async () => await copyToClipboard(mail)}
        on:keyup={async () => await copyToClipboard(mail)}
        on:keypress={async () => await copyToClipboard(mail)}
        on:click={async () => await copyToClipboard(mail)}
        title="Click to copy email"
      >
        <span>
          {mail}
        </span>
      </a>
    </div>
    {#if website === "" || website === "-"}
      <span class="ProfCard__bottom--website disabled Row--between gap-10">
        website
      </span>
    {:else}
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        class="ProfCard__bottom--website Row--between gap-10"
      >
        website
      </a>
    {/if}
  </div>
</div>

<style lang="scss">
  .ProfCard {
    @include box();
    padding: 15px;
    border-radius: 20px;
    background: var(--ProfCardBG);
    border: 1px solid var(--border);
    font-family: "Inter", sans-serif;

    @include make-flex();
    align-items: stretch;

    &__top {
      max-width: 100%;
      @include box(100%, auto);

      :global(img) {
        @include box(55px, 55px);
        max-width: 55px;
        object-fit: cover;
        border-radius: 50%;
        object-position: top;
      }

      & > div {
        max-width: 100%;
        overflow: hidden;
      }

      h3 {
        font-size: 20px;
        overflow: hidden;
        text-wrap: nowrap;
        max-width: 100%;
        text-overflow: ellipsis;
      }

      &--profile {
        border-radius: 50%;
        text-align: center;
        line-height: 55px;
        @include box();
        @include make-flex();
        flex-shrink: 0;
      }

      &--profileBox {
        gap: 10px;
        position: relative;
        @include box(55px, 55px);
        @include make-flex($dir: column, $just: flex-start, $align: flex-start);

        :global(img) {
          top: 0;
          right: 0;
          position: absolute;
          // background-color: white;
        }
      }

      span {
        color: var(--subText);
        font-size: 16px;
        font-weight: 400;
      }
    }

    &__middle {
      gap: 10px;
      @include box(100%, auto);
      @include make-flex($align: flex-start);
    }

    &__contact {
      min-width: 0;
      gap: 2px;
      font-size: 14px;
      color: var(--subText);
      @include box(100%, auto);
      @include make-flex($dir: column, $just: flex-start, $align: flex-start);

      a {
        gap: 6px;
        width: 100%;
        cursor: pointer;
        @include make-flex($dir: row, $just: flex-start, $align: flex-end);
        overflow: hidden;

        span {
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &:hover {
          text-decoration: underline;
        }

        &::before {
          height: 18px;
        }
      }

      &::before {
        font-size: 18px;
      }
    }

    &__bottom {
      gap: 10px;
      margin-top: auto;
      max-width: 100%;
      @include box(100%, auto);
      @include make-flex($dir: row, $just: space-between, $align: flex-end);

      // display: grid;
      // grid-template-columns: 1fr 103px;

      &--website,
      &--website.disabled {
        font-size: 16px;
        font-weight: 400;
        padding: 5px 10px;
        user-select: none;
        border-radius: 30px;
        text-decoration: none;
        color: var(--bottomAFG);
        background: var(--bottomABG);
        transition: box-shadow 0.3s;

        &:hover:not(:disabled) {
          box-shadow: var(--elevatedShadow);
        }
        &::after {
          content: " ";
          display: block;
          padding: 2px 0;
          @include box(13px, 13px);
          background-image: url("/assets/images/newTab.svg");
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
        }
      }

      span {
        &.disabled {
          cursor: not-allowed;
          color: var(--disabledColor);
          text-decoration: line-through;
          background: var(--bottomADisable);
        }
      }
    }
  }

  .ProfCardPane {
    gap: 15px;
    @include box();
    @include make-flex($dir: column, $just: flex-start);

    &__top--profileBox {
      gap: 10px;
      position: relative;
      @include box(100%, auto);
      @include make-flex($dir: column, $just: flex-start, $align: flex-start);

      @include respondAt(600px) {
        @include box(55%, auto);
      }

      :global(img) {
        @include box();
        object-fit: cover;
        border-radius: 50%;
        aspect-ratio: 1/1;
        object-position: top;
        z-index: 1;
        // background-color: var(--body);
      }

      h2 {
        top: 0;
        right: 0;
        position: absolute;
        border-radius: 50%;
        text-align: center;
        @include box($height: 100%);
        @include make-flex();
        flex-shrink: 0;
      }
    }

    &__title {
      font-size: 25px;
      font-weight: 500;
      width: 100%;
      text-align: center;
    }

    &__sub {
      font-size: 18px;
      font-weight: 400;
      width: 100%;
      text-align: center;
      color: var(--subText);
    }
  }
</style>
