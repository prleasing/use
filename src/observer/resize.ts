import { nextTick, onBeforeMount, onMounted, Ref } from 'vue';

/**
 * Слежка за изменением размера элемента или его потомков
 *
 * @param $el - наблюдаемый элемент
 * @param cb - функция вызываемая при изменении размера
 * @param options
 */
export function useResizeObserver<T extends HTMLElement>(
	$el: Ref<T | null>,
	cb: (entry: ResizeObserverEntry) => void,
	options: Partial<ResizeObserverOptions> = {}
) {
	const observer = new ResizeObserver(([entry]) => {
		cb(entry);
	});

	onMounted(async () => {
		await nextTick();
		if ($el.value !== null) {
			observer.observe($el.value, {
				...options
			});
		}
	});
	onBeforeMount(() => {
		observer.disconnect();
	});
}
