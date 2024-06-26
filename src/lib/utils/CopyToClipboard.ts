import { addToast } from '$stores/ToastStore';

export default async function copyToClipboard(text?: string) {
  addToast({ message: 'Copied to clipboard!', type: 'success' });
  await navigator.clipboard.writeText(text!);
}
