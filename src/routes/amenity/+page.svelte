<script lang="ts">
  import Food from "$data/amenities/Food.json";
  import Admin from "$data/amenities/Admin.json";
  import Sports from "$data/amenities/Sports.json";
  import Hostel from "$data/amenities/Hostel.json";
  import Academics from "$data/amenities/Academics.json";
  import Essentials from "$data/amenities/Essentials.json";

  import { slide } from "svelte/transition";
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import AmenityFilter from "./AmenityFilter.svelte";
  import AmenityCard from "$components/AmenityCard.svelte";

  let isFilterOpen = false;
  let filters = [
    {
      name: "Academics",
      checked: true,
      icon: 59404,
      data: Academics,
    },
    {
      name: "Admin",
      checked: true,
      icon: 63056,
      data: Admin,
    },
    {
      name: "Essentials",
      checked: true,
      icon: 61900,
      data: Essentials,
    },
    {
      name: "Food",
      checked: true,
      icon: 58732,
      data: Food,
    },
    {
      name: "Hostel",
      checked: true,
      icon: 58682,
      data: Hostel,
    },
    {
      name: "Sports",
      checked: true,
      icon: 60356,
      data: Sports,
    },
  ];

  $: filters.map((item) => item.checked),
    browser &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

  afterNavigate(() => {
    isFilterOpen = false;
  });
</script>

<div class="Amenity__header w-100">
  <h2>Amenities</h2>
  <p>Find all the amenities SNU has to offer</p>
</div>

<main class="Amenity__bottom w-100">
  <AmenityFilter bind:filters bind:isFilterOpen />

  <div class="Amenity__content w-100">
    {#each filters as item}
      {#if item.checked}
        <section transition:slide>
          <h2>
            {item.name}
            <hr />
          </h2>
          <div class="Amenity__cards">
            {#each item.data as cardData}
              <AmenityCard data={cardData} type={item.name} />
            {/each}
          </div>
        </section>
      {/if}
    {/each}
  </div>
</main>

<style lang="scss" src="../../styles/routes/amenity.scss"></style>
