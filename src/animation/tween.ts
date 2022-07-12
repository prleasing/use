import { computed, ref, Ref, watch } from 'vue';
import type { ComputedRef } from '@vue/reactivity';

const gsapAsync = () => import(/* webpackChunkName: "gsap" */ 'gsap');

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
		gsapAsync().then(({ default: gsap }) => {
			gsap.to(tweenValue, {
				duration: 0.2,
				value,
				onUpdate() {
					onUpdate(parseInt(animatedTeenValue.value, 10));
				}
			});
		});
	});
}
