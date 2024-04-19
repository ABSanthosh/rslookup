import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const theme = writable<Theme>('dark');
const setTheme = (value: Theme) => {
	if (browser) {
		document.documentElement.dataset.theme = value;
		document.cookie = `theme=${value};path=/;max-age=${60 * 60 * 24 * 365}`;
		theme.set(value);
	}
};

export { theme, setTheme };
