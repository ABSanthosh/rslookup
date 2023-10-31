<script lang="ts">
  import { page } from "$app/stores";

  $: isHome = $page.url.pathname === "/";
</script>

<footer class="FooterWrapper {isHome ? 'FooterWrapper--home' : ''}">
  <!-- {#if isHome}
    <h1>rslookup</h1>
  {/if} -->
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
    margin-top: auto;
    font-weight: 500;
    @include make-flex();
    color: var(--foreground);
    @include box(100vw, 60px);
    border-top: 0.5px solid var(--border);
    background-color: var(--elevatedBG);

    @include respondAt(650px) {
      height: auto;
    }

    &--home {
      @include box(100%, 60px);
      // @include box(100%, 430px);
      // background-color: var(--footerBG);

      // @include respondAt(900px) {
      //   height: 300px;
      // }
      // @include respondAt(700px) {
      //   height: 250px;
      // }
      @include respondAt(650px) {
        height: auto;
      }
    }

    // & > h1 {
    //   font-weight: 500;
    //   user-select: none;
    //   line-height: 100%;
    //   position: relative;
    //   margin: auto;

    //   text-decoration: none;
    //   color: var(--foreground);
    //   font-family: "Fraunces", serif;
    //   max-width: $maxWidth;
    //   padding: $extraPadding;

    //   font-size: 10em;
    //   transition: font-size 0.3s ease;
    //   @include respondAt(900px) {
    //     font-size: 8em;
    //   }
    //   @include respondAt(700px) {
    //     font-size: 6em;
    //   }
    //   @include respondAt(510px) {
    //     font-size: 4em;
    //   }
    // }

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
        @include make-flex($dir: row);
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
