<!-- https://www.magnt.com/404/ -->
<main class="Error">
  <img src="/assets/images/404.svg" alt="404" />
  <h2>404</h2>
  <p>Oops… seems like you got lost in space</p>
  <a class="CrispButton" data-type="black-outline" href="/"> Go back home </a>
</main>

<style lang="scss">
  .Error {
    gap: 10px;
    margin: 40px 0 30px 0;
    @include make-flex($just: center, $align: center);

    & > h2 {
      font-size: 40px;
      font-weight: 900;
      color: var(--foreground);
    }

    & > p {
      font-size: 20px;
      font-weight: 400;
      color: var(--subText);
    }
  }
</style>
