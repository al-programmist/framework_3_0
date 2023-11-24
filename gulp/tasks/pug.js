import {
	src, dest, watch, series,
} from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import rename from 'gulp-rename';
import pugLinter from 'gulp-pug-linter';
import pugLintStylish from 'puglint-stylish';
import {htmlValidator} from "gulp-w3c-html-validator";
import { serverReload } from './server';
import { config, sourcePath } from '../config';

const pugBuild = () => (
	src(config.pug.src)
		.pipe(plumber({
			errorHandler: notify.onError((error) => ({
				title: 'Pug',
				message: error.message,
			})),
		}))
		.pipe(pugLinter({
			reporter: pugLintStylish,
			failAfterError: false,
		}))
		.pipe(pug({
			basedir: sourcePath,
			pretty: true,
			venbose: true,
		}))
		.pipe(rename({
			dirname: '',
		}))
		.pipe(dest(config.pug.dest))
);

const pugWatch = () => watch(
	config.pug.watch,
	series(pugBuild, serverReload),
);

export { pugBuild, pugWatch };
