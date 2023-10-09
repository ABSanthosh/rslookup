import { writable } from "svelte/store";
import { browser } from "$app/environment";

const initialValue = browser
  ? window.localStorage.getItem("theme") ?? "dark"
  : "dark";
const theme = writable<Theme>(initialValue as Theme);

theme.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem("theme", value);
  }
});

export { theme };
