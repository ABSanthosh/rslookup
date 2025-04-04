import type { Action } from 'svelte/action';

export default function clickOutside(node: HTMLElement) {
  let wasTouched = false;

  const handleTouchStart = () => {
    wasTouched = true;
  };

  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as Node)) {
      if (wasTouched) {
        // If it was a touch event, skip preclose behavior
        wasTouched = false;
        node.dispatchEvent(new CustomEvent('OutClick'));
        return;
      }

      // Otherwise, proceed with the preclose behavior
      node.querySelector('.CrispMenu__content')?.setAttribute('data-preclose', '');
      setTimeout(() => {
        node.dispatchEvent(new CustomEvent('OutClick'));
        node.querySelector('.CrispMenu__content')?.removeAttribute('data-preclose');
      }, 0.4 * 1000);
    }
  };

  document.addEventListener('touchstart', handleTouchStart, true);
  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('touchstart', handleTouchStart, true);
      document.removeEventListener('click', handleClick, true);
    }
  };
}
