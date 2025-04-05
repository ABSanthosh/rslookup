<script lang="ts">
  import MapsSelector from '$utils/MapsSelector';
  import WeekDays from '$components/WeekDays.svelte';
  import { clipboard } from '$utils/CopyToClipboard';
  import type { IEssentials } from '$types/Amenity.types';

  const data: IEssentials = $props();
</script>

<div class="AmenityCard">
  <div class="Col--a-start gap-15 w-100">
    <h3 class="AmenityCard--title">{data.name}</h3>
    {#if data['time.from'] !== '' && data['time.to'] !== ''}
      <div class="AmenityCard__separator">
        <span class="AmenityCard__separator--icon" data-icon="schedule"> Time </span>
        <hr />
        <span class="AmenityCard__separator--content">
          {data['time.from']} - {data['time.to']}
        </span>
      </div>
    {/if}
    {#if data.MO && data.TU && data.WE && data.TH && data.FR && data.SA && data.SU && data.MO !== 'FALSE' && data.TU !== 'FALSE' && data.WE !== 'FALSE' && data.TH !== 'FALSE' && data.FR !== 'FALSE' && data.SA !== 'FALSE' && data.SU !== 'FALSE'}
      <div class="AmenityCard__separator">
        <span class="AmenityCard__separator--icon" data-icon="calendar_today"> Days </span>
        <hr />
        <WeekDays
          days={{
            MO: data.MO === 'TRUE' ? true : false,
            TU: data.TU === 'TRUE' ? true : false,
            WE: data.WE === 'TRUE' ? true : false,
            TH: data.TH === 'TRUE' ? true : false,
            FR: data.FR === 'TRUE' ? true : false,
            SA: data.SA === 'TRUE' ? true : false,
            SU: data.SU === 'TRUE' ? true : false
          }}
        />
      </div>
    {/if}
    {#if data.phone !== ''}
      {#each data.phone.split(',') as item}
        <div class="AmenityCard__separator">
          <span class="AmenityCard__separator--icon" data-icon="call"> Phone </span>
          <hr />
          <a
            role="button"
            title="Copy phone number"
            href={'tel:' + data.phone}
            use:clipboard={{ text: data.phone }}
            class="CopyButton AmenityCard__separator--content"
          >
            {item.trim()}
          </a>
        </div>
      {/each}
    {/if}
    {#if data.mail !== ''}
      <div class="AmenityCard__separator">
        <span class="AmenityCard__separator--icon" data-icon="mail"> Mail </span>
        <hr />
        <a
          role="button"
          title="Copy phone number"
          href={'mail:' + data.mail}
          use:clipboard={{ text: data.mail }}
          class="CopyButton AmenityCard__separator--content"
        >
          {data.mail}
        </a>
      </div>
    {/if}
  </div>
  {#if data.description && data.description !== ''}
    <p class="AmenityCard--desc">
      {data.description}
    </p>
  {/if}
  <div class="AmenityCard__bottom">
    <a
      data-icon="map"
      target="_blank"
      rel="noopener noreferrer"
      href={MapsSelector(data.lat, data.lng)}
      class="CrispButton AmenityCard__bottom--map"
    >
      Map
    </a>
  </div>
</div>

<style lang="scss">
  @forward './AmenityCardBase.scss';
</style>
