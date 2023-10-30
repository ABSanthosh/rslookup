import { addToast } from "$lib/ToastStore";

export default async function copyToClipboard(text: string) {
  addToast({ message: "Copied to clipboard!", timeout: 1500 });
  await navigator.clipboard.writeText(text);
}
