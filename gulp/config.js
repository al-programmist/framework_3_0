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

	styles: {
		src: `${sourcePath}/pages/**/*.scss`,
		dest: `${destPath}/css`,
		watch: `${sourcePath}/**/*.scss`,
	},

	sprite: {
		src: `${sourcePath}/assets/icons/`,
		dest: `${destPath}/images`,
		watch: `${sourcePath}/assets/icons/**/*.svg`,
		icons: `${sourcePath}/config/styles/_icons.scss`,
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

export const faviconConfig = {
	masterPicture: `${sourcePath}/assets/favicon-master.png`,
	dest: `${sourcePath}/assets/favicon/`,
	iconsPath: '/favicon/',
	design: {
		ios: {
			pictureAspect: 'backgroundAndMargin',
			backgroundColor: '#ffffff',
			margin: '21%',
		},
		desktopBrowser: {},
		windows: {
			pictureAspect: 'whiteSilhouette',
			backgroundColor: '#da532c',
			onConflict: 'override',
		},
		androidChrome: {
			pictureAspect: 'shadow',
			themeColor: '#ffffff',
			manifest: {
				name: 'Terminator',
				display: 'browser',
				orientation: 'notSet',
				onConflict: 'override',
			},
		},
		safariPinnedTab: {
			pictureAspect: 'silhouette',
			themeColor: '#5bbad5',
		},
	},
	settings: {
		compression: 5,
		scalingAlgorithm: 'Mitchell',
		errorOnImageTooSmall: false,
	},
	markupFile: `${sourcePath}/assets/favicon.json`,
};
