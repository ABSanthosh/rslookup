import { db } from '$db';
import { eq } from 'drizzle-orm';
import type { User } from '$types/db/User.type';
import { Users } from './schema/User.schema';

export async function upsertUser({
	name,
	email,
	picture,
	googleId,
	idToken,
	accessToken,
	expiryDate,
	refreshToken
}: User) {
	await db
		.insert(Users)
		.values({
			name,
			accessToken,
			email,
			googleId,
			idToken,
			picture,
			expiryDate,
			refreshToken
		})
		.onConflictDoUpdate({
			target: [Users.googleId],
			set: {
				name,
				accessToken,
				email,
				idToken,
				picture,
				refreshToken
			}
		});
}

export async function getUserById(id: string) {
	return (await db.selectDistinct().from(Users).where(eq(Users.googleId, id)).limit(1))[0] || null;
}

export async function updateUserTokens({
	googleId,
	accessToken,
	refreshToken,
	expiryDate
}: {
	googleId: string;
	accessToken: string;
	refreshToken: string;
	expiryDate: number;
}) {
	return await db
		.update(Users)
		.set({
			accessToken,
			expiryDate,
			refreshToken
		})
		.where(eq(Users.googleId, googleId));
}
