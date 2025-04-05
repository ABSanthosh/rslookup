import { addToast } from '$stores/ToastStore';
import type { Action } from 'svelte/action';

const clipboard: Action<HTMLElement, { text: string }> = (node, { text }: { text: string }) => {
  const events = ['keydown', 'keyup', 'keypress', 'click'];

  const eventHandler = (event: Event) => {
    if (event instanceof KeyboardEvent) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        copyToClipboard(text);
      }
    } else {
      event.preventDefault();
      copyToClipboard(text);
    }
  };

  events.forEach((event) => node.addEventListener(event, async (e: Event) => eventHandler(e)));

  return {
    destroy() {
      events.forEach((event) => node.removeEventListener(event, eventHandler));
    }
  };
};

async function copyToClipboard(text?: string) {
  addToast({ message: 'Copied to clipboard!', type: 'success' });
  await navigator.clipboard.writeText(text!);
}

export { clipboard, copyToClipboard };
