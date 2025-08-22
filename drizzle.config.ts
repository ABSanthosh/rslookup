import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/lib/db/schema',
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL!
	}
});
