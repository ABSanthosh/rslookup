<script lang="ts">
  import { HOME_ROUTES } from '$data/routes';
</script>

<footer class="FooterWrapper">
  <div class="FooterWrapper__container">
    <div class="FooterWrapper__left">
      <span>
        Have any feedback? Fill it
        <a
          href="https://forms.gle/ELq8hJq6m8ZcTrLA8"
          target="_blank"
          rel="noopener noreferrer"
          class="FancyLink"
          data-type="Bracket"
        >
          here
        </a>
      </span>
    </div>
    <div class="FooterWrapper__right">
      {#each HOME_ROUTES as { name, route }}
        <a href={route}>
          {name}
        </a>
        •
      {/each}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ABSanthosh/rslookup/blob/master/LICENSE"
      >
        Licensed under GNU GPLv3
      </a>
    </div>
  </div>
</footer>

<style lang="scss">
  $extraPadding: 20px;

  .FooterWrapper {
    margin-top: auto;
    font-weight: 500;
    @include make-flex();
    color: var(--foreground);
    @include box(100vw, auto);
    border-top: 0.5px solid var(--t-crp-border);
    background-color: var(--elevation-1);

    @include respondAt(650px) {
      height: auto;
    }

    &__left {
      & > span {
        gap: 3px;
        font-style: italic;
        color: var(--subText);
        @include make-flex($dir: row);
        flex-wrap: wrap;
      }
      a {
        font-style: italic;
      }
    }

    &__right {
      flex-wrap: wrap;
      column-gap: 10px;
      color: var(--subFg-1);
      transition: color 0.3s;
      @include make-flex($dir: row);
      & > a {
        color: var(--subFg-1);

        &:hover {
          color: var(--foreground);
        }
      }
    }

    &__container {
      gap: 20px;
      @include box($height: auto);
      max-width: $maxWidth;
      padding: $extraPadding;
      @include make-flex($dir: row, $just: space-between);
      @include respondAt(650px) {
        flex-direction: column;
      }
    }
  }
</style>
