import { computed, ref } from 'vue';
import { DateTime } from 'luxon';
import { useCurrentDate } from './date';

/**
 * Форматирует дату DateTime в заданный формат
 *
 * @param init - дата
 * @param fmt - функция форматирования
 */
export function useDateFormat(init: string | null, fmt: (date: DateTime) => string) {
	const date = ref(init ?? useCurrentDate().toISODate());

	return [date, computed(() => fmt(DateTime.fromISO(date.value)))];
}
