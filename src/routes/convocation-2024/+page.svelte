<script lang="ts">
  import ConvoHeroBottom from '$images/ConvoHeroBottom.jpg';
  import ConvoHeroTop from '$images/ConvoHeroTop.jpg';

  const quickLinks = [
    {
      name: 'Invitation',
      link: 'https://drive.google.com/file/d/1NHYyPMeRZqZhJXxYtpsj1ZlYeKiz7gkw/view?usp=sharing'
    },
    {
      name: 'Guidelines',
      link: 'https://drive.google.com/file/d/1kcWEVolPQrb3YGm6tgZ2NCyo3ZS302dI/view?usp=sharing'
    },
    {
      name: 'Itinerary',
      link: 'https://drive.google.com/file/d/1q_bzXaN-5NSbjqAFCA5WByeri6KtgS5a/view?usp=sharing'
    },
    {
      name: 'Directions to SNIoE',
      link: 'https://maps.app.goo.gl/vyowyQAKKYst37bC7'
    }
  ];
</script>

<span id="convocation-2024" style="display: none; visibility: hidden;" />

<main class="ConvoHome">
  <h1 class="ConvoHome__hero">
    <img src={ConvoHeroTop} alt="Convocation 2024" />
    CONVOCATION 2024
    <img src={ConvoHeroBottom} alt="Convocation 2024" />
  </h1>

  <section class="ConvoHome__section">
    <h2>Quick Links</h2>
    <ul class="ConvoHome__quickLinks">
      {#each quickLinks as { name, link }}
        <li>
          <a
            href={link}
            target="_blank"
            class="CrispButton"
            data-type="golden"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        </li>
      {/each}
    </ul>
  </section>
</main>

<style lang="scss">
  .ConvoHome {
    @include box();
    gap: 20px;
    @include make-flex($just: flex-start);

    & > * {
      line-height: 1;
      font-family: 'Eczar', serif;
    }

    &__hero {
      @include box();
      @include make-flex();
      font-weight: 400;
      line-height: 100px;
      letter-spacing: 10px;
      font-size: 80px;
      text-align: center;
      margin-top: 10px;
      transition:
        font-size 0.3s,
        line-height 0.3s,
        letter-spacing 0.3s,
        margin-top 0.3s;

      @include respondAt(930px) {
        font-size: 60px;
        line-height: 80px;
      }
      // 750
      @include respondAt(750px) {
        font-size: 50px;
        line-height: 70px;
      }
      // 660
      @include respondAt(660px) {
        font-size: 40px;
        line-height: 60px;
      }
      // 500
      @include respondAt(500px) {
        font-size: 30px;
        line-height: 50px;
      }
      // 400
      @include respondAt(400px) {
        font-size: 25px;
        line-height: 40px;
      }
      img {
        @include box(90%, auto);
        @include respondAt(470px) {
          width: 100%;
        }
      }
    }

    &__section {
      @include box();
      padding: 20px 0;
      gap: 20px;
      @include make-flex($just: flex-start, $align: flex-start);

      & > h2 {
        font-family: 'Eczar', serif;
        font-weight: 400;
        font-size: 30px;
        text-align: center;
        margin: 0;
      }
    }

    &__quickLinks {
      gap: 10px;
      list-style: none;
      @include make-flex($dir: row, $just: flex-start);
      flex-wrap: wrap;

      & > li {
        flex-grow: 1;
        @include make-flex($just: flex-start);

        & > a {
          @include box();
        }
      }
    }
  }
</style>
