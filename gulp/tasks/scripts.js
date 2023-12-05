import {
	src, dest, watch, series,
} from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpackStream from 'webpack-stream';
import eslint from 'gulp-eslint';
import { webpackConfig } from '../../webpack.config';
import { serverReload } from './server';
import { config } from '../config';

const scriptsBuild = () => (
	src(config.scripts.src)
		.pipe(plumber({
			errorHandler: notify.onError((error) => ({
				title: 'Js',
				message: error.message,
			})),
		}))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(webpackStream(webpackConfig))
		.pipe(dest(config.scripts.dest))
);

const scriptsWatch = () => watch(config.scripts.watch, series(scriptsBuild, serverReload));

export { scriptsBuild, scriptsWatch };
