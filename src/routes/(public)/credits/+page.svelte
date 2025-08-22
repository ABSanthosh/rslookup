<script lang="ts">
  import type { PageData } from './$types';
  import { fancyDate } from '$utils/calendarEvent';
  import userNamePlaceholder from '$utils/userNamePlaceholder';

  let {
    data
  }: {
    data: PageData;
  } = $props();
</script>

<section class="Credits__hero">
  <h2>Credits</h2>
  <p>Know all the people who helps to make this website run smoothly.</p>
</section>

<ul class="Credits__content">
  {#each data.maintainers as item}
    <li class="Credit">
      <span class="Credit__col Credit__profile">
        <h2>
          {userNamePlaceholder(item.name)}
        </h2>
        {@html `
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            onerror="this.style.visibility = 'hidden'" 
            loading="lazy" />
          `}
      </span>
      <span class="Credit__col Credit__header">
        <h3>{item.name}</h3>
        <p>{item.role}</p>
      </span>
      <ul class="Credit__changes">
        {#each item.changes as change}
          <li class="Credit__col">
            <span>{fancyDate(change.date)}</span>
            <span>{change.description}</span>
          </li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>

<section class="Credits__subHero">
  <h3>Contributors</h3>
  <p>All the people who has contributed to the website in some way</p>
</section>

<ul class="Credits__contributors">
  {#each data.contributors as item}
    <div class="Contributor" title={item.changes.map((change) => change.description).join('\n')}>
      <span class="Credit__col Credit__profile">
        <h2>
          {userNamePlaceholder(item.name)}
        </h2>
        {@html `
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            onerror="this.style.visibility = 'hidden'" 
            loading="lazy" />
          `}
      </span>
      <span class="Credit__col Credit__header">
        <h3>{item.name}</h3>
        <p>{item.role}</p>
      </span>
    </div>
  {/each}
</ul>

<style lang="scss">
  .Credits {
    &__content {
      @include box();
      @include make-flex();
    }

    &__hero {
      margin: 0px 0 50px 0;

      & > h2 {
        font-size: 45px;
        font-weight: 900;

        @include respondAt(500px) {
          font-size: 32px;
        }
      }

      @include respondAt(680px) {
        padding: 0;
        margin: 40px 0 30px 0;
        @include make-flex($just: flex-start, $align: flex-start);
      }

      @include respondAt(430px) {
        margin: 40px 0 0px 0;
      }
    }

    &__subHero {
      margin: 0px 0 20px 0;
      & > h3 {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
      }
    }

    &__subHero,
    &__hero {
      @include box();
      padding-top: 80px;
      @include make-flex($just: flex-start);

      & > p {
        font-size: 20px;
        font-weight: 400;
        text-align: center;
        color: var(--subFg-1);

        @include respondAt(500px) {
          font-size: 18px;
        }
      }
    }

    &__contributors {
      @include box();
      @include make-flex($dir: row);

      gap: 15px;
      flex-wrap: wrap;
      margin-bottom: 50px;
    }
  }

  .Credit {
    gap: 15px;
    width: 100%;
    display: grid;
    min-height: 50px;
    grid-template-columns: 35px 140px 1fr;
    grid-template-areas: 'profile header changes';

    &:not(:first-child) {
      border-top: 1px solid var(--credits-border);
    }

    @include respondAt(660px) {
      row-gap: 0;
      column-gap: 10px;
      padding-top: 20px;
      grid-template-columns: 35px 1fr;
      grid-template-areas:
        'profile header'
        'changes changes';
    }

    &__profile {
      gap: 10px;
      grid-area: profile;
      aspect-ratio: 1 / 1;
      @include make-flex();
      padding: 10px 0 10px 0;
      @include box(35px, 55px);

      :global(img) {
        max-width: 35px;
        aspect-ratio: 1/1;
        object-fit: cover;
        position: absolute;
        border-radius: 50%;
        object-position: top;
        @include box(100%, auto);
      }

      h2 {
        margin: 0;
        font-size: 14px;
        font-weight: 700;
        border-radius: 50%;
        @include make-flex();
        @include box(35px, 35px);
        text-transform: uppercase;
        color: var(--grayPrimary);
        border: 1px solid var(--t-crp-border);
        background-color: var(--graySecondary);
      }
    }

    &__header {
      gap: 6px;
      min-height: 50px;
      grid-area: header;
      height: fit-content;
      padding: 10px 0 10px 0;
      @include make-flex($align: flex-start, $just: flex-start);

      & > h3 {
        line-height: 1.4;
        font-size: 16px;
        font-weight: 400;
      }

      & > p {
        margin: 0;
        line-height: 1;
        font-size: 13px;
        font-weight: 300;
        color: var(--subFg-1);
      }
    }

    &__changes {
      list-style: none;
      grid-area: changes;
      & > li {
        gap: 10px;
        display: grid;
        padding: 10px 0 10px 0;
        grid-template-columns: 110px 1fr;

        @include respondAt(430px) {
          grid-template-columns: 1fr;
          grid-template-rows: auto 1fr;
        }

        &:not(:last-child) {
          border-bottom: 1px solid var(--credits-border);
        }

        & > span {
          font-size: 16px;
          white-space: pre-line;
          @include make-flex($align: flex-start, $just: flex-start);

          &:first-child {
            color: var(--subFg-1);
          }
        }
      }
    }
  }

  .Contributor {
    @include box(auto);
    gap: 15px;
    @include make-flex($dir: row);
    border-radius: 50px;
    padding: 0px 20px 0 10px;
    border: 1px solid var(--credits-border);

    @include respondAt(450px) {
      flex-grow: 1;
      justify-content: flex-start;
    }
  }
</style>
