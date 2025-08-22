import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  return {
    user: locals.user || null, // Pass the user data to the client
    url: url.pathname
  };
};
