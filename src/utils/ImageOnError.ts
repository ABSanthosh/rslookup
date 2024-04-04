export const handleImageError = (node: HTMLImageElement) => {
  if (node.naturalHeight === 0 && node.naturalWidth === 0) {
    node.style.display = "none";
    node.style.visibility = "hidden";
  }
};
