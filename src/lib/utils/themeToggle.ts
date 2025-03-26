import { browser } from '$app/environment';
import { theme, setTheme } from '$stores/ThemeStore';
import type { Action } from 'svelte/action';
import { get } from 'svelte/store';

export const themeToggleTransition: Action<HTMLElement> = (node) => {
  const themeHandler = () => {
    if (browser) {
      if (
        !node ||
        !document.startViewTransition ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        setTheme(get(theme) === 'dark' ? 'light' : 'dark');
        return;
      }

      document
        .startViewTransition(async () => {
          setTheme(get(theme) === 'dark' ? 'light' : 'dark');
        })
        .ready.then(() => {
          const { top, left, width, height } = node.getBoundingClientRect();
          const x = left + width / 2;
          const y = top + height / 2;
          const right = window.innerWidth - left;
          const bottom = window.innerHeight - top;
          const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));
          const isDark = get(theme) !== 'dark';
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`
          ];

          document.documentElement.animate(
            {
              clipPath: isDark ? clipPath.reverse() : clipPath
            },
            {
              duration: 500,
              easing: 'ease-in-out',
              pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
            }
          );
        });
    }
  };

  node.addEventListener('click', themeHandler);

  return {
    destroy() {
      node.removeEventListener('click', themeHandler);
    }
  };
};

// 1040-NR
// 8843
