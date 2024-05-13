<!-- https://www.magnt.com/404/ -->
<main class="Error">
  <img src="/src/lib/images/404.svg" alt="404" />
  <h2>404</h2>
  <p>Oops… seems like you got lost in space</p>
  <a class="CrispButton" data-type="black-outline" href="/"> Go back home </a>
</main>

<style lang="scss">
  .Error {
    gap: 30px;
    @include box();
    margin: 40px 0 30px 0;
    @include make-flex($just: center, $align: center);

    & > img {
      width: 100%;
      max-width: 500px;
    }

    & > h2 {
      font-size: 40px;
      font-weight: 900;
      color: var(--foreground);
    }

    & > p {
      font-size: 20px;
      font-weight: 400;
      text-align: center;
      color: var(--subFg-1);
    }
  }
</style>
