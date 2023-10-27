<script lang="ts">
  import SchoolChip from "$components/SchoolChip.svelte";
  import SubChip from "$components/SubChip.svelte";
  import { profColors, schools } from "$utils/prof";
  import type { ProfItem } from "$types/Prof.types";

  export let profResult = $$props as ProfItem;

  let { name, role, room, website, school, department, img } = profResult;

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
      <img src={img} alt={name} />
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
  <div class="ProfCard__bottom Row--end w-100">
    <a
      href={website}
      class:disabled={website === "" || website === "-"}
      class="Row--between gap-10"
      target="_blank"
      rel="noopener noreferrer"
    >
      website
    </a>
  </div>
</div>

<style lang="scss">
  .ProfCard {
    @include box();
    padding: 15px;
    border-radius: 20px;
    border: 1px solid var(--border);
    background: var(--ProfCardBG);
    font-family: "Inter", sans-serif;

    &__top {
      img {
        width: 55px;
        height: 55px;
        object-fit: cover;
        border-radius: 50%;
      }

      h3 {
        font-size: 20px;
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
        color: #91999e;
        font-size: 16px;
        font-weight: 400;
      }
    }

    &__bottom {
      a {
        font-size: 16px;
        font-weight: 400;
        text-decoration: none;
        border-radius: 30px;
        background: var(--bottomABG);
        padding: 5px 10px;
        color: var(--bottomAFG);

        &.disabled {
          cursor: not-allowed;
          color: var(--disabledColor);
          text-decoration: line-through;
          background: var(--bottomADisable);
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
    }
  }
</style>
