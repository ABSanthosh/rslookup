import { getUserById, updateUserTokens } from '$db/User.db';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '$env/static/private';
import { isTokenExpiring } from '$utils/google';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { OAuth2Client } from 'google-auth-library';

const authentication: Handle = async ({ event, resolve }) => {
  const googleSub = event.cookies.get('session');
  if (googleSub) {
    const user = await getUserById(googleSub);

    if (user) {
      event.locals.user = user;

      if (isTokenExpiring({ expiry_date: user.expiryDate })) {
        const client = new OAuth2Client(
          GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET,
          GOOGLE_REDIRECT_URI
        );
        client.setCredentials({
          access_token: user.accessToken,
          refresh_token: user.refreshToken,
          expiry_date: user.expiryDate
        });
        const { credentials } = await client.refreshAccessToken();
        await updateUserTokens({
          googleId: user.googleId,
          accessToken: credentials.access_token!,
          expiryDate: credentials.expiry_date!,
          refreshToken: credentials.refresh_token || user.refreshToken
        });
        user.accessToken = credentials.access_token!;
        user.refreshToken = credentials.refresh_token
          ? credentials.refresh_token
          : user.refreshToken;
        user.expiryDate = credentials.expiry_date!;
      }
    } else {
      event.cookies.delete('session', {
        path: '/'
      });
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
};

const authorization: Handle = async ({ event, resolve }) => {
  const googleSub = event.cookies.get('session');
  const protectedRoutes = ['/app'];

  if (protectedRoutes.some((route) => event.url.pathname.startsWith(route))) {
    if (!googleSub) {
      throw redirect(303, '/?error=unauthorized');
    }
  }

  return resolve(event);
};

const performance: Handle = async ({ event, resolve }) => {
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
      'logout',
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

  if (event.cookies.get('theme') === '') {
    console.log('Theme cookie is empty, deleting it');
    event.cookies.delete('theme', {
      path: '/',
      domain: new URL(event.request.url).hostname
    });
  }

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

// export const handle = async ({ event, resolve }) => {};
export const handle = sequence(performance, authentication, authorization);
