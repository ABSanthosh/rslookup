<script lang="ts">
  export let { rows, pageSize, trimmedRows, disabled } = $$props as {
    rows: any[];
    pageSize: number;
    trimmedRows: any[];
    disabled: boolean;
  };

  $: totalRows = rows.length;
  $: currentPage = 0;
  $: totalPages = Math.ceil(totalRows / pageSize);
  $: start = currentPage * pageSize;
  $: end = currentPage === totalPages - 1 ? totalRows - 1 : start + pageSize - 1;

  $: trimmedRows = rows.slice(start, end + 1);

  $: totalRows, (currentPage = 0);
  $: currentPage, start, end;
</script>

{#if totalRows && totalRows > pageSize}
  <div class="Pagination">
    <button
      class="CrispButton"
      data-type="ghost"
      on:click={() => {
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
    />
    Page
    <input class="CrispInput" bind:value={currentPage} {disabled} max={totalPages - 1} />
    of {totalPages - 1}
    <button
      class="CrispButton"
      data-type="ghost"
      on:click={() => {
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
    />
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
