import { onBeforeUnmount, Ref, ref, unref } from 'vue';
import { useState } from '../state';
import { Pausable } from './types';

export function useInterval(cb: () => void, ms: Ref<number> = ref(1000)): Pausable {
	const [isActive, setIsActive] = useState(false);
	let interval: ReturnType<typeof setInterval> | null = null;

	function clean() {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	}
	function pause() {
		setIsActive(false);

		clean();
	}

	function resume() {
		setIsActive(true);
		interval = setInterval(cb, unref(ms));
	}

	resume();
	onBeforeUnmount(() => {
		pause();
	});

	return { isActive, resume, pause };
}
