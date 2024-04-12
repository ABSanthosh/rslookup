<script lang="ts">
  import { page } from "$app/stores";

  $: isHome = $page.url.pathname === "/";
</script>

<footer class="FooterWrapper {isHome ? 'FooterWrapper--home' : ''}">
  <div class="FooterWrapper__container">
    <div class="FooterWrapper__left">
      <span>
        Have any feedback? File it
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
      <p class="FooterWrapper__right--title">
        <span class="w-100">
          Made with ❤️ by
          <a
            class="FancyLink"
            data-type="Bracket"
            href="https://abs.moe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Santhosh
          </a>
        </span>
        <span class="w-100">
          Managed by
          <a
            class="FancyLink"
            data-type="Bracket"
            href="https://www.instagram.com/snioe.sc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Student Council
          </a>
        </span>
      </p>
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
    border-top: 0.5px solid var(--border);
    background-color: var(--elevatedBG);

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
      color: var(--foreground);
      &--title {
        @include make-flex($just: flex-start);
        gap: 3px;
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
