<script lang="ts">
  import clickOutside from '$utils/onClickOutside';

  let {
    filters = $bindable(),
    isFilterOpen = $bindable()
  }: {
    filters: {
      name: string;
      checked: boolean;
      icon: string;
    }[];
    isFilterOpen: boolean;
  } = $props();
</script>

<aside class="Amenity__filter--desktop">
  <ul class="Amenity__filterBox Amenity__filter--content" data-align="left">
    {#each filters as filterItem}
      <label
        for={filterItem.name}
        data-icon={filterItem.icon}
        class="Amenity__filter--item"
        class:active={filterItem.checked}
      >
        {filterItem.name}
        <input
          type="checkbox"
          class="CrispInput"
          id={filterItem.name}
          checked={filterItem.checked}
          onchange={() => (filterItem.checked = !filterItem.checked)}
          disabled={filterItem.checked && filters.filter((item) => item.checked).length === 1}
        />
      </label>
    {/each}
  </ul>
</aside>

<details
  use:clickOutside
  bind:open={isFilterOpen}
  onOutClick={() => (isFilterOpen = false)}
  class="CrispMenu Layout__filter Amenity__filter--mobile"
>
  <summary data-no-marker data-icon="filter_list">
    Filters
    <span>
      {filters.filter((item) => item.checked).length}
    </span>
  </summary>
  <ul class="Amenity__filterBox CrispMenu__content Layout__filter--content">
    {#each filters as filterItem}
      <label
        data-icon={filterItem.icon}
        class="Amenity__filter--item"
        class:active={filterItem.checked}
        for={`${filterItem.name}-${filterItem.icon}`}
      >
        {filterItem.name}
        <input
          type="checkbox"
          class="CrispInput"
          checked={filterItem.checked}
          id={`${filterItem.name}-${filterItem.icon}`}
          onchange={() => (filterItem.checked = !filterItem.checked)}
          disabled={filterItem.checked && filters.filter((item) => item.checked).length === 1}
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
        cursor: pointer;
        user-select: none;
        border-radius: 4px;
        align-items: center;
        text-decoration: none;
        color: var(--foreground);
        @include box($height: 36px);
        @include make-flex($dir: row, $just: flex-start);
        &.active {
          background: var(--amenity-filter-active-bg);
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
          margin-left: auto;
        }
      }
    }
    &__filterBox {
      gap: 10px;
      padding: 10px;
      border-radius: 10px;
      background-color: var(--amenity-filter-bg);
      border: 1px solid var(--lab-item-separator);
      @include make-flex($dir: column, $align: flex-start);
      @include respondAt(630px) {
        width: 200px;
      }
    }
  }
</style>
