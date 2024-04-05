export const handleImageError = (node: HTMLImageElement) => {
  // if (node.naturalHeight === 0 && node.naturalWidth === 0) {
  //   node.style.display = "none";
  //   node.style.visibility = "hidden";
  // }

  // add a resize observer to check if the image naturalHeight and naturalWidth are not 0
  // if the naturalHeight and naturalWidth are 0, then hide the image
  // if the naturalHeight and naturalWidth are not 0, then remove display: none and visibility: hidden
  // the observer should be removed after the image is loaded

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (
        (entry.target as HTMLImageElement).naturalHeight === 0 &&
        (entry.target as HTMLImageElement).naturalWidth === 0
        ) {
        (entry.target as HTMLImageElement).style.display = "none";
        (entry.target as HTMLImageElement).style.visibility = "hidden";
        // observer.disconnect();
      } else {
        (entry.target as HTMLImageElement).style.display = "";
        (entry.target as HTMLImageElement).style.visibility = "";
      }
    }
  });
  observer.observe(node);
};
