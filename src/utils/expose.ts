import { Ref } from 'vue';
import { EmptyClass } from '@prleasing/utility';
import { useRef } from './mount';

export function useExpose<T extends EmptyClass>(_: T): Ref<InstanceType<T> | null> {
	return useRef();
}
