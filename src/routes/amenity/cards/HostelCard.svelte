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
        <span class="AmenityCard__separator--icon" data-icon={String.fromCharCode(57520)}>
          Phone
        </span>
        <hr />
        <a
          role="button"
          href={'tel:' + data.phone}
          title="Copy phone number"
          class="CopyButton AmenityCard__separator--content"
          use:clipboard={{ text: data.phone }}
        >
          {data.phone}
        </a>
      </div>
    {/if}
    {#if data.mail}
      <div class="AmenityCard__separator">
        <span class="AmenityCard__separator--icon" data-icon={String.fromCharCode(57688)}>
          Mail
        </span>
        <hr />
        <a
          role="button"
          href={'mail:' + data.mail}
          title="Copy phone number"
          class="CopyButton AmenityCard__separator--content"
          use:clipboard={{ text: data.mail }}
        >
          {data.mail}
        </a>
      </div>
    {/if}
  </div>
  <div class="Row--j-end gap-10 w-100">
    {#if data.whatsapp !== ''}
      <a
        class="CrispButton AmenityCard__bottom--whatsapp"
        href={data.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={WHATSAPP} alt="WhatsApp" />
        WhatsApp
      </a>
    {/if}
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
</div>

<style lang="scss">
  @forward './AmenityCardBase.scss';
</style>
