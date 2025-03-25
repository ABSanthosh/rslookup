export default function clickOutside(node: HTMLElement) {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as Node)) {
      node.querySelector('.CrispMenu__content')?.setAttribute('data-preclose', '');
      setTimeout(
        () => {
          node.dispatchEvent(new CustomEvent('OutClick'));
          node.querySelector('.CrispMenu__content')?.removeAttribute('data-preclose');
        },
        0.4 * 1000 
      );
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}
