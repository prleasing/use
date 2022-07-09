import { getCurrentInstance, ref } from 'vue';
import { nope } from '@prleasing/utility';

export * from './event-listener';
export * from './focus';
export * from './window-resize';
interface Params {
	onFocus: (event: FocusEvent) => void;
	onBlur: (event: FocusEvent) => void;
}
export function useOnFocus(config: Partial<Params> = {}) {
	const params: Params = {
		onFocus: nope,
		onBlur: nope,
		...config
	};
	const vm = getCurrentInstance();
	const emit = vm?.emit;
	const isFocus = ref(false);

	function onFocus(event: FocusEvent) {
		isFocus.value = true;
		params.onFocus(event);
		if (emit) {
			emit('focus', event);
		}
	}
	function onBlur(event: FocusEvent) {
		isFocus.value = false;
		params.onBlur(event);
		if (emit) {
			emit('blur', event);
		}
	}

	return {
		isFocus,
		onFocus,
		onBlur
	};
}
