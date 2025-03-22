import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const initialValue = browser ? (window.localStorage.getItem('theme') ?? 'dark') : 'dark';
const theme = writable<Theme>(initialValue as Theme);
const setTheme = (value: Theme) => {
  if (browser) {
    document.documentElement.dataset.theme = value;
    window.localStorage.setItem('theme', value);
    theme.set(value);
  }
};

export { theme, setTheme };
