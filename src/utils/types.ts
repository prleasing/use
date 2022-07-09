import type { Ref } from 'vue';

export interface Pausable {
	isActive: Ref<boolean>;
	pause: () => void;
	resume: () => void;
}
