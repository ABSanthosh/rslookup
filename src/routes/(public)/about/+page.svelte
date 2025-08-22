<script lang="ts">
  import NEKO from '$images/neko.webp';
  import STUDENT_COUNCIL from '$images/student_council.jpg';

  const resources = [
    {
      name: 'SvelteKit',
      link: 'https://kit.svelte.dev/',
      description: 'Web framework'
    },
    {
      name: 'Google Sheets',
      link: '-',
      description: '"Database" (Closed source)'
    },
    {
      name: 'GitHub',
      link: 'https://github.com/ABSanthosh/rslookup',
      description: 'Source code'
    },
    {
      name: 'Cloudflare',
      link: 'https://www.cloudflare.com/',
      description: 'Web hosting'
    },
    {
      name: 'Figma',
      link: 'https://www.figma.com/file/y8tgFPWUy9p8ZVuT1eR5JN/rslookup?type=design&node-id=278%3A120&mode=design&t=ElCuS1IFfRk5SYYK-1',
      description: 'Design'
    },
    {
      name: 'GoatCounter',
      link: 'https://rslookup.goatcounter.com/',
      description: 'Analytics'
    }
  ] as const;
</script>

<svelte:head>
  <title>About rslookup</title>
  <meta name="description" content="What is rslookup?" />
</svelte:head>

<main class="About">
  <div class="About__header">
    <h1 class="About__header--title">About rslookup</h1>
    <p>
      rslookup is a platform designed to help SNIoE students find the resources they need for their
      day-to-day life.
    </p>
  </div>
  <section class="About__prose">
    <h2>What is rslookup?</h2>
    <p>
      <a class="About--link" href="https://rslookup.abs.moe">rslookup</a> is a platform where students
      can find resources such as documents, professor details, lab locations, amenities, and much more.
      The goal of the site is to be your first stop whenever you need information about anything in the
      college.
    </p>
  </section>
  <section class="About__prose">
    <h2>How did rslookup get started?</h2>
    <p>
      This project began as a personal passion project on September 27, 2023, after I missed an
      office hour with a professor because I couldn't find his office location. It wasn't in his
      email signature, the course handout, or even on the SNU website. I searched every academic
      building but still couldn't find it.
    </p>
    <p>
      I've always liked the idea of open and free software, especially since almost everything
      needed to build a website is available for free. I've also always wanted to leave a mark on
      the university where I spent four years.
    </p>
    <p>
      Although this is important information, it was not available on the college website. So, I
      decided to create a platform where students can find all the information they need in one
      place.
    </p>
  </section>
  <section class="About__prose">
    <h2>Where does the data come from?</h2>
    <p>
      Initially, the vision for the project was to make the website crowd-sourced, allowing students
      to add resources they found useful. However, due to a lack of time and resources, I had to
      find another way to keep the data up to date.
    </p>
    <div class="Row--center w-100">
      <div class="About__LogoBox">
        <img alt="hero neko gif" class="About__LogoBox--neko" src={NEKO} />
        <span data-icon="close"></span>
        <img alt="Student Council" class="About__LogoBox--sc" src={STUDENT_COUNCIL} />
      </div>
    </div>
    <p>
      Where better to get the most accurate and up-to-date information than the Student Council? The
      Student Council is the governing body of the students and has access to all the information
      students might need.
    </p>
    <p>
      After signing a c<a
        rel="noopener"
        target="_blank"
        class="About--link"
        href="https://docs.google.com/document/d/1yQAr8-4FiogjW7E-wyhhlZvXNPnI4LpLCgL78VxbYxk/edit?usp=sharing"
      >
        Memorandum of Understanding
      </a>
      with the 2024-25 Student Council, I was able to strike a deal to use the website as a platform
      to host all the resources they were previously sharing with students through Linktree. Check out
      the <a class="About--link" href="/resources">Credits</a> page to see the people maintaining the
      data.
    </p>
  </section>
  <section class="About__prose">
    <h2>Tools used</h2>
    <ul>
      {#each resources as resource}
        <li>
          <a rel="noopener" target="_blank" class="About--link" href={resource.link}>
            {resource.name}
          </a>
          - {resource.description}
        </li>
      {/each}
    </ul>
  </section>
  <section class="About__prose">
    <h2>Contribute</h2>
    <p>
      If you have any suggestions for features that you think would be useful to others, feel free
      to
      <a class="About--link" href="https://github.com/ABSanthosh/rslookup/issues/new"
        >open an issue</a
      >
      on GitHub or fill out this
      <a class="About--link" href="https://forms.gle/ELq8hJq6m8ZcTrLA8">form</a>. You can also
      contribute by suggesting new categories or improving the website. The source code is available
      on GitHub. All code changes will be reviewed by the website PoC and Student Council PoCs
      before merging.
    </p>
    <p>Enjoy, and feel free to contribute!</p>
  </section>
  <section class="About__prose">
    <h2>About the Author</h2>
    <p>
      I'm a software developer with over 5 years of experience writing code. I'm passionate about
      open source software and love contributing to the community in any way I can. Learn more about
      me <a class="About--link" target="_blank" rel="noopener" href="https://abs.moe"> here </a> :)
    </p>
  </section>
