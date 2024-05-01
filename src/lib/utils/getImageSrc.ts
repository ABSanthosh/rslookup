export default function getImageSrc(url: string) {
  // If the image is from Google Drive, return the thumbnail URL
  if (url.includes('https://drive.google.com/file')) {
    const match = url.match(/\/d\/([^/]+)\//);
    const imgId = match ? match[1] : '';
    return `https://drive.google.com/thumbnail?id=${imgId}&sz=s4000`;
  }

  return url;
}
