import { onBeforeUnmount, onMounted } from 'vue';
import { useCounter } from '../counter';

export function useMountCounter() {
	const { current, increment, decrement } = useCounter({
		min: 0,
		max: 1
	});

	onMounted(() => {
		increment();
	});
	onBeforeUnmount(() => {
		decrement();
	});
	return current;
}
