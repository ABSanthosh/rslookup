export const handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			let currentTheme = event.cookies.get('theme');

			if (!currentTheme) {
				const userPrefersDark = event.request.headers.get('sec-ch-prefers-color-scheme') === 'dark';
				currentTheme = userPrefersDark ? 'dark' : '';

				event.cookies.set('theme', currentTheme, {
					path: '/',
					expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
					maxAge: 1000 * 60 * 60 * 24 * 365,
					httpOnly: false
				});
			}

			return html.replace(`data-theme=""`, `data-theme="${currentTheme}"`);
		}
	});

	response.headers.set('Accept-CH', 'Sec-CH-Prefers-Color-Scheme');
	response.headers.set('Vary', 'Sec-CH-Prefers-Color-Scheme');
	response.headers.set('Critical-CH', 'Sec-CH-Prefers-Color-Scheme');

	return response;
};
