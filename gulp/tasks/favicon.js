import realFavicon from 'gulp-real-favicon';
import fs from 'fs';
import { config, faviconConfig } from '../config';

/**
 * Запускает обновление конфигурации фавиконок
 * @param done
 */
const favupdate = (done) => {
	let currentVersion = JSON.parse(fs.readFileSync(faviconConfig.markupFile)).version;
	realFavicon.checkForUpdates(currentVersion, function (err) {
		if (err) {
			throw err;
		}
	});
	done();
}

/**
 * Генерирует иконки, занимает время. Запустить только один раз перед началом проекта. Запускать только после ручного обновления конфигурации фавиконок
 * @param done
 */
const favgenerate = (done) => {
	realFavicon.generateFavicon(faviconConfig, function () {
		done();
	});
}

export { favgenerate, favupdate };
