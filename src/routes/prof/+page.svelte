<script lang="ts">
	import { search } from 'fast-fuzzy';
	import { flip } from 'svelte/animate';
	import type { PageData } from './$types';
	import { beforeNavigate } from '$app/navigation';
	import { profColors, schools } from '$data/prof';
	import { flipAnimate } from '$utils/FlipAnimate';
	import { clickOutside } from '$utils/onClickOutside';
	import ProfCard from '$components/ProfCard/ProfCard.svelte';
	import { query } from '$stores/QueryStore';
	import { onMount } from 'svelte';

	export let data: PageData;
	$: isFilterOpen = false;
	let filters = Object.keys(schools).map((item) => {
		return {
			name: item,
			checked: true,
			slug: schools[item].slug,
			color: schools[item].color
		};
	});

	let pageSize = 20;
	$: prof = data.prof;
	$: filteredSchools = filters.filter((item) => item.checked).map((item) => item.name);
	$: filteredProf = data.prof.filter((item) => {
		if (!Object.keys(schools).includes(item.school)) {
			return filteredSchools.includes('Miscellaneous');
		}
		return filteredSchools.includes(item.school);
	});
	$: searchResult = filteredProf.slice(0, pageSize);

	beforeNavigate(() => {
		isFilterOpen = false;
	});

	onMount(() => {
		query.subscribe((q) => {
			if (q === '') {
				searchResult = data.prof.slice(0, pageSize);
				return;
			}

			searchResult = search(q, filteredProf, {
				keySelector: (obj) => obj.name
			}).slice(0, pageSize);

			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
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
	{#if prof.length === 0}
		<i
			class="CrispMessage"
			data-type="error"
			data-format="box"
			style="height: 40px; grid-column: 1 / 3 ;"
		>
			No results found.
		</i>
	{:else}
		{#each searchResult as result (`${result.name}-${result.role}`)}
			<span
				animate:flip={{ duration: 250 }}
				use:flipAnimate={{ key: `${result.name}-${result.role}` }}
			>
				<ProfCard {...result} />
			</span>
		{/each}
	{/if}
</div>

<div class="Prof__bottom w-100">
	<select
		class="CrispSelect"
		value={`${pageSize}`}
		on:change={(e) => {
			// @ts-ignore
			pageSize = Number(e.target.value);
		}}
	>
		<option value="20">20</option>
		<option value="40">40</option>
		<option value="80">80</option>
		<option value={`${filteredProf.length}`}>All ({filteredProf.length})</option>
	</select>
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

				animation: fade-in linear forwards;
				animation-timeline: view();
				animation-range-start: 0;
				animation-range-end: 17%;
				animation-duration: 4s;
				transform-style: preserve-3d;
			}
		}

		&__bottom {
			margin-top: 20px;
			@include make-flex($align: flex-end);
		}
	}

	@keyframes fade-in {
		0% {
			scale: 0.9;
			opacity: 0;
			transform: translateY(20px) rotateX(-30deg);
		}

		to {
			scale: 1;
			opacity: 1;
			transform: translateY(0) rotateX(0);
		}
	}
</style>
