import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, setHeaders }) => {
  if (url.pathname === '/clubs') {
    redirect(308, '/clubs/cultural');
  }
};
