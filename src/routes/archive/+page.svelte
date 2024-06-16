<script>
  import { ARCHIVE_ROUTES } from '$data/routes';
</script>

<svelte:head>
  <title>Archive</title>
  <meta name="description" content="A Collection of All the pages made for a particular purpose" />
</svelte:head>

<section class="Archive__hero">
  <h2>Archive</h2>
  <p>A Collection of All the pages made for a particular purpose that's no longer in use</p>
</section>

<ul class="Archive__content">
  {#each ARCHIVE_ROUTES as { name, route, image, desc }}
    <li class="Archive__content--item">
      <div class="gap-5 w-100">
        <a target="_blank" rel="noopener noreferrer" href={route}>
          <h3 class="title">{name}</h3>
        </a>
        <p class="subText">{desc}</p>
      </div>
      <img src={image} alt={name} />
    </li>
  {/each}
</ul>

<style lang="scss">
  .Archive {
    &__hero {
      @include box();
      padding-top: 80px;
      @include make-flex($just: flex-start);

      @include respondAt(680px) {
        padding: 0;
        margin: 40px 0 30px 0;
        @include make-flex($just: flex-start, $align: flex-start);
      }

      & > h2 {
        font-size: 45px;
        font-weight: 900;

        @include respondAt(500px) {
          font-size: 32px;
        }
      }

      & > p {
        font-size: 20px;
        font-weight: 400;
        color: var(--subFg-1);

        @include respondAt(500px) {
          font-size: 18px;
        }
      }
    }

    &__content {
      gap: 20px;
      @include box(100%, auto);
      @include make-flex($dir: column, $just: flex-start, $align: flex-start);

      &--item {
        position: relative;
        @include box(100%, auto);
        padding-left: 40px;
        @include make-flex($just: space-between, $align: center);
        gap: 20px;

        & > div > p {
          color: var(--subFg-2);
        }

        @include respondAt(680px) {
          @include make-flex($dir: column, $just: flex-start, $align: flex-start);
          gap: 10px;
        }

        & > img {
          border-radius: 8px;
          object-fit: contain;
          @include box(100%, auto);
          border: 1px solid var(--elevation-2);
          box-shadow: var(--t-crp-box-shadow);
        }

        &::after {
          content: '+';
          top: 15px;
          left: 0px;
          padding: 5px;
          font-size: 25px;
          position: absolute;
          border-radius: 50%;
          @include make-flex();
          @include box(15px, 15px);
          color: var(--background);
          background-color: var(--foreground);
        }

        &:not(:last-child) {
          &::before {
            top: 15px;
            left: 12px;
            width: 1px;
            content: '';
            position: absolute;
            height: calc(100% + 25px);
            background-color: var(--foreground);
          }
        }
      }
    }
  }
</style>
