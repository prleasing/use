import { Ref, ref, watch } from 'vue';
import { useLocalStorage } from './localstorage';

export function useLocalStorageReactive<T>(key: string) {
	const { get, set } = useLocalStorage(key);
	const item = ref(get());

	watch(item, set);

	return item as Ref<T | null>;
}
