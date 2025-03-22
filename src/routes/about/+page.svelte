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
      rslookup is a platform to find resources that students of SNIoE might need in their day to day
      life.
    </p>
  </div>
  <section class="About__prose">
    <h2>What is rslookup?</h2>
    <p>
      <a class="About--link" href="https://rslookup.abs.moe"> rslookup </a> is a platform to find resources
      such as documents, professor details, lab locations, amenities and much more that students of SNIoE
      might need in their day to day life. The goal of the site is to be your first stop when you need
      to know about anything in the college.
    </p>
  </section>
  <section class="About__prose">
    <h2>How did rslookup get started?</h2>
    <p>
      This project started as a personal passion project on Sep 27, 2023 after I missed an office
      hour with a professor because I couldn't find the location of the office. He did not have it
      in his email signature or in the course handout, nor is mentioned in the SNU website. So I
      went through each academic building to find his office but couldn't find it.
    </p>
    <p>
      I've always liked the idea of open and free software, given that almost everything needed to
      build a website is available for free and I've always wanted to leave a mark in the university
      that I spent 4 years in.
    </p>
    <p>
      Although its a very important information, it is not available in the college website. So I
      thought of creating a platform where students can find all the information they need in one
      place.
    </p>
  </section>

  <section class="About__prose">
    <h2>Where's the data coming from?</h2>
    <p>
      Initially, the vision for the project was to make the website crowd sourced, where students
      can add resources that they find useful. But due to the lack of time and resources, I had to
      think of another way to keep the data up to date.
    </p>
    <div class="Row--center w-100">
      <div class="About__LogoBox">
        <img alt="hero neko gif" class="About__LogoBox--neko" src={NEKO} />
        <span data-icon={String.fromCharCode(58829)}></span>
        <img alt="Student Council" class="About__LogoBox--sc" src={STUDENT_COUNCIL} />
      </div>
    </div>
    <p>
      Where else to get the most accurate and up to date information than the Student Council? The
      Student Council is the governing body of the students in the college and they have access to
      all the information that students might need.
    </p>
    <p>
      After signing a <a
        rel="noopener"
        target="_blank"
        class="About--link"
        href="https://docs.google.com/document/d/1yQAr8-4FiogjW7E-wyhhlZvXNPnI4LpLCgL78VxbYxk/edit?usp=sharing"
      >
        Memorandum of Understanding
      </a>
      with the 2024-25 Student Council, I was able to strike a deal with them to use the website as a
      platform to host all the resources that they initially was sharing with the students through linktree.
      Check out the <a class="About--link" href="/resources">Credits</a> page to see the people who are
      maintaining the data.
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
      If you have any suggestions for features that you think will be useful to others, feel free to
      make an
      <a class="About--link" href="https://github.com/ABSanthosh/rslookup/issues/new"> issue </a>
      in the github or fill in this
      <a class="About--link" href="https://forms.gle/ELq8hJq6m8ZcTrLA8">form</a>. You can also
      contribute by suggesting new categories or improving the website. The source code is available
      on GitHub. All the code changes will be reviewed by the website PoC and Student Council PoCs
      before merging.
    </p>
    <p>Enjoy and feel free to contribute!</p>
  </section>

  <section class="About__prose">
    <h2>About the Author</h2>
    <p>
      I'm a software developer and I've been building writing code for over 5 years. I'm passionate
      about open source software and I love to contribute to the community in any way I can. Know
      more about me <a class="About--link" target="_blank" rel="noopener" href="https://abs.moe">
        here
      </a> :)
    </p>
  </section>
</main>

<style lang="scss">
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
        max-height: 220px;
        max-width: 220px;
        border-radius: 50%;
        aspect-ratio: 1 / 1;
      }
    }

    &__header {
      width: 100%;

      &--title {
        font-size: 36px;
        width: 100%;
        font-weight: 700;
      }

      & > p {
        font-size: 18px;
        width: 100%;
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
        text-align: justify;
        color: var(--subFg-2);
      }

      & > ul {
        font-size: 16px;
        text-align: justify;
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
