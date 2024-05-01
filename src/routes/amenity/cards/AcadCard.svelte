<script lang="ts">
  import type { IAcademics } from '$types/Amenity.types';
  import MapsSelector from '$utils/MapsSelector';
  export const data = $$props as IAcademics;
</script>

<div class="AmenityCard">
  <h3>{data.name}</h3>
  <a
    class="CrispButton AmenityCard__bottom--map"
    data-icon={String.fromCharCode(58715)}
    href={MapsSelector(data.lat, data.lng)}
    target="_blank"
    rel="noopener noreferrer"
  >
    Map
  </a>
</div>

<style lang="scss">
  .AmenityCard {
    gap: 20px;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    border: 1px solid var(--t-crp-border);
    background: var(--prof-card-background-color);
    @include make-flex($dir: row, $just: space-between);

    &__bottom {
      margin-top: auto;
      @include box($height: fit-content);
      @include make-flex($just: flex-end, $align: flex-end);
      &--map {
        text-decoration: none;
        background: var(--prof-card-background-color);
      }
    }
  }
</style>
