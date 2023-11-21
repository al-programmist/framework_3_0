import {
	src, dest, watch, series,
} from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import { serverReload } from './server';
import { config, sourcePath } from '../config';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

/**
 * Копирование готовых файлов woff и woff2 в билд
 * @returns {*}
 */
const copy = () => (
	src(config.fonts.src, {base: `${sourcePath}/assets/fonts/`})
		.pipe(plumber({
			errorHandler: notify.onError((error) => ({
				title: 'Fonts',
				message: error.message,
			})),
		}))
		.pipe(dest(config.fonts.dest))
);

/**
 * Конвертация ttf в woff
 * @returns {*}
 */
const woff = () => {
	return src(config.fonts.convert, {base: `${sourcePath}/assets/fonts/`})
		.pipe(ttf2woff())
		.pipe(dest(config.fonts.dest))
}

/**
 * Конвертация ttf в woff2
 * @returns {*}
 */
const woff2 = () => {
	return src(config.fonts.convert, {base: `${sourcePath}/assets/fonts/`})
		.pipe(ttf2woff2())
		.pipe(dest(config.fonts.dest))
}

const fontsBuild = series(
	woff,
	woff2,
	copy,
)

const fontsWatch = () => watch(
	config.fonts.watch,
	series(fontsBuild, serverReload),
);

export { fontsBuild, fontsWatch };
