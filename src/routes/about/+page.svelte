<svelte:head>
  <title>About rslookup</title>
  <meta name="description" content="What is rslookup?" />
</svelte:head>

<main class="About">
  <div class="About__title">
    <h1>
      What is <em> rslookup </em>
    </h1>
    <span>
      rs-lookup or resource lookup, kinda like
      <a
        target="_blank"
        class="FancyLink"
        data-type="Bracket"
        rel="noopener noreferrer"
        href="https://en.wikipedia.org/wiki/Nslookup"
      >
        nslookup
      </a>
    </span>
  </div>
  <div class="About__LogoBox">
    <img
      alt="hero neko gif"
      class="About__LogoBox--neko"
      src="/assets/images/neko.gif"
    />
    <span data-icon={String.fromCharCode(58829)} />
    <img
      alt="Student Council"
      class="About__LogoBox--sc"
      src="assets/images/student_council.jpg"
    />
  </div>

  <div class="About__desc">
    <h3>
      <hr />
      rslookup
      <hr />
    </h3>
    <p>
      I've been in SNU campus for 2 years now and I've always had to ask around
      for many things that should've been easily accessible. For example, I had
      to run rush through all floors of all 4 academic buildings to find a
      professor's room before his office hours ended(I did not find it in time).
      Sometimes professors add their room number in the course handout, but not
      always.
    </p>
    <p>
      Similarly, I had to ask around for Mahesh's phone number or till when they
      deliver food. Although its not a big deal, it would've been nice to have
      everything in one place. So I decided to make this website to solve these
      problems for me and for others.
    </p>

    <div class="Row--center">
      <figure class="CrispFigure">
        <img src="assets/images/about_meme.png" alt="Silly meme" />
        <figcaption>Silly meme</figcaption>
      </figure>
    </div>

    <p>
      Now for the validity of the data in the website is accurate to some
      extent. Initially, I, along with 2 of my friends, went to each and every
      room in each academic building and noted down the professor's name and
      room number. Later, I wrote some quick scripts to scrape SNU website to
      get all the professor photos.
    </p>

    <p>
      Another thing I had to ask around was the details of amenities in the
      campus. Personally, I don't have my hostel warden's phone number or know
      his name or I don't frequent Mahesh enough to know their phone number or
      till when they deliver food. So I had to ask around for these details.
      These are the problems I hope to solve.
    </p>
  </div>

  <div class="About__desc">
    <h3>
      <hr />
      Student Council
      <hr />
    </h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ratione
      sunt excepturi veritatis porro hic itaque asperiores laborum cupiditate
      ipsum adipisci aut laboriosam at! Minima unde maiores perferendis aut!
      Eius!
    </p>
  </div>
</main>

<style lang="scss">
  .About {
    gap: 25px;
    @include box();
    padding-top: 80px;
    @include make-flex($just: flex-start);

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
    &__title {
      width: 100%;

      & > h1 {
        font-size: 48px;
        font-weight: 700;

        & > em {
          font-size: 48px;
          line-height: 100%;
          font-style: italic;
          margin-bottom: 5px;

          text-decoration: none;
          color: var(--foreground);
          font-family: "Fraunces", serif;
          font-variation-settings: "SOFT" 80, "WONK" 0;
        }
      }

      & > span {
        font-size: 22px;
        font-weight: 400;
        font-style: italic;
        color: var(--subText);
      }
    }

    figure {
      img {
        max-height: 500px;
        max-width: 100%;
      }
    }

    &__desc {
      gap: 20px;
      font-size: 22px;
      font-weight: 400;
      width: 100%;
      @include make-flex();

      & > h3 {
        gap: 15px;
        white-space: nowrap;
        @include box($height: auto);
        @include make-flex($dir: row, $just: flex-start);

        & > hr {
          background: var(--LabSeparator);
          @include box(100%, 1px);
          border: none;
        }
      }

      // ul {
      //   list-style-type: disc;
      //   padding-left: 20px;
      //   margin-top: 10px;
      // }
    }
  }
</style>
