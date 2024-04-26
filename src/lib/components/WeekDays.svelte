<!-- Ref: https://svelte.dev/repl/1565708677134e418e256234984d90ef?version=3.12.1 -->
<script lang="ts">
	export let { days } = $$props as {
		days: {
			MO: boolean;
			TU: boolean;
			WE: boolean;
			TH: boolean;
			FR: boolean;
			SA: boolean;
			SU: boolean;
		};
	};

	const valueOf = (day: string) => {
		// @ts-ignore
		return days[day];
	};
</script>

<ul class="WeekDays">
	{#each Object.keys(days) as day}
		{#if valueOf(day)}
			<label class="WeekDay__item" for={day}>
				<input type="checkbox" id={day} name={day} checked={valueOf(day)} />
				<span>
					{day}
				</span>
			</label>
		{/if}
	{/each}
</ul>

<style lang="scss">
	.WeekDays {
		gap: 5px;
		flex-wrap: wrap;
		list-style: none;
		@include make-flex($dir: row, $just: flex-start);

		& > label {
			@include box(auto, auto);

			& > span {
				font-size: 12px;
				font-weight: 600;
				user-select: none;
				position: relative;
				border-radius: 7px;
				@include make-flex();
				color: var(--subFg-1);
				@include box(23px, 23px);
				transition: all 0.1s ease-in-out;
			}

			& > input {
				display: none;
				&:checked + span {
					color: var(--bluePrimary);
					background-color: var(--blueSecondary);
				}
			}
		}
	}
</style>
