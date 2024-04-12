<script lang="ts">
  import { page } from "$app/stores";
</script>

<main class="ClubLayout">
  <section class="ClubLayout__hero">
    <h2>What are the clubs?</h2>
    <p>
      Discover Your Campus Crew: Get Acquainted with SNIoE's Club Leaders and
      Members!
    </p>
  </section>
  <ul class="ClubLayout__tabs">
    <li>
      <a
        href="/clubs/cultural"
        class:active={$page.url.pathname === "/clubs/cultural"}
      >
        Cultural
      </a>
    </li>
    <li>
      <a
        href="/clubs/technical"
        class:active={$page.url.pathname === "/clubs/technical"}
      >
        Technical
      </a>
    </li>
  </ul>
</main>
<slot />

<style lang="scss">
  .ClubLayout {
    width: 100%;

    &__tabs {
      gap: 10px;
      width: auto;
      padding: 4px;
      list-style: none;
      max-width: 400px;
      border-radius: 6px;
      @include box(100%, 40px);
      background-color: var(--crp-tab-background-color);
      margin-bottom: 30px;
      @include make-flex($dir: row, $just: space-between);

      li {
        width: 100%;

        a {
          width: 100%;
          padding: 6px 12px;
          border-radius: 4px;
          @include make-flex();
          text-decoration: none;

          &.active {
            background-color: var(--crp-tab-item-background-color);
          }
        }
      }
    }

    &__hero {
      @include make-flex($just: flex-start, $align: flex-start);
      margin: 40px 0 30px 0;
      gap: 10px;
      width: 100%;

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
  }
</style>
