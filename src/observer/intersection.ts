import { nextTick, onBeforeUnmount, onBeforeUpdate, onMounted, onUpdated, Ref } from 'vue';

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

	function observe() {
		if (observer && $el.value !== null) {
			observer.observe($el.value);
		}
	}
	onMounted(() => {
		nextTick().then(observe);
	});

	onUpdated(() => {
		nextTick().then(observe);
	});

	function disconnect() {
		if (observer) {
			observer.disconnect();
		}
	}
	onBeforeUpdate(() => {
		nextTick().then(disconnect);
	});
	onBeforeUnmount(() => {
		nextTick().then(disconnect);
	});

	return {
		disconnect
	};
}
