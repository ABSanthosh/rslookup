export const handle = async ({ event, resolve }) => {
  const theme = event.cookies.get('theme');

  // event.cookies.set('theme', theme ? theme : 'dark', {
  //   path: '/',
  //   maxAge: 60 * 60 * 24 * 365
  // });

  if (!theme) {
    return await resolve(event);
  }

  return await resolve(event, {
    transformPageChunk: ({ html }) => {
      return html.replace('data-theme=""', `data-theme="${theme}"`);
    }
  });
};
