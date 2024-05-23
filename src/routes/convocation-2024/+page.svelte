<script lang="ts">
  import AddToCalender from '$components/AddToCalender.svelte';
  import ConvoHeroBottom from '$images/ConvoHeroBottom.jpg';
  import ConvoHeroTop from '$images/ConvoHeroTop.jpg';
  import poster from '$images/poster.jpeg';
  import { onMount } from 'svelte';

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

  const itinerary: Record<
    string,
    {
      title: string;
      startTime: Date;
      endTime: Date;
      description: string;
      maps: { title: string; icon: number; link: string; icsLocation: string }[];
    }[]
  > = {
    '25 May 2024': [
      {
        title: 'Welcome Reception',
        startTime: new Date(2024, 4, 25, 12, 0),
        endTime: new Date(2024, 4, 25, 17, 0),
        description: 'Family members of the graduating batch are checked in to Tower 10',
        maps: [
          {
            title: 'Tower 10',
            icsLocation: 'SNU, Greater Noida, Tower 10',
            icon: 58715,
            link: 'https://maps.app.goo.gl/1C9XMmH1X5gyfnYZ9'
          }
        ]
      },
      {
        title: 'Proud Family Parade',
        startTime: new Date(2024, 4, 25, 18, 0),
        endTime: new Date(2024, 4, 25, 19, 0),
        description:
          'Starting from Tower 10, the parade will go through the campus till University Activity Centre (Close to Parking-1)',
        maps: [
          {
            title: 'Tower 10',
            icon: 58715,
            icsLocation: 'SNU, Greater Noida, Tower 10',
            link: 'https://maps.app.goo.gl/1C9XMmH1X5gyfnYZ9'
          },
          {
            title: 'University Activity Centre',
            icon: 58715,
            icsLocation: 'SNU, Greater Noida, University Activity Centre',
            link: 'https://maps.app.goo.gl/S2EJtAu34hE29jev5'
          },
          {
            title: 'Parking-1',
            icon: 58715,
            icsLocation: 'SNU, Greater Noida, Parking-1',
            link: 'https://maps.app.goo.gl/eE5deBMyivtX6ewb7'
          }
        ]
      },
      {
        title: 'MFA Exhibition',
        startTime: new Date(2024, 4, 25, 10, 0),
        endTime: new Date(2024, 4, 25, 15, 0),
        description:
          'Immerse yourself in a captivating world of artistic expression, where creativity knows no bounds, at a fine art exhibition',
        maps: [
          {
            title: 'Fine Arts Department',
            icon: 58715,
            icsLocation: 'TODO',
            link: 'https://maps.app.goo.gl/1C9XMmH1X5gyfnYZ9'
          }
        ]
      },
      {
        title: 'Visit to Kiran Nadar Museum of Art(KNMA)',
        startTime: new Date(2024, 4, 25, 10, 0),
        endTime: new Date(2024, 4, 25, 15, 0),
        description:
          'Unleash your inner rockstar and sing your heart out with friends at a lively karaoke night!',
        maps: [
          {
            title: 'KNMA',
            icon: 58715,
            icsLocation: 'TODO',
            link: 'https://maps.app.goo.gl/1C9XMmH1X5gyfnYZ9'
          }
        ]
      },
      {
        title: 'Movie Night',
        startTime: new Date(2024, 4, 25, 21, 0),
        endTime: new Date(2024, 4, 25, 23, 0),
        description:
          'Dive into a cinematic journey under the stars with movie night, where stories come alive and memories are made.',
        maps: []
      }
    ],
    '26 May 2024': [
      {
        title: 'Thematic Botanical Garden Walk',
        startTime: new Date(2024, 4, 26, 6, 0),
        endTime: new Date(2024, 4, 26, 11, 0),
        description:
          'Step into a lush world of curated wonder, where flora from around the globe unite in a thematic botanical garden adventure.',
        maps: [
          {
            title: 'Botanical Garden',
            icon: 58715,
            icsLocation: 'SNU, Greater Noida, SNU, Biodiversity Park',
            link: 'https://maps.app.goo.gl/fJofXS1Y7nSyWkWC7'
          }
        ]
      },
      {
        title: 'Mini Golf',
        startTime: new Date(2024, 4, 26, 6, 0),
        endTime: new Date(2024, 4, 26, 9, 0),
        description:
          'Experience the whimsical challenge of mini-golf where every putt is a journey through fun and creativity.',
        maps: [
          {
            title: 'Mini Golf',
            icon: 58715,
            icsLocation: 'SNU, Greater Noida, Breeze arena',
            link: 'https://maps.app.goo.gl/P4fQtbG5kMQR82gY6'
          }
        ]
      },
      {
        title: 'Horse Show',
        startTime: new Date(2024, 4, 26, 6, 30),
        endTime: new Date(2024, 4, 26, 8, 0),
        description:
          'Embark on a majestic journey of equestrian elegance and skill at a captivating horse show.',
        maps: [
          {
            title: 'Horse Show',
            icon: 58715,
            icsLocation: 'SNU, Greater Noida, Horse stables',
            link: 'https://maps.app.goo.gl/THrRTZd7UzwzYrwd8'
          }
        ]
      },
      {
        title: 'Yoga and Meditation',
        startTime: new Date(2024, 4, 26, 7, 0),
        endTime: new Date(2024, 4, 26, 8, 0),
        description:
          'Discover inner peace and strength through the ancient practice of yoga, uniting mind, body, and spirit.',
        maps: [
          {
            title: 'Yoga Room',
            icon: 58715,
            icsLocation: 'SNU, Greater Noida, Yoga Room, Indoor Sports Complex',
            link: 'https://maps.app.goo.gl/5igzEkwR4iVBWMWL7'
          }
        ]
      },
      {
        title: 'Campus Tour',
        startTime: new Date(2024, 4, 26, 7, 0),
        endTime: new Date(2024, 4, 26, 10, 30),
        description:
          'Embark on an immersive journey through our campus, where every corner tells a story of learning, growth, and community.',
        maps: []
      },
      {
        title: 'Convocation Ceremony',
        startTime: new Date(2024, 4, 26, 14, 30),
        endTime: new Date(2024, 4, 26, 17, 30),
        description: `The most coveted ceremony begins at 3:00 PM.
        <ul>
          <li style="margin-left: 20px;">Entry of students, faculty and Chancellor's processions</li>
          <li style="margin-left: 20px;">Address by the Chancellor</li>
          <li style="margin-left: 20px;">Address by the Vice-Chancellor</li>
          <li style="margin-left: 20px;">Convocation speaker Address</li>
          <li style="margin-left: 20px;">Conferring of Honorary Doctorate Degrees</li>
          <li style="margin-left: 20px;">Conferring of Graduation Degrees</li>
          <li style="margin-left: 20px;">Departure of Chancellor's procession</li>
        </ul>
        `,
        maps: [
          {
            title: 'Convocation Arena',
            icon: 58715,
            icsLocation: 'SNU, Greater Noida, Convocation Arena',
            link: 'https://maps.app.goo.gl/TjWc2dsRDZBk846y9'
          }
        ]
      },
      {
        title: 'Graduation Reception',
        startTime: new Date(2024, 4, 26, 19, 0),
        endTime: new Date(2024, 4, 26, 23, 0),
        description:
          'Celebrate this milestone with a gala evening, enjoy photobooths and various activities',
        maps: [
          {
            title: 'University Lawn',
            icon: 58715,
            icsLocation: 'SNU, Greater Noida, University Lawn, Library Building',
            link: 'https://maps.app.goo.gl/8pvG4CeWJVGrXnk68'
          }
        ]
      }
    ]
  };

  const guestSpeakers = [
    {
      name: 'Mr. Abhinav Bindra',
      awards: ['Padma Bhushan', 'Olympic Gold Medalist'],
      role: ['Chief Guest', 'Convocation Speaker'],
      about: 'https://en.wikipedia.org/wiki/Abhinav_Bindra',
      description:
        "India's First Olympic Gold Medallist, Padma Bhushan awardee for excellence in sports. National hero, an inspiration for aspiring athletes.",
      image:
        'https://scontent-del2-2.xx.fbcdn.net/v/t1.6435-9/165280290_296900228497510_5247725121276862244_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=0dL5uM9llFkQ7kNvgHxV5ns&_nc_ht=scontent-del2-2.xx&oh=00_AYDZyRKrjeSCxI3GSE5DaAtAkQtpY6pAuoO2QZqQttHbCQ&oe=667511A5'
    },
    {
      name: 'Wing Commander Rakesh Sharma (Retd.)',
      awards: ['Ashoka Chakra', 'First Indian In Space'],
      role: ['Guest Of Honour', 'Honorary Doctorate Recipient'],
      about: 'https://en.wikipedia.org/wiki/Rakesh_Sharma',
      description:
        "Ashoka Chakra awardee, the first and only Indian to venture into space. His historic journey paved the way for India's space exploration.",
      image: 'https://www.apnapatiala.com/wp-content/uploads/2013/03/AVN-RAKESH-Ji.jpg'
    },
    {
      name: 'Ustad Amjad Ali Khan',
      awards: ['Padma Vibhushan', 'Legendary Sarod Maestro'],
      role: ['Guest Of Honour', 'Honorary Doctorate Recipient'],
      about: 'https://en.wikipedia.org/wiki/Amjad_Ali_Khan',
      description:
        'Legendary Sarod Maestro, Padma Vibhushan awardee, has made profound contributions to Indian classical music, enriched our cultural heritage, and resonates with millions worldwide.',
      image: 'https://assets.mysticamusic.com/images/artist-photos/ustad-amjad-ali-khan.jpg'
    },
    {
      name: 'Ms. Sukla Mistry',
      awards: ['Director (Refineries), IndianOil', 'Outstanding Business Leader'],
      role: ['Guest Of Honour', 'Honorary Doctorate Recipient'],
      about: 'https://www.linkedin.com/in/sukla-mistry-33458149',
      description:
        'Former Director (Refineries) at IndianOil, an exceptional business leader whose visionary leadership in the corporate world has set a high benchmark for excellence and innovation.',
      image:
        'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202202/sukla-mistry_1200-sixteen_nine.jpg'
    },
    {
      name: 'Mr. Krishen Khanna',
      awards: ['Padma Bhushan', 'Distinguished Artist'],
      role: ['Guest Of Honour', 'Honorary Doctorate Recipient'],
      about: 'https://en.wikipedia.org/wiki/Krishen_Khanna',
      description:
        'Padma Bhushan awardee and Distinguished artist, has significantly contributed to the enrichment of Indian art and culture.',
      image:
        'https://static.toiimg.com/imagenext/toiblogs/photo/blogs/wp-content/uploads/2021/07/2016-dsc_0005-resize2048-680x1024.jpg'
    }
  ];

  const setStateToURL = (state: string) => {
    // set 'tab' query in url query params and set it to state
    const url = new URL(window.location.href);
    url.searchParams.set('tab', state);
    window.history.pushState({ path: url.href }, '', url.href);
  };

  $: activeItinerary = Object.keys(itinerary)[0];

  onMount(() => {
    // detect if tab is present in url query params
    const url = new URL(window.location.href);
    const tab = url.searchParams.get('tab');
    if (tab) {
      activeItinerary = tab;
    }
  });
