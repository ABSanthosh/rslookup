export const handle = async ({ event, resolve }) => {
  const theme = event.cookies.get('theme');

  const iconsToRequest = [
    ...[
      'map',
      'pool',
      'menu',
      'call',
      'mail',
      'info',
      'group',
      'close',
      'store',
      'hotel',
      'search',
      'report',
      'trophy',
      'delete',
      'person',
      'school',
      'biotech',
      'schedule',
      'dark_mode',
      'calculate',
      'group_work',
      'light_mode',
      'arrow_back',
      'co_present',
      'local_mall',
      'restaurant',
      'filter_list',
      'description',
      'location_on',
      'arrow_upward',
      'arrow_forward',
      'arrow_drop_up',
      'arrow_drop_down',
      'shield_person',
      'calendar_today',
      'calendar_add_on',
      'person_raised_hand'
    ].sort((a, b) => a.localeCompare(b))
  ] as const;

  const googleFontIconLink = `<link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0..1,-50..200&icon_names=${iconsToRequest.join(',')}&display=block"
    />
  `;

  if (!theme) {
    return await resolve(event, {
      transformPageChunk: ({ html }) => {
        return html.replace('%iconFont%', googleFontIconLink);
      }
    });
  }

  return await resolve(event, {
    transformPageChunk: ({ html }) => {
      return html
        .replace('data-theme=""', `data-theme="${theme}"`)
        .replace('%iconFont%', googleFontIconLink);
    }
  });
};
