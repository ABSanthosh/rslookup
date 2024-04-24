<script lang="ts">
	import type { IEssentials } from '$types/Amenity.types';
	import MapsSelector from '$utils/MapsSelector';
	import copyToClipboard from '$utils/CopyToClipboard';

	export const data = $$props as IEssentials;
</script>

<div class="AmenityCard">
	<div class="Row--between gap-10 w-100">
		<h3>{data.name}</h3>
		{#if data['time.from'] !== '' && data['time.to'] !== ''}
			<span data-icon={String.fromCharCode(59573)}>
				{data['time.from']} - {data['time.to']}
			</span>
		{/if}
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
	@import './AmenityCardBase.scss';
</style>
