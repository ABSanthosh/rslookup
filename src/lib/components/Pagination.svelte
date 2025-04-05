<script lang="ts">
  import { selectOnFocus } from '$utils/selectOnFocus';

  let {
    disabled,
    itemsLength = $bindable(),
    paginationConfig = $bindable()
  }: {
    disabled: boolean;
    itemsLength: number;
    paginationConfig: { pageSize: number; start: number; end: number };
  } = $props();

  let currentPage = $state(1); // The current page number, initialized to 1.
  let totalPages = $derived(Math.ceil(itemsLength / paginationConfig.pageSize)); // The total number of pages, calculated based on totalRows and pageSize.

  $effect(() => {
    // Whenever the pagination is disabled, we reset current page to 1
    // to reflect that there is a search and pagination config is reset
    if (disabled) {
      currentPage = 1;
    }
  });

  $effect(() => {
    // Whenever the current page changes, we update the start and end values
    paginationConfig.start = (currentPage - 1) * paginationConfig.pageSize;
    paginationConfig.end = currentPage * paginationConfig.pageSize;
  });
</script>

<div class="Pagination">
  <button
    class="CrispButton"
    data-type="ghost"
    onclick={() => {
      currentPage -= 1;

      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }}
    disabled={currentPage === 1 || disabled}
    aria-label="left arrow icon"
    aria-describedby="prev"
    data-icon="arrow_back"
  ></button>
  Page
  <input
    min="1"
    {disabled}
    type="number"
    use:selectOnFocus
    class="CrispInput"
    max={totalPages - 1}
    onblur={(e: Event) => {
      if ((e.target as HTMLInputElement).valueAsNumber > totalPages - 1) {
        currentPage = totalPages - 1;
      } else if (
        (e.target as HTMLInputElement).valueAsNumber < 1 ||
        isNaN((e.target as HTMLInputElement).valueAsNumber)
      ) {
        currentPage = 1;
      }
    }}
    bind:value={currentPage}
  />
  of {totalPages - 1}

  <button
    class="CrispButton"
    data-type="ghost"
    onclick={() => {
      currentPage += 1;

      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }}
    disabled={currentPage === totalPages - 1 || disabled}
    aria-label="right arrow icon"
    aria-describedby="next"
    data-icon="arrow_forward"
  ></button>
</div>

<style lang="scss">
  .Pagination {
    gap: 10px;
    @include make-flex($dir: row);

    & > input {
      --crp-input-width: 30px;
      --crp-input-height: 30px;
      --crp-input-padding: 0 4px;
      text-align: center;
    }

    & > button {
      &::before {
        font-variation-settings:
          'FILL' 0,
          'wght' 700,
          'GRAD' 0,
          'opsz' 48;
      }
    }
  }
</style>
