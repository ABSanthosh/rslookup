<script lang="ts">
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';
  import AmenityFilter from './AmenityFilter.svelte';
  import type { PageData } from './$types';
  import type {
    IAcademics,
    IAdmin,
    IEssentials,
    IFood,
    IHostel,
    ISport
  } from '$types/Amenity.types';
  import HostelCard from './cards/HostelCard.svelte';
  import AcadCard from './cards/AcadCard.svelte';
  import AdminCard from './cards/AdminCard.svelte';
  import EssentialsCard from './cards/EssentialsCard.svelte';

  let { data }: { data: PageData } = $props();

  let isFilterOpen = $state(false);
  let filters: {
    name: string;
    checked: boolean;
    icon: string;
    data: IHostel[] | IAcademics[] | IAdmin[] | IEssentials[] | IFood[] | ISport[];
  }[] = $state([
    {
      name: 'Hostel',
      checked: true,
      icon: "hotel",
      data: data.Hostel
    },
    {
      name: 'Academics',
      checked: true,
      icon: "school",
      data: data.Academics
    },
    {
      name: 'Admin',
      checked: true,
      icon: "shield_person",
      data: data.Admin
    },
    {
      name: 'Essentials',
      checked: true,
      icon: "local_mall",
      data: data.Essentials
    },
    {
      name: 'Food',
      checked: true,
      icon: "restaurant",
      data: data.Food
    },
    {
      name: 'Sports',
      checked: true,
      icon: "pool",
      data: data.Sports
    }
  ]);

  $effect(() => {
    filters.map((item) => item.checked),
      browser &&
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
  });
  afterNavigate(() => {
    isFilterOpen = false;
  });
</script>

<svelte:head>
  <title>Amenities</title>
  <meta name="description" content="Find all the amenities SNU has to offer" />
</svelte:head>

<div class="Amenity__header w-100">
  <h2>Amenities</h2>
  <p>Find all the amenities SNU has to offer</p>
</div>

<main class="Amenity__bottom w-100">
  <AmenityFilter bind:filters bind:isFilterOpen />

  <div class="Amenity__content w-100">
    {#each filters as item (item.name)}
      {#if item.checked}
        <section>
          <h2>
            {item.name}
            <hr />
          </h2>
          <div class="Amenity__cards">
            {#each item.data as cardData}
              {#if item.name === 'Hostel'}
                <HostelCard {...cardData as IHostel} />
              {:else if item.name === 'Academics'}
                <AcadCard {...cardData as IAcademics} />
              {:else if item.name === 'Admin'}
                <AdminCard {...cardData as IAdmin} />
              {:else if item.name === 'Essentials'}
                <EssentialsCard {...cardData as IEssentials} />
              {:else if item.name === 'Food'}
                <EssentialsCard {...cardData as IEssentials} />
              {:else if item.name === 'Sports'}
                <AcadCard {...cardData as ISport} />
              {/if}
            {/each}
          </div>
        </section>
      {/if}
    {/each}
  </div>
</main>

<style lang="scss">
  .Amenity {
    &__header {
      gap: 10px;
      margin: 40px 0 30px 0;
      @include make-flex($align: flex-start);

      & > h2 {
        font-size: 40px;
        font-weight: 900;
        color: var(--foreground);
      }

      & > p {
        font-size: 20px;
        font-weight: 400;
        color: var(--subFg-1);
      }
    }

    &__bottom {
      gap: 24px;
      @include make-flex($dir: row, $align: flex-start);

      @include respondAt(630px) {
        flex-direction: column;
      }
    }

    &__content {
      gap: 30px;
      @include make-flex($just: flex-start);

      & > section {
        gap: 15px;
        // margin-bottom: 30px;
        color: var(--foreground);
        @include box($height: auto);
        @include make-flex($just: flex-start, $align: flex-start);

        & > h2 {
          gap: 10px;
          @include box($height: auto);
          @include make-flex($dir: row, $just: flex-start);

          & > hr {
            border: none;
            @include box(100%, 1px);
            background: var(--lab-item-separator);
          }
        }
      }
    }

    &__cards {
      gap: 15px;
      display: grid;
      @include box();
      grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));

      @include respondAt(390px) {
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      }
    }
  }
</style>
