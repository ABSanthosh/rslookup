<script lang="ts">
	import { page } from '$app/stores';
	import { theme, setTheme } from '$stores/ThemeStore';
	import { query } from '$stores/QueryStore';
	import { afterNavigate } from '$app/navigation';
	import { HOME_ROUTES, ROUTES } from '$data/routes';
	import { clickOutside } from '$utils/onClickOutside';
	import { fade } from 'svelte/transition';

	afterNavigate(() => {
		isNavOpen = false;
		query.set('');
	});

	$: isHomeRoute = ['/', ...HOME_ROUTES.map((r) => `/${r.route}`)].includes($page.url.pathname);
	$: currentRoute = ROUTES.find((r) => r.route === $page.url.pathname.slice(1).split('/')[0]);

	console.log(currentRoute, isHomeRoute);

	$: isNavOpen = false;
</script>

<header class="Header">
	<div class="Header__left">
		<a href="/">
			<h2>rslookup</h2>
		</a>
	</div>
	<div class="Header__right">
		{#if isHomeRoute}
			<ul class="Header__navList">
				{#each HOME_ROUTES as item}
					<li>
						<a href={item.route} class:active={$page.url.pathname === `/${item.route}`}>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
		{#if currentRoute?.showSearch}
			<div transition:fade class="Header__search" data-icon={String.fromCharCode(59574)}>
				<input
					type="text"
					class="CrispInput"
					placeholder={`Search for a ${currentRoute?.name.toLowerCase()}`}
					bind:value={$query}
					on:input={(e) => {
						if (!(e.target instanceof HTMLInputElement)) return;
						if (e.target.value === '') {
							query.set('');
							return;
						}

						query.set(e.target.value);
					}}
				/>
			</div>
			<hr />
		{/if}
		{#if currentRoute}
			<details
				use:clickOutside
				bind:open={isNavOpen}
				class="CrispMenu Header__tabs"
				on:outclick={() => (isNavOpen = false)}
			>
				<summary>
					<p>
						{currentRoute?.name}
					</p>
					<span data-icon={String.fromCharCode(currentRoute?.icon || 0)} />
				</summary>
				<ul class="CrispMenu__content">
					{#each ROUTES as { name, route, separator }, i}
						{#if separator}
							<hr class="CrispMenu__separator" />
						{/if}

						<a
							href="/{route}"
							on:click={() => (currentRoute = ROUTES[i])}
							data-icon={String.fromCharCode(ROUTES[i].icon)}
							class:active={$page.url.pathname === `/${route}`}
						>
							{name}
						</a>
					{/each}
				</ul>
			</details>
		{/if}
		<button
			class="CrispButton Header__theme-toggle"
			aria-label="Toggle theme"
			data-icon={String.fromCharCode($theme === 'dark' ? 58416 : 58652)}
			on:click={() => setTheme($theme === 'dark' ? 'light' : 'dark')}
		/>
	</div>
</header>

<style lang="scss">
	.Header {
		top: 0;
		left: 0;
		right: 0;
		gap: 10px;
		z-index: 5;
		position: fixed;
		padding: 15px 20px;
		@include box(100%, 64px);
		@include make-flex($dir: row);
		background: var(--elevation-1);
		border-bottom: 1px solid var(--t-crp-border);

		&__left {
			& > a {
				font-size: 20px;
				user-select: none;
				line-height: 100%;
				position: relative;
				font-style: italic;

				text-decoration: none;
				color: var(--foreground);
				font-family: 'Fraunces', serif;
				font-variation-settings:
					'SOFT' 80,
					'WONK' 0;

				h2 {
					font-weight: 500;
					margin-bottom: 5px;
				}
			}
		}

		&__right {
			gap: 10px;
			@include box(auto);
			margin-left: auto;
			@include make-flex($dir: row, $just: flex-end);

			@include respondAt(585px) {
				gap: 10px;
			}

			& > hr {
				border: none;
				@include box(1px, 75%);
				background: var(--t-crp-border);
			}
		}

		&__theme-toggle {
			padding: 7px;
			@include make-flex();
			@include box(32px, 32px);
			--crp-button-background-color: var(--elevation-1);
		}

		&__navList {
			margin: 0;
			padding: 0;
			list-style: none;
			@include make-flex($dir: row, $just: flex-start);

			& > li {
				@include make-flex($dir: row, $just: flex-start);
				& > a {
					font-weight: 500;
					padding: 5px 10px;
					@include box(auto);
					text-decoration: none;
					color: var(--subForeground);
					transition: all 0.1s ease-in-out;

					&:hover {
						color: var(--foreground);
					}
					&.active {
						color: var(--foreground);
					}
				}
			}
		}

		&__search {
			@include box(100%, 32px);
			max-width: 260px;
			position: relative;
			&::before {
				top: 52%;
				left: 7px;
				font-size: 18px;
				position: absolute;
				pointer-events: none;
				transform: translateY(-50%);
			}

			@include respondAt(700px) {
				@include box(auto);

				&:has(input:focus),
				&:has(input:active) {
					left: 50%;
					z-index: 2;
					position: fixed;
					max-width: none;
					transform: translateX(-50%);
					@include box(calc(100vw - 30px), 32px);
				}
			}

			& > input {
				@include box();
				font-size: 16px;
				border-radius: 6px;
				padding: 0 24px 0 30px;

				@include respondAt(700px) {
					padding: 0;
					color: transparent;
					@include box(32px, 32px);
					&:not(:focus)::placeholder {
						color: transparent;
					}
				}

				&:active,
				&:focus {
					@include respondAt(700px) {
						@include box();
						padding: 0 24px 0 30px;
						color: var(--foreground);

						&:not(:focus)::placeholder {
							color: unset;
						}
					}
				}
			}
		}

		&__tabs {
			$responsiveWidth: 600px;

			@include respondAt($responsiveWidth) {
				--crp-menu-min-width: unset;
			}
			summary {
				& > span {
					display: none;
					@include respondAt($responsiveWidth) {
						@include make-flex();
					}
				}

				p {
					@include respondAt($responsiveWidth) {
						display: none;
					}
				}
			}

			& > ul {
				& > a {
					gap: 7px;
					padding: 6px 8px;
					user-select: none;
					border-radius: 6px;
					white-space: nowrap;
					text-decoration: none;
					color: var(--foreground);
					@include box(100%, 30px);
					@include make-flex($dir: row, $just: flex-start);
				}
				a {
					&:hover {
						background-color: var(--t-crp-background-hover);
					}
					&.active {
						background-color: var(--activeNav);
					}
				}
			}
		}
	}
</style>
