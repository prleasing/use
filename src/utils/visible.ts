import { Ref, ref, watch } from 'vue';
import { useIntersectionObserver } from '../observer';

interface Params {
	once: boolean;
}

export function useVisible($el: Ref<HTMLElement | null>, params: Partial<Params> = {}) {
	const visible = ref<boolean>(false);
	const { disconnect } = useIntersectionObserver($el, ({ isIntersecting }) => {
		if (params.once === true) {
			if (isIntersecting) {
				visible.value = isIntersecting;
				disconnect();
			}
		} else {
			visible.value = isIntersecting;
		}
	});

	watch(visible, () => {
		if (visible.value === true && params.once) {
			disconnect();
		}
	});
	return visible;
}
