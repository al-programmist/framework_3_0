import { throttle } from './throttle';
import { recalculateProgress } from './recalculate-progress';
import { win } from '../_config';

const optimizedHandler = throttle(recalculateProgress, 300);

export const setScrollResizeWatchers = () => {
	recalculateProgress();
	win.addEventListener('scroll', optimizedHandler, { passive: true });
	win.addEventListener('resize', optimizedHandler, { passive: true });
};
