<script lang="ts">
	export let showOnPx = 150;
	$: isHidden = true;

	function scrollContainer() {
		return document.documentElement || document.body;
	}
</script>

<svelte:window
	on:scroll={() => {
		if (!scrollContainer()) {
			return;
		}

		if (scrollContainer().scrollTop > showOnPx) {
			isHidden = false;
		} else {
			isHidden = true;
		}
	}}
/>
<button
	class="CrispButton GoTop"
	class:hidden={isHidden}
	data-icon={String.fromCharCode(58840)}
	on:click={() => {
		document.body.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}}
/>

<style lang="scss">
	.GoTop {
		opacity: 1;
		z-index: 99;
		right: 20px;
		bottom: 20px;
		padding: 20px;
		position: fixed;
		user-select: none;
		border-radius: 50%;
		@include make-flex();
		@include box(20px, 20px);
		box-shadow: var(--t-crp-elevation-shadow);
		transition:
			opacity 0.3s,
			visibility 0.3s;

		&:hover {
			&::before {
				color: var(--foreground);
			}
		}
		&.hidden {
			opacity: 0;
			visibility: hidden;
		}
	}
</style>
