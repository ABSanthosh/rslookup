<script lang="ts">
  import type { PageData } from "./$types";
  import copyToClipboard from "$utils/CopyToClipboard";
  export let data: PageData;
</script>

<svelte:head>
  <title>Clubs</title>
  <meta name="description" content="Discover Your Campus Crew: Get Acquainted with SN IoE's Club Leaders and Members!" />
</svelte:head>

<section class="Clubs__hero">
  <h2>What are the clubs?</h2>
  <p>
    Discover Your Campus Crew: Get Acquainted with SN IoE's Club Leaders and
    Members!
  </p>
</section>

<ul class="Clubs__content">
  {#each data.clubs as club, index}
    <li class="Club">
      <div class="Club__header">
        <h2>{club.name}</h2>
        <a
          href={"#"}
          data-icon={String.fromCharCode(57688)}
          on:keydown={async () => await copyToClipboard(club.email)}
          on:keyup={async () => await copyToClipboard(club.email)}
          on:keypress={async () => await copyToClipboard(club.email)}
          on:click={async () => await copyToClipboard(club.email)}
          title="Click to copy email"
        >
          {club.email}
        </a>
        <p>{club.description}</p>
      </div>
      <div class="Club__members">
        {@html `
          <img
            src=${
              club.image === ""
                ? "https://generated.vusercontent.net/placeholder.svg"
                : club.image
            }
            alt=${club.name}
            onerror="this.src='https://generated.vusercontent.net/placeholder.svg'" 
            // loading="lazy" 
          />
        `}
        <!-- <img
          src={club.image === ""
            ? "https://generated.vusercontent.net/placeholder.svg"
            : club.image}
          alt={club.name}
        /> -->
        <ul>
          {#each club.roles as member}
            <li>
              <h3>
                {member.name}
              </h3>
              <p>{member.position}</p>
            </li>
          {/each}
        </ul>
      </div>
    </li>
    {#if index < data.clubs.length - 1}
      <hr />
    {/if}
  {/each}
</ul>

<style lang="scss">
  .Clubs {
    &__hero {
      @include make-flex($just: flex-start, $align: flex-start);
      margin: 40px 0 30px 0;
      gap: 10px;
      width: 100%;

      & > h2 {
        font-size: 40px;
        font-weight: 900;
        color: var(--foreground);
      }

      & > p {
        font-size: 20px;
        font-weight: 400;
        color: var(--subText);
      }
    }

    &__content {
      gap: 30px;
      @include make-flex();
      margin-bottom: 150px;
      @include box(100%, auto);

      hr {
        width: 90%;
        border: 1px solid var(--lightBorder);
      }

      .Club {
        @include box(100%, auto);
        @include make-flex($just: flex-start);
        gap: 30px;
        @include make-flex($dir: column, $just: flex-start);

        &__header {
          gap: 10px;
          @include box(100%, auto);
          @include make-flex($dir: column, $align: flex-start);

          & > h2 {
            font-size: 30px;
            font-weight: 900;
            color: var(--foreground);
          }

          & > p {
            font-size: 20px;
            font-weight: 400;
            color: var(--subText);
          }

          & > a {
            gap: 6px;
            cursor: pointer;
            @include make-flex($dir: row, $just: flex-start, $align: flex-end);
            overflow: hidden;

            &:hover {
              text-decoration: underline;
            }

            &::before {
              height: 18px;
            }
          }
        }

        &__members {
          gap: 100px;
          width: 100%;
          @include make-flex($dir: row, $just: space-between);

          @include respondAt(830px) {
            gap: 30px;
          }

          @include respondAt(770px) {
            flex-direction: column;
          }

          :global(img) {
            @include box(50%, 50%);
            max-width: 305px;
            border-radius: 10px;
            aspect-ratio: 1/1;
            object-fit: contain; // TODO: change to cover after making proper images
            object-position: center;
            border: 2px solid var(--border);
          }

          & > ul {
            gap: 20px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            @include box();
            // @include make-flex($dir: column, $align: flex-start);

            @include respondAt(430px) {
              grid-template-columns: 1fr;
            }

            li {
              gap: 8px;
              @include make-flex(
                $dir: column,
                $align: flex-start,
                $just: space-between
              );

              h3 {
                font-size: 24px;
                font-weight: 800;
                color: var(--foreground);
              }

              p {
                font-size: 18px;
                font-weight: 400;
                color: var(--subText);
              }
            }
          }
        }
      }
    }
  }
</style>
