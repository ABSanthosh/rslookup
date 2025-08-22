import autoprefixer from 'autoprefixer';
import adapter from '@sveltejs/adapter-auto';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess({
    scss: {
      prependData: `
        // This is only for <style> tags in Svelte files
        // So we need to import the variables and mixins in every other scss file
        @use "src/styles/root/_variables" as *;
        @use "src/styles/root/_mixins.scss" as *;
			`
    },
    postcss: {
      plugins: [autoprefixer()]
    }
  }),
  kit: {
    adapter: adapter(),
    alias: {
      $db: 'src/lib/db/*',
      $data: 'src/lib/data/*',
      $utils: 'src/lib/utils/*',
      $types: 'src/lib/types/*',
      $stores: 'src/lib/stores/*',
      $images: 'src/lib/images/*',
      $styles: 'src/styles/routes/*',
      $components: 'src/lib/components/*',
    }
  },
  compilerOptions: {
    runes: true
  }
};

export default config;
