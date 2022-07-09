import { Ref } from 'vue';
import { useState } from './state';

/**
 * Создает переключатель статуса
 *
 * @param {Boolean} initValue - начальное значение
 */
export function useToggle(initValue = false): [Ref<boolean>, () => void, () => void, () => void] {
	const [state, setState] = useState<boolean>(initValue);

	function toggle() {
		setState(!state.value);
	}

	function setActive() {
		state.value = true;
	}
	function setDeactivate() {
		state.value = false;
	}
	return [state, toggle, setActive, setDeactivate];
}