</main>

<!-- <p class="Shimmer">Loading...</p> -->

<style lang="scss">
  .Shimmer {
    --speed: 3s;
    --delay: 0.2s;
    --text-primary: var(--foreground);
    --text-quaternary: var(--subFg-1);

    text-fill-color: transparent;
    animation-delay: var(--delay);
    animation-name: loading-shimmer;
    animation-duration: var(--speed);
    animation-iteration-count: infinite;
    -webkit-text-fill-color: transparent;
    background: var(--text-quaternary)
      gradient(
        linear,
        100% 0,
        0 0,
        from(var(--text-quaternary)),
        color-stop(0.5, var(--text-primary)),
        to(var(--text-quaternary))
      );
    background: var(--text-quaternary)-webkit-gradient(
        linear,
        100% 0,
        0 0,
        from(var(--text-quaternary)),
        color-stop(0.5, var(--text-primary)),
        to(var(--text-quaternary))
      );
    -webkit-background-clip: text;
    background-clip: text;
    background-repeat: no-repeat;
    background-size: 50% 200%;
    display: inline-block;
  }
  @keyframes loading-shimmer {
    0% {
      background-position: -100% 0;
    }
    to {
      background-position: 250% 0;
    }
  }

  .About {
    gap: 48px;
    @include box();
    padding-top: 50px;
    @include make-flex($just: flex-start);

    & > * {
      font-family: 'Inter', sans-serif;
    }

    &--link {
      transition: color 0.2s ease;
      &:hover {
        color: var(--t-crp-link-primary);
      }
    }

    &__LogoBox {
      gap: 20px;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 20px 1fr;

      & > span {
        @include box(20px, 20px);
      }

      &--neko {
        width: 100%;
        max-height: 250px;
        filter: drop-shadow(0px 0px 25px #ffffff33);
      }

      &--sc {
        width: 100%;
        max-width: 220px;
        max-height: 220px;
        border-radius: 50%;
        aspect-ratio: 1 / 1;
      }
    }

    &__header {
      width: 100%;

      &--title {
        width: 100%;
        font-size: 36px;
        font-weight: 700;
      }

      & > p {
        width: 100%;
        font-size: 18px;
        color: var(--subFg-2);
      }
    }

    &__prose {
      gap: 20px;
      width: 100%;
      @include make-flex($align: flex-start);

      & > h2 {
        font-size: 24px;
        font-weight: 600;
      }

      & > p {
        font-size: 16px;
        color: var(--subFg-2);
      }

      & > ul {
        font-size: 16px;
        color: var(--subFg-2);
        padding-inline-start: 26px;

        & > li {
          &::marker {
            color: var(--subFg-1);
          }
        }
      }
    }
  }
</style>
