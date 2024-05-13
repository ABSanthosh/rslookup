<script lang="ts">
  import type { PageData } from './$types';
  import NEKO from '$images/neko.webp';
  import icon_pdf from '$images/icon_pdf.png';
  import icon_sheet from '$images/icon_sheet.png';
  import icon_doc from '$images/icon_doc.png';
  import icon_newsletter from '$images/icon_newsletter.png';
  import icon_default from '$images/icon_default.png';

  export let data: PageData;
</script>

<svelte:head>
  <title>Documents</title>
  <meta
    name="description"
    content="Essential Resources at Your Fingertips: Access Crucial Documents"
  />
  <meta
    name="keywords"
    content={`
    documents,
    pdf,
    sheet,
    doc,
    newsletter,
    ${Object.keys(data.documents).join(', ')}
    `}
  />
</svelte:head>

<section class="Document__hero">
  <h2>Where's My Document?</h2>
  <p>Find all the documents that you need to get through your time at SNU</p>
</section>

{#each Object.keys(data.documents) as item}
  <section class="Document__section">
    <h2>
      {item}
      <hr />
    </h2>
    <ul class="Document__content">
      {#each data.documents[item] as document}
        <li class="Document__content--item">
          <a href={document.link} target="_blank" rel="noopener noreferrer">
            {#if document.type === 'pdf'}
              <img src={icon_pdf} alt={document.type} />
            {:else if document.type === 'sheet'}
              <img src={icon_sheet} alt={document.type} />
            {:else if document.type === 'doc'}
              <img src={icon_doc} alt={document.type} />
            {:else if document.type === 'newsletter'}
              <img src={icon_newsletter} alt={document.type} />
            {:else}
              <img src={icon_default} alt={document.type} />
            {/if}
            <div class="gap-5 w-100">
              <h3 class="title">{document.name}</h3>
              <p class="subText">{document.category}</p>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </section>
{/each}

<style lang="scss">
  .Document {
    &__hero {
      @include box();
      padding-top: 80px;
      @include make-flex($just: flex-start);

      @include respondAt(680px) {
        padding: 0;
        margin: 40px 0 30px 0;
        @include make-flex($just: flex-start, $align: flex-start);
      }

      & > h2 {
        font-size: 45px;
        font-weight: 900;

        @include respondAt(500px) {
          font-size: 32px;
        }
      }

      & > p {
        font-size: 20px;
        font-weight: 400;
        color: var(--subFg-1);

        @include respondAt(500px) {
          font-size: 18px;
        }
      }
    }

    &__content {
      gap: 20px;
      width: 100%;
      display: grid;
      list-style: none;
      margin-top: 25px;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

      &--item {
        min-width: 0;

        & > a {
          padding: 10px;
          border-radius: 10px;
          @include box($height: auto);
          box-shadow: var(--t-crp-box-shadow);
          border: 1px solid var(--t-crp-border);

          gap: 10px;
          display: block;
          text-decoration: none;

          display: grid;
          grid-template-columns: 60px 1fr;
          transition: background-color 0.3s ease-in-out;

          &:hover {
            background-color: var(--t-crp-background-hover);
          }

          & > img {
            width: 60px;
            aspect-ratio: 1/1;
          }

          & > div {
            gap: 10px;
            min-width: 0;
            line-height: 1;
            @include make-flex($align: flex-start, $just: flex-start);
          }

          .title {
            width: 100%;
            font-size: 21px;
            max-width: 100%;
            font-weight: 700;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            @include respondAt(380px) {
              white-space: normal;
            }
          }

          .subText {
            font-size: 18px;
            font-weight: 400;
            color: var(--subFg-1);
          }
        }
      }
    }

    &__section {
      @include box();
      padding-top: 40px;
      @include make-flex($just: flex-start);

      @include respondAt(680px) {
        padding: 0;
        margin: 30px 0 0px 0;
        @include make-flex($just: flex-start, $align: flex-start);
      }

      & > h2 {
        gap: 10px;
        white-space: nowrap;
        @include box($height: auto);
        @include make-flex($dir: row, $just: flex-start);

        & > hr {
          border: none;
          @include box(100%, 1px);
          background: var(--t-crp-light-border);
        }
      }
    }
  }
</style>
