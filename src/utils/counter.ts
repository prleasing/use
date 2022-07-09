import { clamp, extend } from '@prleasing/utility';
import { useState } from '../state';

interface Clamp {
	min: number;
	max: number;
}
interface Counter extends Clamp {
	start: number;
}

/**
 * Создает счетчик
 *
 * @example
 * 	import { useCounter } from '@prleasing/use';
 * 	const { current, increment, decrement, reset } = useCounter();
 *
 * @param _params
 * @param _params
 */
export function useCounter(_params: Partial<Counter> = {}) {
	const params: Counter = extend(
		{
			start: 0,
			min: -Number.MAX_SAFE_INTEGER,
			max: Number.MAX_SAFE_INTEGER
		},
		_params
	);

	const [current, setCurrent] = useState(params.start);

	function increment() {
		setCurrent(clamp(params.min, current.value + 1, params.max));
	}
	function decrement() {
		setCurrent(clamp(params.min, current.value - 1, params.max));
	}

	function reset() {
		setCurrent(0);
	}
	return { current, increment, decrement, reset };
}
