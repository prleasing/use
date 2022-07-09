import { getCurrentInstance, ref, Ref } from 'vue';
import { nope } from '@prleasing/utility';
import { useEventListener } from './event-listener';

interface Params {
	onFocus: (event: FocusEvent) => void;
	onBlur: (event: FocusEvent) => void;
}

/**
 * Вешает события фокуса на элемент
 *
 * @param $el - целевой элемент
 * @param config
 */
export function useFocusElement<T extends HTMLElement>($el: Ref<T | null>, config: Partial<ParamsFocusElement> = {}) {
	const params: ParamsFocusElement = {
		onFocus: nope,
		onBlur: nope,
		...config
	};

	if (params.onFocus) {
		useEventListener($el, 'focus', params.onFocus);
	}
	if (params.onBlur) {
		useEventListener($el, 'blur', params.onBlur);
	}

	function focus() {
		$el.value?.focus();
	}
	function blur() {
		$el.value?.blur();
	}
	return [focus, blur];
}

export function useFocus(config: Partial<Params> = {}) {
	const params: Params = {
		onFocus: nope,
		onBlur: nope,
		...config
	};
	const vm = getCurrentInstance();
	const emit = vm?.emit;
	const focused = ref(false);

	function focus(event: FocusEvent) {
		focused.value = true;
		params.onFocus(event);
		if (emit) {
			emit('focus', event);
		}
	}
	function blur(event: FocusEvent) {
		focused.value = false;
		params.onBlur(event);
		if (emit) {
			emit('blur', event);
		}
	}
	return { focused, focus, blur };
}

interface ParamsFocusElement {
	onFocus: (event: FocusEvent) => void;
	onBlur: (event: FocusEvent) => void;
}
