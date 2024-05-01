<script lang="ts">
  import copyToClipboard from '$utils/CopyToClipboard';
  import type { PageData } from './$types';

  export let data: PageData;

  let profile = (name: string) =>
    name
      .match(/(\b\S)?/g)!
      .join('')
      .match(/(^\S|\S$)?/g)!
      .join('')
      .toUpperCase();
</script>

<svelte:head>
  <title>Student Council</title>
  <meta
    name="description"
    content="Meet the Faces Behind Your Voice: Get to Know the Members of the Student Council!"
  />
</svelte:head>

<section class="SC__hero">
  <h2>Who's in Student Council?</h2>
  <p>Your Advocates, Your Voice: Meet the Team Addressing Student Concerns at SNIoE.</p>
</section>

<ul class="SC__members">
  {#each data.studentCouncil as member}
    <li class="SC__members--item">
      <span class="SC__members--profileBox">
        <h2>
          {profile(member.name)}
        </h2>
        {@html `
					<img 
						src="${member.img}" 
						alt="${member.name}" 
						onerror="this.style.visibility = 'hidden'" 
						loading="lazy" 
						"/>
					`}
      </span>
      <h3>
        {member.name}
      </h3>
      <p>
        {member.position}
      </p>
      <button
        class="CopyButton"
        data-icon={String.fromCharCode(57688)}
        on:keydown={async () => await copyToClipboard(member.email)}
        on:keyup={async () => await copyToClipboard(member.email)}
        on:keypress={async () => await copyToClipboard(member.email)}
        on:click={async () => await copyToClipboard(member.email)}
        title="Click to copy email"
      >
        {member.email}
      </button>
    </li>
  {/each}
</ul>

<style lang="scss">
  .SC {
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

    &__members {
      gap: 20px;
      width: 100%;
      display: grid;
      margin-top: 60px;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));

      @include respondAt(680px) {
        margin-top: 0;
      }

      @include respondAt(520px) {
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      }

      &--profileBox {
        gap: 10px;
        position: relative;
        aspect-ratio: 1 / 1;
        @include box(100%, auto);
        @include make-flex($dir: column, $just: flex-start, $align: flex-start);

        & > h2 {
          object-fit: cover;
          border-radius: 50%;
          aspect-ratio: 1 / 1;
          @include box(100%, auto);
          @include make-flex();
          font-size: 40px;
          color: var(--grayPrimary);
          border: 1px solid var(--grayPrimary);
          background-color: var(--graySecondary);
        }

        :global(img) {
          top: 0;
          right: 0;
          object-fit: cover;
          border-radius: 50%;
          position: absolute;
          aspect-ratio: 1 / 1;
          @include box(100%, auto);
        }
      }

      &--item {
        gap: 12px;
        @include box();
        padding: 25px;
        @include make-flex($just: space-between);

        // & > img {
        // }

        & > h3 {
          font-size: 24px;
          font-weight: 800;
          text-align: center;
        }

        & > p {
          font-size: 18px;
          font-weight: 400;
          color: var(--subFg-1);
          text-align: center;
        }
      }
    }
  }
</style>
