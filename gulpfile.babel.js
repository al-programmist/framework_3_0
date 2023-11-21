import { series, parallel } from 'gulp';
import { clean } from './gulp/tasks/clean';
import { serverStart } from './gulp/tasks/server';
// import { pugBuild, pugWatch } from './gulp/tasks/pug';
// import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
import { fontsBuild, fontsWatch } from './gulp/tasks/fonts';
import { imagesBuild, imagesWatch } from './gulp/tasks/images';
import { spriteBuild, spriteWatch } from './gulp/tasks/sprites';
import { copyBuild, copyWatch } from './gulp/tasks/copy';
import { config } from './gulp/config';

config.setEnv();

export const build = series(
	clean,
	parallel(
		// fontsBuild,
		// copyBuild,
		//----------------
		// pugBuild,
		// scriptsBuild,
		// imagesBuild,
		// spriteBuild,
	),
);

export const dev = series(
	build,
	serverStart,
	parallel(
		// fontsWatch,
		// copyWatch,
		//------------
		// pugWatch,
		// scriptsWatch,
		// imagesWatch,
		// spriteWatch,
	),
);
