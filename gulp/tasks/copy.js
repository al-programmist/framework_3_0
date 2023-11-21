import {
	src, dest, watch, series,
} from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import { serverReload } from './server';
import { config } from '../config';

const copyBuild = () => (
	src(config.copy.src, { base: './source/assets/' })
		.pipe(plumber({
			errorHandler: notify.onError((error) => ({
				title: 'Copy',
				message: error.message,
			})),
		}))
		.pipe(dest(config.copy.dest))
);

const copyWatch = () => watch(
	config.copy.watch,
	series(copyBuild, serverReload),
);

export { copyBuild, copyWatch };
