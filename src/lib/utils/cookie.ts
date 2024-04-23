// a function that takes a string of cookies and key and returns the value of the key in the cookies string
// if the key is not found, return null
export function getCookie(cookies: string, key: string): string | null {
	const cookie = cookies.split(';').find((cookie) => cookie.trim().startsWith(`${key}=`));
	if (!cookie) return null;
	return cookie.split('=')[1];
}