import { useEventListener } from './event-listener';

interface Size {
	width: number;
	height: number;
}

/**
 * Вешает обработчик на изменение окна браузера
 *
 * @param {Function} cb - функция вызываемая при изменении окна браузера
 */
export function useWindowResize(cb: (size: Size) => void) {
	useEventListener(window, 'resize', () => {
		const { innerWidth: width, innerHeight: height } = window;

		cb({
			width,
			height
		});
	});
}
