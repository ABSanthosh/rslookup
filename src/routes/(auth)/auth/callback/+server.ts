import { redirect, type Redirect } from '@sveltejs/kit';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '$env/static/private';
import { OAuth2Client } from 'google-auth-library';
import { upsertUser } from '$db/User.db.js';

export async function GET({ url, cookies }) {
  const code = url.searchParams.get('code');

  try {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
    const response = await client.getToken(code!);

    client.setCredentials(response.tokens);
    const payload = (
      await client.verifyIdToken({
        idToken: client.credentials.id_token!,
        audience: GOOGLE_CLIENT_ID
      })
    ).getPayload();

    if (payload) {
      const allowedDomain = '@snu.edu.in';
			const passedDomain = payload.email?.split('@')[1] || '';
      if (!payload.email || !payload.email.endsWith(allowedDomain)) {
        console.warn(
          `Attempted login from unauthorized domain: ${payload.email || 'No email provided'}`
        );
        throw redirect(
          303,
          `/?error=unauthorized_domain&domain=@${encodeURIComponent(passedDomain)}`
        );
      }

      const dbUser = await upsertUser({
        googleId: payload.sub,
        name: payload.name || '',
        email: payload.email || '',
        picture: payload.picture || '',
        idToken: client.credentials.id_token!,
        accessToken: client.credentials.access_token!,
        expiryDate: client.credentials.expiry_date!,
        refreshToken: client.credentials.refresh_token!
      });
    } else {
      throw redirect(303, '/?error=No%20payload%20found');
    }

    cookies.set('session', payload.sub, {
      httpOnly: true, // Ensure this cookie cannot be accessed via client-side JavaScript
      path: '/',
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 7 // 1 week expiration
    });
  } catch (error) {
    // console.error('Google OAuth Callback Error:', error);
    // return redirect(303, '/?error=Failed%20to%20authenticate');
    if (error && typeof error === 'object' && 'status' in error && error.status === 303) {
      // If it's a SvelteKit redirect, re-throw it so SvelteKit can handle it.
      // The type assertion `error as Redirect` helps TypeScript understand.
      throw error as Redirect;
    }

    // Log other, unexpected errors
    console.error('Google OAuth Callback Error:', error);
    // For any other true error (Google API, network, database), redirect to a generic failure.
    throw redirect(303, '/?error=Failed%20to%20authenticate');
  }

  return redirect(303, '/app');
}
