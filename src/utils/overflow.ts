import { computed } from 'vue';
import { useEventListener } from '../event';

let stack = 0;

interface Options {
	blur: number;
}
interface OverflowBodyReturn {
	disabled: (options?: Partial<Options>) => void;
	active: () => void;
}
let scrollPosition = 0;

export function useBodyOverflow(): OverflowBodyReturn {
	const scrollbarWidth = computed(() => window.innerWidth - document.documentElement.clientWidth);



	if (typeof window !== 'undefined') {
		useEventListener(window, 'resize', () => {
			document.documentElement.style.setProperty('--height', `${window.innerHeight}px`);
		});
	}

	function disabled(_options: Partial<Options> = {}) {
		stack += 1;
		const options: Options = { blur: 2, ..._options };

		if (stack === 1) {
			scrollPosition = window.scrollY;
			document.documentElement.style.setProperty('--height', `${window.innerHeight}px`);
			document.body.style.setProperty('--scroll-width-offset', `${scrollbarWidth.value}px`);
			document.body.style.setProperty('--overlay-blur', `${options.blur}px`);
			document.body.style.setProperty('--overlay-scroll-position', `${-scrollPosition}px`);
			document.documentElement.classList.add('overflow-hidden');
		}
	}
	function active() {
		stack -= 1;
		if (stack < 0) {
			stack = 0;
		}

		if (stack < 1) {
			document.body.style.removeProperty('--overlay-scroll-position');
			document.body.style.setProperty('--scroll-width-offset', `${0}px`);
			document.body.style.setProperty('--overlay-blur', `${0}px`);
			document.documentElement.classList.remove('overflow-hidden');
			// document.querySelector('.app-wrapper')?.scrollTo(0, scrollPosition);
			window.scrollTo(0, scrollPosition);
		}
	}
	return {
		disabled,
		active
	};
}
