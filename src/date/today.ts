import { reactive, Ref, ref, unref, watch } from 'vue';
import { DateTime } from 'luxon';
import { Params, useCurrentTime } from './current-time';

/**
 * Получение текущего дня
 *
 * @param options
 */
export function useToday(options: Partial<Params> = reactive({})) {
	let currentTime = useCurrentTime(options);
	const today = ref(unref(currentTime).startOf('day'));

	watch(currentTime, (real, past) => {
		if (real.toISODate() !== past.toISODate()) {
			today.value = real.startOf('day');
		}
	});

	watch(options, () => {
		currentTime = useCurrentTime(options);
	});
	return [today, currentTime as Ref<Readonly<DateTime>>];
}
