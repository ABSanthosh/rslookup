import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '$env/static/private';
import { OAuth2Client } from 'google-auth-library';

export const actions: Actions = {
	login: async () => {
		const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
		const url = client.generateAuthUrl({
			access_type: 'offline',
			scope: [
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/drive.file'
			],
			prompt: 'consent'
		});
		throw redirect(302, url);
	},
	logout: async ({ cookies }) => {
		cookies.delete('session', {
			path: '/'
		});
		throw redirect(303, '/');
	}
};
