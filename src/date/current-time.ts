import { reactive, ref, Ref, watch } from 'vue';
import { DateTime } from 'luxon';
import { useInterval } from '../utils';
import { useState } from '../state';
import { useNow } from './now';

export interface Params {
	locale: string;
}

/**
 * Получение текущей даты и времени
 *
 * @param options - опции
 */
export function useCurrentTime(options: Partial<Params> = {}): Ref<Readonly<DateTime>> {
	const params: Params = reactive({
		locale: 'en',
		...options
	});

	function setParams(dateTime: DateTime): DateTime {
		let pumped: DateTime = dateTime;

		if (params.locale) {
			pumped = pumped.setLocale(params.locale);
		}
		return pumped;
	}
	const [current, setCurrent] = useState(setParams(useNow()));

	useInterval(() => {
		setCurrent(setParams(useNow()));
	}, ref(1000));

	watch(params, () => setCurrent(setParams(useNow())));
	return current;
}
