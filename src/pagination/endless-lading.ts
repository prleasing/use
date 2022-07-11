import { computed, ComputedRef, ref, Ref, watch } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { UnwrapNestedRefs } from '@vue/reactivity';
import { useRef } from '../utils';
import { useIntersectionObserver } from '../observer';

interface UseEndlessLadingParams {
	show: number;
	increment: number;
	auto: boolean;
}

/**
 * Постепенная загрузка элементов
 *
 * @param collect - показываемые элементы
 * @param params
 */
export function useEndlessLading<T>(
	collect: Ref<T[]>,
	params: Partial<UnwrapNestedRefs<UseEndlessLadingParams>> = {}
): {
	hidden: ComputedRef<number>;
	items: ComputedRef<T[]>;
	trigger: Ref<HTMLElement | null>;
	more(): void;
} {
	const showStartCount = computed(() => params.show ?? 10);
	const showCount = ref(showStartCount.value);
	const count = computed(() => collect.value.length);
	const items = computed(() => collect.value.slice(0, showCount.value));
	const hidden = computed(() => count.value - showCount.value);

	const trigger = useRef<HTMLElement>();

	function more() {
		showCount.value += params.increment ?? showCount.value;
	}
	useIntersectionObserver(trigger, (entry) => {
		if (entry.isIntersecting && params.auto) {
			more();
		}
	});

	watch(count, () => {
		showCount.value = showStartCount.value;
	});
	return { items, hidden, more, trigger };
}
