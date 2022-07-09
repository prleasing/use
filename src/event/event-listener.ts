import { isRef, onBeforeUnmount, onMounted, Ref } from 'vue';

/**
 * Вешает обработчик события
 *
 * @param {Element} $el - элемент на которое будет навешено событие
 * @param {String} type - тип события
 * @param {Function} cb - функция вызываемая событием
 */
export function useEventListener<T extends HTMLElement | Window, K extends keyof WindowEventMap>(
	$el: T | Ref<T | null>,
	type: K,
	cb: (event: WindowEventMap[K]) => any
) {
	onMounted(() => {
		if (isRef($el)) {
			if ($el.value) {
				$el.value.addEventListener(type, cb as any, { passive: true });
			}
		} else {
			$el.addEventListener(type, cb as any, { passive: true });
		}
	});

	onBeforeUnmount(() => {
		if (isRef($el)) {
			if ($el.value) {
				$el.value.removeEventListener(type, cb as any, {});
			}
		} else {
			$el.removeEventListener(type, cb as any, {});
		}
	});
}
