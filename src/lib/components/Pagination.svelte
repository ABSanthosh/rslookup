<script lang="ts">
  let {
    rows,
    pageSize,
    disabled,
    trimmedRows = $bindable()
  }: {
    rows: any[];
    pageSize: number;
    disabled: boolean;
    trimmedRows: any[];
  } = $props();

  let currentPage = $state(1); // The current page number, initialized to 1.
  let totalRows = $state(rows.length); // The total number of rows/items, derived from the length of the rows array.
  let totalPages = Math.ceil(totalRows / pageSize); // The total number of pages, calculated based on totalRows and pageSize.
  let start = $derived((currentPage - 1) * pageSize); // The starting index of the items for the current page, derived from currentPage and pageSize.
  let end = $derived(currentPage === totalPages - 1 ? totalRows - 1 : start + pageSize - 1); // The ending index of the items for the current page, derived from currentPage, totalPages, totalRows, and pageSize.

  $effect(() => {
    // Every time start or end changes, update trimmedRows to reflect the items for the current page.
    trimmedRows = rows.slice(start, end + 1);
  });
</script>

{#if totalRows && totalRows > pageSize}
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
      disabled={(currentPage === 0 ? true : false) || disabled}
      aria-label="left arrow icon"
      aria-describedby="prev"
      data-icon={String.fromCharCode(58820)}
    ></button>
    Page
    <input class="CrispInput" bind:value={currentPage} {disabled} max={totalPages - 1} />
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
      disabled={(currentPage === totalPages - 1 ? true : false) || disabled}
      aria-label="right arrow icon"
      aria-describedby="next"
      data-icon={String.fromCharCode(58824)}
    ></button>
  </div>
{/if}

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
