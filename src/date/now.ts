import { DateTime } from 'luxon';

/** Получение нового инстанса DateTime */
export function useNow() {
	return DateTime.now();
}
