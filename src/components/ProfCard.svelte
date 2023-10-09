<script lang="ts">
  import SchoolChip from "$components/SchoolChip.svelte";
  import SubChip from "$components/SubChip.svelte";
  import { profColors, profStructure } from "$utils/prof";
  import type { ProfItem } from "$types/Prof.types";

  export let { name, role, room, block, website, school, department, img } =
    $$props as ProfItem;

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
      <h2 class="ProfCard__top--profile">
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
      color={profColors[profStructure[school]?.color] || profColors.gray}
    />
    {#if department !== ""}
      <SubChip
        label={department}
        color={profColors[profStructure[school]?.color] || profColors.gray}
      />
    {/if}
  </div>
  <div class="ProfCard__bottom Row--end w-100">
    <a
      href={website}
      class:disabled={website === ""}
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
    border-radius: 7px;
    border: 1px solid #dedede;
    background: #fff;
    font-family: "Montserrat", sans-serif;

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
        background: #6b91fb;
        color: #fff;
        font-weight: 500;
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
        // color: #91999e;
        font-size: 16px;
        font-weight: 400;
        text-decoration: none;
        border-radius: 30px;
        background: #010001;
        padding: 5px 10px;
        color: #fff;

        &.disabled {
          background: #a3a3a3;
          color: #ffffff;
          cursor: not-allowed;
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
