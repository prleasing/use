import { onBeforeUnmount, onMounted, Ref } from 'vue';

/**
 * Слежка за появлением элемента в области видимости документа
 *
 * @param $el - наблюдаемый элемент
 * @param cb - функция вызываемая при появлении/исчезновении в области видимости
 * @param options
 */
export function useIntersectionObserver<T extends HTMLElement>(
	$el: Ref<T | null>,
	cb: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void,
	options: Partial<IntersectionObserverInit> = {}
) {
	let observer: IntersectionObserver | null = null;
	if (typeof window !== 'undefined' && IntersectionObserver) {
		observer = new IntersectionObserver(([entry], observer) => {
			cb(entry, observer);
		}, options);
	}

	onMounted(() => {
		if (observer && $el.value !== null) {
			observer.observe($el.value);
		}
	});
	onBeforeUnmount(() => {
		if (observer) {
			observer.disconnect();
		}
	});

	return {
		disconnect() {
			return observer?.disconnect();
		}
	};
}
