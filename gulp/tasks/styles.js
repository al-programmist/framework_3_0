import {
	src, dest, watch, series,
} from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';

import autoPrefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import gcmq from 'gulp-group-css-media-queries';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import { serverReload } from './server';
import { config } from '../config';

const sass = gulpSass(dartSass);

const stylesBuild = () => (
	src(config.styles.src, { sourcemaps: config.isDev })
		.pipe(plumber({
			errorHandler: notify.onError((error) => ({
				title: 'Scss',
				message: error.message,
			})),
		}))
		.pipe(sass({
			outputStyle: 'expanded',
			includePaths: [`${__dirname}/node_modules`],
		}))
		.pipe(gulpif(config.isProd, autoPrefixer({
			cascade: true,
		})))
		.pipe(gcmq())
		.pipe(rename({
			dirname: '',
		}))
		.pipe(gulpif(config.isProd, csso()))
		.pipe(gulpif(config.isProd, rename({
			suffix: '.min',
			dirname: '',
		})))
		.pipe(dest(config.styles.dest, { sourcemaps: config.isDev }))
);

const stylesWatch = () => watch(
	config.styles.watch,
	series(stylesBuild, serverReload),
);

export { stylesBuild, stylesWatch };
