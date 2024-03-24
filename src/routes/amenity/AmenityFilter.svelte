<script lang="ts">
  import { clickOutside } from "$lib/ClickOutside";

  export let { filters, isFilterOpen } = $$props as {
    filters: {
      name: string;
      checked: boolean;
      icon: number;
    }[];
    isFilterOpen: boolean;
  };
</script>

<aside class="Amenity__filter--desktop">
  <ul class="Amenity__filterBox Amenity__filter--content" data-align="left">
    {#each filters as filterItem}
      <label
        for={filterItem.name}
        class="Amenity__filter--item"
        class:active={filterItem.checked}
        data-icon={String.fromCharCode(filterItem.icon)}
      >
        {filterItem.name}
        <input
          type="checkbox"
          class="CrispInput"
          id={filterItem.name}
          checked={filterItem.checked}
          disabled={filterItem.checked &&
            filters.filter((item) => item.checked).length === 1}
          on:change={() => {
            filterItem.checked = !filterItem.checked;
          }}
        />
      </label>
    {/each}
  </ul>
</aside>

<details
  use:clickOutside
  bind:open={isFilterOpen}
  class="CrispMenu Amenity__filter Amenity__filter--mobile"
  on:outclick={() => (isFilterOpen = false)}
>
  <summary data-no-marker data-icon={String.fromCharCode(57682)}>
    Filters
    <span>
      {filters.filter((item) => item.checked).length}
    </span>
  </summary>
  <ul
    class="Amenity__filterBox CrispMenu__content Amenity__filter--content"
    data-align="left"
  >
    {#each filters as filterItem}
      <label
        for={`${filterItem.name}-${filterItem.icon}`}
        class="Amenity__filter--item"
        class:active={filterItem.checked}
        data-icon={String.fromCharCode(filterItem.icon)}
      >
        {filterItem.name}
        <input
          type="checkbox"
          class="CrispInput"
          checked={filterItem.checked}
          id={`${filterItem.name}-${filterItem.icon}`}
          disabled={filterItem.checked &&
            filters.filter((item) => item.checked).length === 1}
          on:change={() => {
            filterItem.checked = !filterItem.checked;
          }}
        />
      </label>
    {/each}
  </ul>
</details>

<style lang="scss">
  .Amenity {
    &__filter {
      &--item {
        gap: 8px;
        padding: 8px;
        display: grid;
        user-select: none;
        border-radius: 4px;
        align-items: center;
        text-decoration: none;
        color: var(--foreground);
        @include box($height: 36px);
        @include make-flex($dir: row, $just: flex-start);
        &.active {
          background: var(--activeNav);
        }

        & > input {
          margin-left: auto;
        }
      }

      &--desktop {
        top: 108px;
        width: 230px;
        height: unset;
        flex-shrink: 0;
        overflow: auto;
        position: sticky;
        max-height: calc(100vh - 124px);

        @include respondAt(630px) {
          display: none;
        }
      }

      &--mobile {
        display: none;
        @include respondAt(630px) {
          display: block;
        }
      }
    }
    &__filterBox {
      gap: 10px;
      background-color: var(--popoverBG);
      border-radius: 10px;
      padding: 10px;
      border: 1px solid var(--LabSeparator);
      @include make-flex($dir: column, $align: flex-start);
    }
  }
</style>
