export const sourcePath = './source';
export const destPath = './build';

export const config = {
	clean: {
		src: destPath,
	},

	server: {
		baseDir: destPath,
	},

	pug: {
		src: `${sourcePath}/pages/**/*.pug`,
		dest: destPath,
		watch: `${sourcePath}/**/*.pug`,
	},

	images: {
		src: `${sourcePath}/assets/images/**/*.{jpg,jpeg,png,gif,svg,webp}`,
		dest: `${destPath}/images`,
		watch: `${sourcePath}/assets/images/**/*.{jpg,jpeg,png,gif,svg,webp}`,
	},

	fonts: {
		src: `${sourcePath}/assets/fonts/*.{woff,woff2}`,
		dest: `${destPath}/fonts`,
		watch: `${sourcePath}/assets/fonts/*.{ttf,woff,woff2}`,
		convert: `${sourcePath}/assets/fonts/*.ttf`,
	},

	scripts: {
		src: `${sourcePath}/pages/**/*.js`,
		dest: `${destPath}/js`,
		watch: `${sourcePath}/**/*.js`,
		webpackSrc: `${sourcePath}/pages`,
	},

	sprite: {
		src: `${sourcePath}/assets/icons/`,
		dest: `${destPath}/images`,
		watch: `${sourcePath}/assets/icons/**/*.svg`,
		icons: `${sourcePath}/config/styles/_icons.styl`,
	},

	copy: {
		src: [
			`${sourcePath}/assets/emails/*.html`,
			`${sourcePath}/assets/favicon/*.{png,xml,ico,svg,webmanifest}`,
			`${sourcePath}/assets/files/**/*.*`,
			`${sourcePath}/assets/response/**/*.*`,
		],
		dest: `${destPath}`,
		watch: [
			`${sourcePath}/assets/emails/*.html`,
			`${sourcePath}/assets/favicon/*.{png,xml,ico,svg,webmanifest}`,
			`${sourcePath}/assets/files/**/*.*`,
			`${sourcePath}/assets/response/**/*.json`,
		],
	},

	setEnv() {
		this.isProd = process.argv.includes('--prod');
		this.isDev = !this.isProd;
	},
};
