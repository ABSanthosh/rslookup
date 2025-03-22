<script lang="ts">
  import type { IAdmin } from '$types/Amenity.types';
  import copyToClipboard from '$utils/CopyToClipboard';

  const data: IAdmin = $props();
</script>

<div class="AmenityCard">
  <div class="Col--a-start gap-10 w-100">
    <h3 class="AmenityCard--title">{data.name}</h3>
    <span class="AmenityCard--subTitle">{data.func}</span>
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
          onkeydown={async () => await copyToClipboard(data.phone)}
          onkeyup={async () => await copyToClipboard(data.phone)}
          onkeypress={async () => await copyToClipboard(data.phone)}
          onclick={async () => await copyToClipboard(data.phone)}
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
          onkeydown={async () => await copyToClipboard(data.mail)}
          onkeyup={async () => await copyToClipboard(data.mail)}
          onkeypress={async () => await copyToClipboard(data.mail)}
          onclick={async () => await copyToClipboard(data.mail)}
        >
          {data.mail}
        </a>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import './AmenityCardBase.scss';
</style>
