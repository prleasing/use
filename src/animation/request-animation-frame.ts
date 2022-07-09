import { onBeforeUnmount } from 'vue';
import { Pausable } from '../utils';

export function useRequestAnimationFrame(fn: () => void): Omit<Pausable, 'isActive'> {
	let id: ReturnType<typeof window.requestAnimationFrame> | null = null;

	function loop() {
		fn();
		id = window.requestAnimationFrame(loop);
	}

	function pause() {
		if (id) {
			window.cancelAnimationFrame(id);
		}
	}

	function resume() {
		loop();
	}

	onBeforeUnmount(() => {
		pause();
	});

	return { pause, resume };
}
