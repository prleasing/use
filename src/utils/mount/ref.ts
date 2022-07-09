import { Ref, ref } from 'vue';

export function useRef<T extends HTMLElement>(): Ref<T | null>;
export function useRef<T extends HTMLElement>(isArray: true): Ref<T[]>;
export function useRef<T>(...args: any[]) {
	const [isArray = false] = args;

	if (isArray) {
		return ref<T[]>([]);
	}
	return ref<T | null>(null) as Ref<T | null>;
}
