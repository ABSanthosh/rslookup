export function selectOnFocus(node: HTMLInputElement) {
  node.addEventListener('focus', () => {
    node.select();
  });
}
