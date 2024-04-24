<script lang="ts">
	import type { IAdmin } from '$types/Amenity.types';
	import copyToClipboard from '$utils/CopyToClipboard';

	export const data = $$props as IAdmin;
</script>

<div class="AmenityCard">
	<div class="Col--a-start gap-10 w-100">
		<h3>{data.name}</h3>
		<span>{data.func}</span>
	</div>
	<div class="Row--between gap-10 w-100 AmenityCard__bottom">
		<div class="AmenityCard__contact">
			{#if data.phone !== ''}
				<button
					class="CopyButton"
					title="Copy phone number"
					data-icon={String.fromCharCode(57520)}
					on:keydown={async () => await copyToClipboard(data.phone)}
					on:keyup={async () => await copyToClipboard(data.phone)}
					on:keypress={async () => await copyToClipboard(data.phone)}
					on:click={async () => await copyToClipboard(data.phone)}
				>
					<span>
						{data.phone}
					</span>
				</button>
			{/if}
			{#if data.mail !== ''}
				<button
					class="CopyButton"
					title="Copy email"
					data-icon={String.fromCharCode(57688)}
					on:keydown={async () => await copyToClipboard(data.mail)}
					on:keyup={async () => await copyToClipboard(data.mail)}
					on:keypress={async () => await copyToClipboard(data.mail)}
					on:click={async () => await copyToClipboard(data.mail)}
				>
					<span>
						{data.mail}
					</span>
				</button>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@import './AmenityCardBase.scss';
</style>
