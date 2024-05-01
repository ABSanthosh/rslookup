// https://mtm.dev/react-vs-svelte
export default function debounce(
  node: HTMLElement,
  params: { value: any; func: () => void; duration: number }
) {
  let timer: ReturnType<typeof setTimeout>;

  return {
    update() {
      clearTimeout(timer);
      timer = setTimeout(params.func, params.duration);
    },
    destroy() {
      clearTimeout(timer);
    }
  };
}
