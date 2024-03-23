import { writable } from "svelte/store";

const initialValue = "";
const query = writable<string>(initialValue);

export { query };
