<script lang="ts">
  import MapsSelector from '$utils/MapsSelector';
  import WHATSAPP from '$images/logo-whatsapp.png';
  import type { IHostel } from '$types/Amenity.types';
  import { clipboard } from '$utils/CopyToClipboard';

  const data: IHostel = $props();
</script>

<div class="AmenityCard">
  <div class="Col--a-start gap-10 w-100">
    <h3 class="AmenityCard--title">{data.name}</h3>
    <span class="AmenityCard--subTitle">{data.warden}</span>
    {#if data.phone !== ''}
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
          {data.phone}
        </a>
      </div>
    {/if}
    {#if data.mail}
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
  <div class="Row--j-end gap-10 w-100">
    {#if data.whatsapp !== '' && data.phone !== ''}
      <a
        target="_blank"
        rel="noopener noreferrer"
        class="CrispButton AmenityCard__bottom--whatsapp"
        href={`https://wa.me/${data.phone.replace(/\D/g, '')}`}
      >
        <img src={WHATSAPP} alt="WhatsApp" />
        WhatsApp
      </a>
    {/if}
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
