<script lang="ts">
  // https://www.css-gradient.com/
  // https://coolors.co/gradient-maker

  import { ROUTES } from '$data/routes';
</script>

<svelte:head>
  <title>rslookup | SNU</title>
  <meta
    name="description"
    content="Simplify your college experience by effortlessly accessing professor info,
  lab locations, campus amenities, and much more!"
  />
</svelte:head>

<section class="Hero">
  <div class="Hero__left">
    <h1>rslookup</h1>
    <p>
      Simplify your college experience by effortlessly accessing professor info, lab locations,
      campus amenities, and much more!
    </p>
  </div>
  <div class="Hero__right">
    <img loading="eager" fetchpriority="high" src="/images/neko.gif" alt="hero neko gif" />
  </div>
</section>

<section class="Routes">
  <div class="Routes__header">
    <hr />
    <h2>What's there for you?</h2>
    <hr />
  </div>
  <div class="Routes__content">
    {#each ROUTES as item}
      <a href={item.route} style="--background-image: {item.background};">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
      </a>
    {/each}
  </div>
</section>

<style lang="scss">
  .Hero {
    display: grid;
    @include box();
    min-height: 80vh;
    grid-template-columns: 1.2fr 1fr;

    @include respondAt(870px) {
      gap: 30px;
      min-height: 65vh;
      @include make-flex();
    }
    @include respondAt(700px) {
      min-height: 60vh;
    }
    @include respondAt(580px) {
      grid-template-columns: 1fr 0fr;
    }

    &__left {
      gap: 15px;
      @include make-flex($align: flex-start);

      & > h1 {
        font-size: 7.5em;
        font-style: italic;
        font-variation-settings:
          'SOFT' 20,
          'WONK' 0;
        font-optical-sizing: auto;
        font-family: 'Fraunces', serif;
        transition: font-size 0.3s ease;

        @include respondAt(900px) {
          font-size: 8em;
        }
        @include respondAt(700px) {
          font-size: 6em;
        }
        @include respondAt(510px) {
          font-size: 4em;
        }
      }

      & > p {
        font-size: 18px;
        text-align: justify;
        color: var(--subFg-1);

        @include respondAt(580px) {
          text-align: unset;
        }
      }
    }

    &__right {
      @include box();
      @include make-flex($align: flex-end);

      & > img {
        margin-top: 100px;
        max-width: 410px;
        max-height: 440px;
        aspect-ratio: 0.93;
        @include box(auto, 55%);
        filter: drop-shadow(0px 0px 55px rgba(255, 255, 255, 0.25));

        @include respondAt(905px) {
          height: 50%;
        }

        @include respondAt(870px) {
          margin-top: 0px;
          max-width: 200px;
          @include box(80vw, auto);
        }
      }
    }
  }

  .Routes {
    @include box($height: auto);

    &__header {
      gap: 12px;
      @include box($height: auto);
      @include make-flex($dir: row);

      & > h2 {
        font-size: 20px;
      }
      & > hr {
        flex-grow: 1;
        border: none;
        @include box(auto, 1px);
        background: var(--t-crp-light-border);
      }
    }

    &__content {
      gap: 30px;
      display: grid;
      margin-top: 20px;
      margin-bottom: 50px;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      @include box($height: auto);
      @include respondAt(905px) {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      }

      @include respondAt(345px) {
        grid-template-columns: 1fr;
      }

      & > a {
        gap: 20px;
        z-index: 1;
        padding: 30px;
        @include box();
        min-height: 220px;
        position: relative;
        border-radius: 10px;
        text-decoration: none;
        border: 1px solid var(--t-crp-border);
        background-color: var(--home-card-background-color);
        @include make-flex($just: flex-start, $align: flex-start);

        h2 {
          gap: 10px;
          display: grid;
          line-height: 1;
          font-size: 28px;
          font-weight: 900;
          color: var(--foreground);
          @include box($height: auto);
          grid-template-columns: 1fr 23px;

          @include respondAt(450px) {
            font-size: 28px;
          }

          &::after {
            top: 20px;
            right: 20px;
            padding: 4px;
            content: '\e5d8';
            border-radius: 50%;
            position: absolute;
            @include make-flex();
            transform: rotate(45deg);
            @include box(17px, 17px);
            color: var(--iconColor);
            font-variation-settings:
              'FILL' 0,
              'wght' 300,
              'GRAD' 0,
              'opsz' 48;
            transition:
              transform 0.3s ease,
              background-color 0.3s ease;
            font: normal normal normal 20px/1 'Icons';
          }
        }
        p {
          font-size: 18px;
          font-weight: 500;
          line-height: 28px;
          color: var(--subFg-1);
          @include respondAt(450px) {
            font-size: 18px;
          }
        }

        &::before {
          top: 0;
          left: 0;
          opacity: 0;
          content: '';
          z-index: -1;
          @include box();
          position: absolute;
          border-radius: 9px;
          transition: opacity 0.3s ease-out;
        }

        // if the last item is an odd number, then grid-column: 1 / 3; else grid-column: 1 / 2;
        &:nth-last-child(1):nth-child(odd) {
          grid-column: 1 / 3;

          @include respondAt(660px) {
            grid-column: 1 / 2;
          }
        }

        &:hover {
          box-shadow: var(--home-card-box-shadow);

          &::before {
            opacity: 1;
            background: var(--background-image);
          }
          p {
            color: white;
            text-shadow: 0px 0px 5px #00000033;
          }
          h2 {
            color: white;
            text-shadow: 0px 0px 5px #00000033;
            &::after {
              background-color: aliceblue;
              transform: rotate(45deg) scale(1.3);
            }
          }
        }
      }
    }
  }
</style>
