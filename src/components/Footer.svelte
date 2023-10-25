<footer class="FooterWrapper">
  <div class="FooterWrapper__container">
    <div class="FooterWrapper__left">
      <span>
        Want to contribute? Check out the <a
          href="https://github.com/ABSanthosh/rslookup"
          target="_blank"
          rel="noopener noreferrer"
          class="FancyLink"
          data-type="Bracket"
        >
          Github repo
        </a>
      </span>
    </div>
    <div class="FooterWrapper__right">
      <p class="FooterWrapper__right--title">
        Made with ❤️ by
        <a
          class="FancyLink"
          data-type="Bracket"
          href="https://santhosh.is-a.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Santhosh
        </a>
      </p>
    </div>
  </div>
</footer>

<style lang="scss">
  $extraPadding: 20px;

  .FooterWrapper {
    margin-top: 70px;
    font-weight: 500;
    @include make-flex();
    color: var(--foreground);
    @include box(100vw, 60px);
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
      &--title {
        @include make-flex($dir: row);
        gap: 3px;
      }
    }

    &__container {
      gap: 20px;
      @include box();
      max-width: $maxWidth;
      padding: $extraPadding;
      @include make-flex($dir: row, $just: space-between);
      @include respondAt(650px) {
        flex-direction: column;
      }
    }
  }
</style>
