<script lang="ts">
  const CategoryItems = [
    {
      name: "Where's My Prof?",
      description:
        "Locate your professors on campus hassle-free. Say goodbye to wandering through hallways or frantically searching for room numbers.",
      href: "/prof",
      disabled: false,
      background: "url('/assets/images/NoiseGradient1.png')",
    },
    {
      name: "Where's My Lab?",
      description:
        "Finding your designated lab spaces with ease. No more wandering around campus, feeling lost and bewildered.",
      href: "/lab",
      disabled: false,
      background: "url('/assets/images/NoiseGradient2.jpg')",
    },
    {
      name: "Where's My Amenity?",
      description:
        "Find every amenity on campus, from Academic Blocks to Cafeterias, all in one place.",
      href: "/amenity",
      disabled: false,
      background: "url('/assets/images/NoiseGradient3.png')",
    },
    {
      name: "Where's My Course?(Coming Soon)",
      description:
        "Its exam season and you are back to messaging your seniors for past papers? Not anymore.",
      href: "/course",
      disabled: true,
      background: "url('/assets/images/NoiseGradient4.jpg')",
    },
  ];
</script>

<section class="Section Hero">
  <div class="Hero__left">
    <h1>rslookup</h1>
    <p>
      Simplify your college experience by effortlessly accessing professor info,
      lab locations, campus amenities, and past course materials.
    </p>
  </div>
  <div class="Hero__right" />
</section>
<section class="Category">
  <div class="Category__top">
    <hr />
    <h3>What's there for you?</h3>
    <hr />
  </div>
  <div class="Category__content">
    {#each CategoryItems as item}
      {#if !item.disabled}
        <div
          class="Category__content--item"
          style="background-image: {item.background};"
        >
          <h2>{item.name}</h2>
          <p>
            {item.description}
          </p>
        </div>
      {:else}
        <a
          class="Category__content--item"
          style="background-image: {item.background};"
          href={item.href}
        >
          <h2>{item.name}</h2>
          <p>
            {item.description}
          </p>
        </a>
      {/if}
    {/each}
  </div>
</section>

<style lang="scss">
  .Hero {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    @include box();
    min-height: 80vh;

    @include respondAt(700px) {
      min-height: 60vh;
    }
    @include respondAt(580px) {
      grid-template-columns: 1fr 0fr;
    }
    &__left {
      @include make-flex($align: flex-start);
      gap: 15px;

      & > h1 {
        color: var(--foreground);
        font-family: "Fraunces", serif;
        font-size: 8em;
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
        font-size: 20px;
        text-align: justify;
        color: var(--subText);
        font-family: "Montserrat", sans-serif;
        @include respondAt(580px) {
          text-align: unset;
        }
      }
    }
  }

  .Category {
    @include box($height: auto);

    &__top {
      gap: 10px;
      @include box($height: auto);
      @include make-flex($dir: row);

      & > hr {
        background: var(--LabSeparator);
        @include box(auto, 1px);
        flex-grow: 1;

        border: none;
      }
    }

    &__content {
      gap: 20px;
      margin-top: 20px;
      @include make-flex();
      @include box($height: auto);

      &--item {
        gap: 20px;
        min-height: 180px;
        @include box();
        padding: 30px;
        border-radius: 30px;
        @include make-flex($just: flex-start, $align: flex-start);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        h2 {
          gap: 10px;
          display: grid;
          color: white;
          font-size: 32px;
          font-weight: 900;
          @include box($height: auto);
          grid-template-columns: 1fr 23px;
        }
        p {
          color: white;
          font-weight: 500;
          font-size: 20px;
          line-height: 28px;
        }
        text-decoration: none;
        &:hover {
          h2 {
            &::after {
              transform: scale(1.4);
              background-color: aliceblue;
            }
            &::before {
              transform: scale(1.4);
              filter: invert(1);
            }
          }
        }
        h2 {
          position: relative;
          &::after,
          &::before {
            content: " ";
            display: block;

            padding: 4px;
            border-radius: 50%;
            transition: transform 0.3s ease, background-color 0.3s ease;
          }

          &::before {
            right: 0;
            z-index: 1;
            position: absolute;
            background-size: 10px;
            @include box(16px, 16px);
            min-width: 16px;
            min-height: 16px;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url("/assets/images/newTab.svg");
          }
          &::after {
            @include box(13px, 13px);
            border: 1px solid white;
          }
        }
      }
    }
  }
</style>
