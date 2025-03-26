<script lang="ts">
  import type { IAdmin } from '$types/Amenity.types';
  import { clipboard } from '$utils/CopyToClipboard';

  const data: IAdmin = $props();
</script>

<div class="AmenityCard">
  <div class="Col--a-start gap-10 w-100">
    <h3 class="AmenityCard--title">{data.name}</h3>
    <span class="AmenityCard--subTitle">{data.func}</span>
    {#if data.phone !== ''}
      <div class="AmenityCard__separator">
        <span class="AmenityCard__separator--icon" data-icon="call"> Phone </span>
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
        <span class="AmenityCard__separator--icon" data-icon="mail"> Mail </span>
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
</div>

<style lang="scss">
  @forward './AmenityCardBase.scss';
</style>
