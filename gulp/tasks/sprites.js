import {
	src, dest, watch, series, parallel,
} from 'gulp';
import { appendFileSync, writeFile, readdirSync } from 'fs';
import path from 'path';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import svgSprite from 'gulp-svg-sprite';
import { serverReload } from './server';
import { config } from '../config';

const getDirectories = (source) => {
	let res = [];
	try {
		res = readdirSync(source, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);
	} catch (err) {
		console.log('No SVG Sprites found');
	}
	return res;
};

const svgDirs = getDirectories(config.sprite.src);

const getConfig = (name, type) => ({
	mode: {
		stack: {
			dest: '.',
			sprite: type ? `sprite-${name}.${type}.svg` : `sprite-${name}.svg`,
		},
	},
	shape: type !== 'mono' ? {
		transform: [
			{
				svgo: {
					plugins: [
						{
							removeAttrs: {
								attrs: ['class', 'data-name'],
							},
						},
						{
							removeUselessStrokeAndFill: false,
						},
						{
							inlineStyles: true,
						},
					],
				},
			},
		],
	} : {
		transform: [
			{
				svgo: {
					plugins: [
						{
							removeAttrs: {
								attrs: ['class', 'data-name', 'fill.*', 'stroke.*'],
							},
						},
					],
				},
			},
		],
	},
});

const spriteBuild = (done) => {
	const pipeline = (path, conf) => src(path)
		.pipe(plumber({
			errorHandler: notify.onError((error) => ({
				title: 'Sprite',
				message: error.message,
			})),
		}))
		.pipe(svgSprite(conf))
		.pipe(dest(config.sprite.dest));

	// очистка файла
	writeFile(config.sprite.icons, '', function(error) {
		if(error) throw error;
	});

	svgDirs.forEach((dir) => {
		const sub = getDirectories(`${config.sprite.src}/${dir}`);
		pipeline(`${config.sprite.src}${dir}/*.svg`, getConfig(dir));

		const files = readdirSync(`${config.sprite.src}/${dir}`)
			.map(fileName => {
				if (path.extname(fileName) === '.svg') {
					const iconName = path.basename(fileName).replace('.svg','');

					const iconMono =
						`\n.icon--${dir}-${iconName}  {\n` +
							`\t&::before {\n` +
								`\t\tbackground-color: currentcolor;\n` +
								`\t\t-webkit-mask-image: url('../images/sprite-${dir}.svg#${iconName}');\n` +
								`\t\t-webkit-mask-repeat: no-repeat;\n` +
								`\t\tmask-position: center center;\n` +
								`\t\tmask-repeat: no-repeat;\n` +
								`\t\tmask-image: url('../images/sprite-${dir}.svg#${iconName}');\n` +
							`\t };\n` +
						`};\n`;
					const iconMulti =
						`\n.icon--${dir}-${iconName} { \n` +
							`\t&::before {\n` +
								`\t\tbackground-color: transparent;\n` +
								`\t\tbackground-repeat: no-repeat;\n` +
								`\t\tbackground-position: center center;\n` +
								`\t\tbackground-image: url('../images/sprite-${dir}.svg#${iconName}');\n` +
							`\t };\n` +
							`};\n`;

					let value = (dir === 'mono')
						? iconMono
						: iconMulti;

					appendFileSync(config.sprite.icons, value);
				}
			});
	});
	done();
};

const spriteWatch = () => watch(
	config.sprite.watch,
	series(spriteBuild, serverReload),
);

export { spriteBuild, spriteWatch };
