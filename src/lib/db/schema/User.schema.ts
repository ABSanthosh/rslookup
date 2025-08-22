import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const Users = sqliteTable('users', {
	id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
	googleId: text().unique().notNull(),
	email: text().unique().notNull(),
	name: text().notNull(),
	picture: text(),
	accessToken: text().notNull(),
	refreshToken: text().notNull(),
	idToken: text().notNull(),
	expiryDate: integer().notNull(),
	createdAt: text('timestamp')
		.default(sql`(current_timestamp)`)
		.notNull()
});
