<script lang="ts">
	import { profColors, schools } from '$data/prof';
	import { clickOutside } from '$utils/onClickOutside';
	import type { PageData } from './$types';
	import { beforeNavigate } from '$app/navigation';
	import { flip } from 'svelte/animate';
	import { flipAnimate } from '$utils/FlipAnimate';
	import ProfCard from '$components/ProfCard/ProfCard.svelte';

	export let data: PageData;
	$: prof = data.prof;

	$: isFilterOpen = false;
	let filters = Object.keys(schools).map((item) => {
		return {
			name: item,
			checked: true,
			slug: schools[item].slug,
			color: schools[item].color
		};
	});

	beforeNavigate(() => {
		isFilterOpen = false;
	});
</script>

<svelte:head>
	<title>Professors</title>
	<meta name="description" content="Find essential details about your professors here." />
	<meta
		name="keywords"
		content={`
    professors, 
    teachers, 
    educators, 
    snu, 
    snioe, 
    Shiv Nadar University, 
    room number,
    room no.,
    snu.edu.in,
    ${prof.map((item) => item.name).join(', ')},
    ${prof.map((item) => item.school).join(', ')},
    ${prof.map((item) => item.mail).join(', ')}
    `}
	/>
	<meta name="author" content="Santhosh" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<div class="Layout__header Row--between w-100">
	<h2>Where's My Prof?</h2>
	<details
		use:clickOutside
		bind:open={isFilterOpen}
		class="CrispMenu Layout__filter"
		on:outclick={() => (isFilterOpen = false)}
	>
		<summary data-no-marker data-icon={String.fromCharCode(57682)}>
			Filters
			<span>
				{filters.filter((item) => item.checked).length}
			</span>
		</summary>
		<div class="CrispMenu__content Layout__filter--content">
			{#each filters as filterItem}
				<label
					for={filterItem.slug}
					class="Layout__filter--item"
					class:active={filterItem.checked}
					style={`
          --type-primary: ${profColors[filterItem.color].primary};
          --type-secondary: ${profColors[filterItem.color].secondary};
          `}
				>
					<input
						type="checkbox"
						class="CrispInput"
						id={filterItem.slug}
						checked={filterItem.checked}
						disabled={filterItem.checked && filters.filter((item) => item.checked).length === 1}
						on:change={() => {
							filterItem.checked = !filterItem.checked;
						}}
					/>

					{filterItem.name}
				</label>
			{/each}
		</div>
	</details>
</div>

<div class="Prof__content">
	{#each prof.slice(0, 10) as result (`${result.name}-${result.role}`)}
		<span
			animate:flip={{ duration: 250 }}
			use:flipAnimate={{ key: `${result.name}-${result.role}` }}
		>
			<ProfCard {...result} />
		</span>
	{/each}
</div>

<style lang="scss">
	.Layout {
		&__filter {
			&--item {
				user-select: none;
				&.active {
					color: var(--type-primary);
					background: var(--type-secondary);
					border: 1px solid var(--type-primary);
				}
			}
		}
	}

	.Prof {
		&__content {
			gap: 18px;
			min-width: 0;
			@include box();
      margin-top: 20px;

			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: minmax(50px, auto) 1fr;
			@include respondAt(800px) {
				grid-template-columns: 1fr;
			}

			& > span {
				max-width: 100%;
				overflow-x: hidden;
				@include make-flex();
			}
		}
	}
</style>
