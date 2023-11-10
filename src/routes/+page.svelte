<script lang="ts">
  const CategoryItems = [
    {
      name: "Where's My Prof?",
      description:
        "Locate your professors on campus hassle-free. Say goodbye to wandering through hallways or frantically searching for room numbers.",
      href: "/prof",
      disabled: false,
      background: "linear-gradient(-45deg, #89f7fe 0%, #66a6ff 100%)",
    },
    {
      name: "Where's My Lab?",
      description:
        "Finding your designated lab spaces with ease. No more wandering around campus, feeling lost and bewildered.",
      href: "/lab",
      disabled: false,
      background: "linear-gradient(-45deg, #FFC796 0%, #FF6B95 100%)",
    },
    {
      name: "Where's My Amenity?",
      description:
        "Find every amenity on campus, from Academic Blocks to Cafeterias, all in one place.",
      href: "/amenity",
      disabled: false,
      background: "linear-gradient(-45deg, #2575fc 0%, #6a11cb 100%)",
    },
    {
      name: "Where's My Course?(Coming Soon)",
      description:
        "Its exam season and you are back to messaging your seniors for past papers? Not anymore.",
      href: "/course",
      disabled: false,
      background: "linear-gradient(-45deg, #e5b2ca 0%, #7028e4 100%)",
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
      {#if item.disabled}
        <div
          data-active={item.disabled}
          class="Category__content--item"
          style="--background-image: {item.background};"
        >
          <h2>{item.name}</h2>
          <p>
            {item.description}
          </p>
        </div>
      {:else}
        <a
          class="Category__content--item"
          href={item.href}
          data-active={item.disabled}
          style="--background-image: {item.background};"
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
        flex-grow: 1;
        border: none;
        @include box(auto, 1px);
        background: var(--LabSeparator);
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

      &--item {
        &[data-active="true"] {
          cursor: not-allowed;
        }
        gap: 20px;
        z-index: 1;
        padding: 30px;
        @include box();
        min-height: 240px;
        position: relative;
        border-radius: 10px;
        text-decoration: none;
        // transition: all 0.3s ease;
        background-color: var(--background);
        border: 1px solid var(--border);
        @include make-flex($just: flex-start, $align: flex-start);

        h2 {
          gap: 10px;
          display: grid;
          color: var(--foreground);
          font-size: 32px;
          font-weight: 900;
          @include box($height: auto);
          grid-template-columns: 1fr 23px;

          @include respondAt(450px) {
            font-size: 28px;
          }
        }
        p {
          color: var(--foreground);
          font-weight: 500;
          font-size: 20px;
          line-height: 28px;
          @include respondAt(450px) {
            font-size: 18px;
          }
        }

        &::before {
          top: 0;
          left: 0;
          opacity: 0;
          content: "";
          z-index: -1;
          @include box();
          position: absolute;
          border-radius: 9px;
          transition: opacity 0.3s ease-out;
        }
        &:hover {
          box-shadow: var(--toastShadow);

          &::before {
            opacity: 1;
            background: var(--background-image);
          }
          p {
            color: white;
          }
          h2 {
            color: white;
            &::after {
              transform: scale(1.4);
              background-color: aliceblue;
            }
            &::before {
              transform: scale(1.4);
            }
          }
        }
        &[data-active="false"]h2 {
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
            filter: invert(1);

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