</script>

<svelte:head>
  <title>Convocation 2024</title>
  <meta
    name="description"
    content="Convocation 2024 is a grand event where students are awarded their degrees and the university celebrates their achievements. Find all the details about the event here."
  />
  <meta
    name="keywords"
    content={`convocation, 2024, snu, snioe, graduation, ceremony, event, speakers, itinerary, schedule, guests`}
  />
  <meta name="author" content="Santhosh" />
  <meta name="robots" content="index, follow" />
</svelte:head>

<span id="convocation-2024" style="display: none; visibility: hidden;" />

<main class="ConvoHome">
  <!-- <img
    src={poster}
    alt=""
    style="width: 100%; height: auto; margin-top: 20px; border-radius: 10px"
  /> -->
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

  <section class="ConvoHome__section">
    <h2>Itinerary</h2>
    <ul class="Itinerary__tabs">
      {#each Object.keys(itinerary) as date}
        <li>
          <a
            href={`?tab=${date.replaceAll(' ', '+')}`}
            class="CrispButton"
            on:click={(e) => {
              e.preventDefault();
              activeItinerary = date;
              setStateToURL(date);
            }}
            class:active={activeItinerary === date}
          >
            {date}
          </a>
        </li>
      {/each}
    </ul>
    <ul class="Itinerary">
      {#each itinerary[activeItinerary] as event}
        <div class="Itinerary__event" id={event.title}>
          <span>
            <h4>
              {event.title}
            </h4>
            <div style="display: flex; gap: 10px;">
              <AddToCalender
                name={event.title}
                description={event.description}
                startTime={event.startTime}
                isText={false}
                endTime={event.endTime}
                venueName={event.maps[0]?.icsLocation}
                calenders={['google', 'outlook', 'apple']}
              />
            </div>
          </span>
          <p class="Itinerary__event-time">
            {event.startTime.toLocaleString('en-US', {
              hour12: true,
              hour: '2-digit',
              minute: '2-digit'
            })}{' - '}
            {event.endTime.toLocaleString('en-US', {
              hour12: true,
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <p class="Itinerary__event-description">{@html event.description}</p>
          <ul>
            {#each event.maps as map}
              <li>
                <a
                  href={map.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="CrispButton"
                  data-type="golden"
                >
                  {map.title}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </ul>
  </section>

  <section class="ConvoHome__section">
    <h2>Guest Speakers</h2>
    <ul class="Guest__box">
      {#each guestSpeakers as speaker}
        <li class="Guest">
          <div class="Guest__left">
            <div style="display: flex; gap: 10px; flex-wrap: wrap; ">
              {#each speaker.role as role}
                <span class="Guest-role">
                  {role}
                </span>
              {/each}
            </div>
            <h2>
              {speaker.name}
            </h2>
            <p class="Guest-awards">
              {speaker.awards.join(' • ')}
            </p>
            <p class="Guest-description">
              {speaker.description}
            </p>
            <a
              href={speaker.about}
              target="_blank"
              rel="noopener noreferrer"
              class="CrispButton"
              data-type="golden"
            >
              Know More
            </a>
          </div>
          <div class="Guest__right">
            <img src={speaker.image} alt={speaker.name} />
          </div>
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

  .Itinerary {
    gap: 20px;
    display: grid;
    list-style: none;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

    @include respondAt(415px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    &__tabs {
      gap: 10px;
      width: auto;
      padding: 4px;
      list-style: none;
      max-width: 400px;
      border-radius: 6px;
      @include box(100%, 40px);
      background-color: #ece0e0;
      @include make-flex($dir: row, $just: space-between);

      li {
        @include box();

        a {
          @include box();
          border: none;
          line-height: 1.2;
          padding: 6px 12px;
          border-radius: 4px;
          @include make-flex();
          text-decoration: none;
          box-shadow: none;
          font-family: 'Eczar', serif;
          background-color: transparent;
          padding-top: 10px;
          font-size: 17px;

          &.active {
            background-color: var(--background);
          }
        }
      }
    }

    &__event {
      gap: 10px;
      @include box();
      padding: 20px;
      @include make-flex($just: flex-start, $align: flex-start);
      border: 1px solid var(--t-crp-border);
      border-radius: 8px;
      box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.06);
      & > span {
        gap: 10px;
        width: 100%;
        @include make-flex($dir: row, $just: space-between, $align: flex-start);

        :global(.CrispMenu) {
          --crp-menu-summary-padding: 10px !important;
          --crp-menu-min-width: none !important;
          --crp-menu-width: 34px !important;
          --crp-menu-height: 34px !important;
        }
        & > h4 {
          font-size: 30px;
          font-weight: 500;
        }
      }

      &-description {
        font-size: 18px;
        font-weight: 400;
        line-height: 28px;
      }

      &-time {
        color: var(--subFg-1);
        font-size: 20px;
      }

      ul {
        gap: 10px;
        margin-top: auto;
        padding-top: 20px;
        list-style: none;
        width: 100%;
        flex-wrap: wrap;
        @include make-flex($dir: row, $just: flex-start);

        & > li {
          flex-grow: 1;
          @include make-flex($just: flex-start);

          & > a {
            @include box();
          }
        }
      }
    }
  }

  .Guest {
    gap: 3rem;
    @include box();
    padding: 20px 0;
    display: grid;
    grid-template-columns: 1fr 350px;

    @include respondAt(830px) {
      gap: 20px;
      @include make-flex();
    }

    &__right {
      @include box();
      @include make-flex($just: flex-start, $align: flex-end);
      @include respondAt(830px) {
        order: -1;
        align-items: center;
      }
    }
    &__left {
      gap: 20px;
      @include make-flex($align: flex-start);
      @include respondAt(830px) {
        order: 1;
      }
      & > a {
        margin-top: auto;
      }
    }

    &-role {
      padding: 8px 10px 5px 10px;
      border-radius: 5px;
      background-color: #ece0e0;
    }

    &-awards {
      font-size: 20px;
      line-height: 25px;
      color: var(--subFg-1);
    }

    &__box {
      gap: 30px;
      width: 100%;
      display: grid;
      list-style: none;
      grid-template-rows: repeat(auto-fill, auto);
    }
    img {
      border-radius: 30px;
      aspect-ratio: 1 / 1;
      max-width: 100%;
      @include box(100%, auto);
      object-fit: cover;
      // object-position: top;

      @include respondAt(830px) {
        max-width: 300px;
      }
    }

    h2 {
      font-size: 30px;
      font-weight: 500;
    }

    &-description {
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;

      @include respondAt(420px) {
        text-align: justify;
      }
    }
  }
</style>
