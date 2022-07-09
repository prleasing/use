import { computed, ref, Ref, watch } from 'vue';
import gsap from 'gsap';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComputedRef } from '@vue/reactivity';

export function useTweenNumber<T extends number>(
	currentValue: Ref<T> | ComputedRef<T>,
	onUpdate: (value: number) => void
) {
	const tweenValue = ref(currentValue.value);
	const animatedTeenValue = computed<string>(() => {
		try {
			return tweenValue.value.toFixed(0);
		} catch {
			return '0';
		}
	});

	watch(currentValue, (value) => {
		gsap.to(tweenValue, {
			duration: 0.2,
			value,
			onUpdate() {
				onUpdate(parseInt(animatedTeenValue.value, 10));
			}
		});
	});
}
