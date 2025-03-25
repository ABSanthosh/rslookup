<!-- TODO: fix line spacing for names -->
<script lang="ts">
  import { clipboard } from '$utils/CopyToClipboard';
  import type { LayoutServerData } from '../$types';

  let {
    data
  }: {
    data: LayoutServerData;
  } = $props();
</script>

<svelte:head>
  <title>Clubs</title>
  <meta
    name="description"
    content="Discover Your Campus Crew: Get Acquainted with SNIoE's Club Leaders and Members!"
  />
</svelte:head>

<ul class="Clubs__content">
  {#each data.cultural as club, index (club.name)}
    <li class="Club">
      <div class="Club__header">
        <h2>{club.name}</h2>
        <button
          class="CopyButton"
          title="Click to copy email"
          use:clipboard={{ text: club.email }}
          data-icon={String.fromCharCode(57688)}
        >
          {club.email}
        </button>
        <p>{club.description}</p>
      </div>
      <div class="Club__members">
        {@html `
          <img
            src=${
              club.image === '' ? 'https://generated.vusercontent.net/placeholder.svg' : club.image
            }
            alt=${club.name}
            onerror="this.src='https://generated.vusercontent.net/placeholder.svg'" 
            // loading="lazy" 
          />
        `}
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
    {#if index < data.cultural.length - 1}
      <hr />
    {/if}
  {/each}
</ul>

<style lang="scss">
  @forward '../ClubStyle.scss';
</style>
