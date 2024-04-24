<script lang="ts">
	import type { IAcademics } from '$types/Amenity.types';
	import MapsSelector from '$utils/MapsSelector';
	export const data = $$props as IAcademics;
</script>

<div class="AmenityCard">
	<div class="Row--between AmenityCard__bottom gap-10 w-100">
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
</div>

<style lang="scss">
	@import './AmenityCardBase.scss';
</style>
