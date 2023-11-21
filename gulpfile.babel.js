import { series, parallel } from 'gulp';
import { clean } from './gulp/tasks/clean';
import { serverStart } from './gulp/tasks/server';
import { fontsBuild, fontsWatch } from './gulp/tasks/fonts';
import { copyBuild, copyWatch } from './gulp/tasks/copy';
import { favgenerate, favupdate } from "./gulp/tasks/favicon";
// import { pugBuild, pugWatch } from './gulp/tasks/pug';
// import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
// import { imagesBuild, imagesWatch } from './gulp/tasks/images';
// import { spriteBuild, spriteWatch } from './gulp/tasks/sprites';
import { config } from './gulp/config';

config.setEnv();

/**
 * Задача генерирует фавиконки (один раз за проект)
 */
export const favicons = series(
	favupdate,
	favgenerate
)

export const build = series(
	clean,
	parallel(
		fontsBuild,
		copyBuild,
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
		fontsWatch,
		copyWatch,
		//------------
		// pugWatch,
		// scriptsWatch,
		// imagesWatch,
		// spriteWatch,
	),
);
