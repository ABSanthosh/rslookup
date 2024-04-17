import adapter from '@sveltejs/adapter-auto';
import preprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			prependData: `
				@use "src/styles/root/_variables" as *;
				@import "src/styles/root/_mixins.scss";
			`,
		},
		postcss: {
			plugins: [autoprefixer()],
		},
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$components: "src/components",
			$styles: "src/styles/routes",
			$data: "src/data",
			$utils: "src/utils",
			$types: "src/types",
		},
	}
};

export default config;
