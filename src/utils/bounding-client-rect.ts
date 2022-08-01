import { onMounted, ref, Ref } from 'vue';
import { useResizeObserver } from '../observer';

const defaultValue = {
	bottom: 0,
	height: 0,
	left: 0,
	right: 0,
	top: 0,
	width: 0,
	x: 0,
	y: 0
};

export function useBoundingClientRect($el: Ref<HTMLElement | null>) {
	const boundingClientRect = ref<DOMRect>({
		...defaultValue,
		toJSON(): string {
			return JSON.stringify(defaultValue);
		}
	});

	onMounted(() => {
		if ($el.value !== null) {
			boundingClientRect.value = $el.value.getBoundingClientRect();
		}
	});

	useResizeObserver($el, () => {
		if ($el.value !== null) {
			boundingClientRect.value = $el.value.getBoundingClientRect();
		}
	});

	return boundingClientRect;
}
