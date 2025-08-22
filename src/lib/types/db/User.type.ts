export type User = {
	googleId: string;
	email: string;
	name: string;
	picture: string | null;
	accessToken: string;
	refreshToken: string;
	expiryDate: number;
	idToken: string;
};
