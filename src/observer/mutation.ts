import { nextTick, onBeforeMount, onMounted, Ref } from 'vue';

/**
 * Слежка за изменением DOM-элементов
 *
 * @param $el - наблюдаемый элемент
 * @param cb - функция вызываемая при изменении DOM
 * @param options
 */
export function useMutationObserver<T extends HTMLElement>(
	$el: Ref<T | null>,
	cb: (mutation: MutationRecord) => void,
	options: Partial<MutationObserverInit> = {}
) {
	const observer = new MutationObserver(([mutation]) => {
		cb(mutation);
	});

	onMounted(async () => {
		await nextTick();
		if ($el.value !== null) {
			observer.observe($el.value, {
				attributes: false,
				subtree: false,
				childList: true,
				...options
			});
		}
	});
	onBeforeMount(() => {
		observer.disconnect();
	});
}
