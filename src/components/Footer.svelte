<footer class="FooterWrapper">
  <div class="FooterWrapper__container">
    <div class="FooterWrapper__left">
      <span>
        Want to contribute? Check out the <a
          href="https://github.com/ABSanthosh/rslookup"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repo
        </a>
      </span>
    </div>
    <div class="FooterWrapper__right">
      <p class="FooterWrapper__right--title">
        Made with ❤️ by
        <a href="santhosh.is-a.dev" target="_blank" rel="noopener noreferrer">
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
    @include box(100vw, 60px);
    border: 0.5px solid var(--border);
    background-color: var(--background);

    @include respondAt(650px) {
      height: auto;
    }

    &__left {
      & > span,
      a {
        font-style: italic;
        color: var(--subText);
      }
    }

    &__container {
      @include make-flex($dir: row, $just: space-between);
      @include box();
      max-width: $maxWidth;
      padding: $extraPadding;
      gap: 20px;
      @include respondAt(650px) {
        flex-direction: column;
      }
    }
  }
</style>
