<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<section class="Document__hero">
  <h2>Where's My Document?</h2>
  <p>Find all the documents that you need to get through your time at SNU</p>
</section>

<ul class="Document__content">
  {#each data.documents as document}
    <li class="Document__content--item">
      <a href={document.link} target="_blank" rel="noopener noreferrer">
        {#if document.type === "pdf"}
          <img src="image/icon_pdf.png" alt={document.type} />
        {:else if document.type === "sheet"}
          <img src="image/icon_sheet.png" alt={document.type} />
        {:else if document.type === "doc"}
          <img src="image/icon_doc.png" alt={document.type} />
        {:else}
          <img src="image/icon_default.png" alt={document.type} />
        {/if}
        <div class="gap-5 w-100">
          <h3 class="title">{document.name}</h3>
          <p class="subText">{document.category}</p>
        </div>
      </a>
    </li>
  {/each}
</ul>

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
        color: var(--subText);

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
      margin-top: 30px;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

      &--item {
        min-width: 0;

        & > a {
          padding: 10px;
          border-radius: 10px;
          @include box($height: auto);
          border: 1px solid var(--border);
          box-shadow: var(--buttonShadow);

          gap: 10px;
          display: block;
          text-decoration: none;

          display: grid;
          grid-template-columns: 60px 1fr;
          transition: background-color 0.3s ease-in-out;

          &:hover {
            background-color: var(--buttonHoverBG);
          }

          & > img {
            width: 60px;
            aspect-ratio: 1/1;
          }

          & > div {
            min-width: 0;
            @include make-flex($align: flex-start, $just: space-between);
          }

          .title {
            font-size: 21px;
            font-weight: 700;
            max-width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;

            @include respondAt(380px) {
              white-space: normal;
            }
          }

          .subText {
            font-size: 18px;
            font-weight: 400;
            color: var(--subText);
          }
        }
      }
    }
  }
</style>