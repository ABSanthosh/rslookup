<script lang="ts">
  import SubChip from "$components/SubChip.svelte";
  import { profColors, schools } from "$utils/prof";
  import type { ProfItem } from "$types/Prof.types";
  import copyToClipboard from "$utils/CopyToClipboard";
  import SchoolChip from "$components/SchoolChip.svelte";

  export let profResult = $$props as ProfItem;

  let { name, role, room, website, school, department, img, mail, gImage } =
    profResult;

  let profile = name
    .match(/(\b\S)?/g)!
    .join("")
    .match(/(^\S|\S$)?/g)!
    .join("")
    .toUpperCase();
</script>

<div class="ProfCard Col--a-start gap-20">
  <div class="ProfCard__top Row--start gap-15">
    {#if img === "-"}
      <h2
        class="ProfCard__top--profile"
        style="background-color: {profColors[schools[school]?.color]
          ?.secondary || profColors.gray.secondary};
        color: {profColors[schools[school]?.color]?.primary ||
          profColors.gray.primary}
        "
      >
        {profile}
      </h2>
    {:else}
      <picture>
        <source srcset={img} type="image/jpeg" />
        <source srcset={gImage} type="image/webp" />
        <img src={img} alt={name} loading="lazy" />
      </picture>
    {/if}
    <div class="Col--a-start gap-5">
      <h3>{name}</h3>
      <span>{role} - {room}</span>
    </div>
  </div>
  <div class="ProfCard__middle Col--a-start gap-10">
    <SchoolChip
      label={school}
      color={profColors[schools[school]?.color] || profColors.gray}
    />
    {#if department !== ""}
      <SubChip
        label={department}
        color={profColors[schools[school]?.color] || profColors.gray}
      />
    {/if}
  </div>
  <div class="ProfCard__bottom Row--between w-100 gap-10">
    <div data-icon={String.fromCharCode(57688)}>
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <p
        on:keydown={async () => await copyToClipboard(mail)}
        on:keyup={async () => await copyToClipboard(mail)}
        on:keypress={async () => await copyToClipboard(mail)}
        on:click={async () => await copyToClipboard(mail)}
      >
        {mail}
      </p>
    </div>
    {#if website === "" || website === "-"}
      <span class="disabled Row--between gap-10">website</span>
    {:else}
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        class="Row--between gap-10"
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

    &__top {
      max-width: 100%;
      img {
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
        @include box(55px, 55px);
        border-radius: 50%;
        text-align: center;
        line-height: 55px;
        @include make-flex();
        flex-shrink: 0;
      }

      span {
        color: var(--subText);
        font-size: 16px;
        font-weight: 400;
      }
    }

    &__bottom {
      margin-top: auto;
      & > div {
        p {
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          text-overflow: ellipsis;
          &:hover {
            text-decoration: underline;
          }
        }

        gap: 6px;
        font-size: 14px;
        color: var(--subText);
        @include box(calc(55%));
        @include make-flex($dir: row, $just: flex-start);
        &::before {
          font-size: 18px;
        }
      }
    }

    &__bottom {
      a,
      span {
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
</style>
