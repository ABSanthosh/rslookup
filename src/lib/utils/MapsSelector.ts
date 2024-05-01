import { browser } from '$app/environment';

// https://medium.com/@colinlord/opening-native-map-apps-from-the-mobile-browser-afd66fbbb8a4
export default function MapsSelector(lat: string, long: string): string {
  if (!browser) return '';
  if (
    /* if we're on iOS, open in Apple Maps */
    navigator.platform.indexOf('iPhone') != -1 ||
    navigator.platform.indexOf('iPad') != -1 ||
    navigator.platform.indexOf('iPod') != -1
  )
    // return `https://maps.google.com/?q=${lat},${long}`;
    //   window.open("maps://maps.google.com/maps?daddr=<lat>,<long>&amp;ll=");
    return `maps://maps.google.com/maps?daddr=${lat},${long}&amp;ll=`;
  else return `https://maps.google.com/?q=${lat},${long}`;
}
