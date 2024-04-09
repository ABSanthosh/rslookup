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
  <div class="Row--center">
    <figure class="CrispFigure">
      <img src="image/about_meme.png" alt="Silly meme" />
      <figcaption>Silly meme</figcaption>
    </figure>
  </div>
  <div class="About__desc">
    <p>
      This meme pretty much sums up the project. I had a problem, I solved it,
      and I want to share it with everyone else.
    </p>

    <p>
      Now for the validity of the data in the website is accurate to some
      extent. Initially, I, along with 2 of my friends, went to each and every
      room in each academic building and noted down the professor's name and
      room number. Later, I wrote some quick scripts to scrape snu website to
      get all the professor photos. If you noted, on the SNU website,
    </p>
    <ul>
      <li>
        Search feature is very bad: We have fast and fuzzy search so you don't
        even have to know the proper name of the professor.
      </li>
      <li>Almost half of the professors don't have their room number.</li>
    </ul>

    <p>
      Another thing I had to ask around was the details of amenities in the
      campus. Personally, I don't have my hostel warden's phone number or know
      his name or I don't frequent Mahesh enough to know their phone number or
      till when they deliver food. So I had to ask around for these details.
      These are the problems I hope to solve.
    </p>

    <p>
      To keep the data professor updated, I'm working with Student council,
      especially Acad Affairs Secretary. But this isn't sustainable enough in
      the long run. So my goal is to make this a community-driven data hub. In
      the future, I'll be adding a feature where you can suggest edits to the
      data, so that the data is always up-to-date.
    </p>
  </div>
</main>

<style lang="scss">
  .About {
    gap: 25px;
    @include box();
    padding-top: 80px;
    @include make-flex($just: flex-start);

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
      @include make-flex();

      ul {
        list-style-type: disc;
        padding-left: 20px;
        margin-top: 10px;
      }
    }
  }
</style>
