import { computed, reactive, ref, unref, watch } from 'vue';
import { DateTime, Interval } from 'luxon';
import { useToday } from './today';
import { Params } from './current-time';

type DateTimeFormatFunction = (dateTime: DateTime) => string;

type DateTimeFormat = string | DateTimeFormatFunction;
export interface ParamsCalendar extends Params {
	monthFormat: DateTimeFormat;
	start: DateTime;
	min: DateTime;
	max: DateTime;
}
const defaultMonthFormat = 'LLLL';

export interface CalendarDay {
	key: string;
	dateTime: DateTime;
	title: number;
	isToday: boolean;
	isCurrentMouth: boolean;
	disabled: boolean;
}
export type Calendar = Array<Array<CalendarDay>>;

/**
 * Создает календарь
 *
 * @param {Object} opt - опции календаря
 *
 * @returns {Object}
 */
export function useCalendar(opt: Partial<ParamsCalendar> = {}) {
	const locale = computed(() => opt.locale ?? 'en');
	const monthFormat = computed(() => {
		if (opt.monthFormat) {
			const { monthFormat } = opt;

			if (typeof monthFormat === 'function') {
				return monthFormat;
			}
			return (dateTime: DateTime) => dateTime.toFormat(monthFormat);
		}
		return (dateTime: DateTime) => dateTime.toFormat(defaultMonthFormat);
	});
	const min = computed(() => {
		if (opt.min) {
			return opt.min;
		}
		return DateTime.now().setLocale(unref(locale)).startOf('year').plus({ year: -5 });
	});

	const max = computed(() => {
		if (opt.max) {
			return opt.max;
		}
		return unref(min).endOf('year').plus({ year: 10 });
	});

	const [today] = useToday(
		reactive({
			locale
		})
	);

	const active = ref(opt.start ? opt.start : today.value.startOf('month'));
	const year = computed<number>({
		get() {
			return active.value.year;
		},
		set(value) {
			active.value = active.value.set({ year: value });
		}
	});

	function checkMinMax(value: DateTime): DateTime {
		if (value.toSeconds() > max.value.toSeconds()) {
			return max.value;
		}
		if (value.toSeconds() < min.value.toSeconds()) {
			return min.value;
		}
		return value;
	}
	function prev() {
		active.value = checkMinMax(unref(active).plus({ month: -1 }));
	}
	function next() {
		active.value = checkMinMax(unref(active).plus({ month: +1 }));
	}
	const month = computed(() => monthFormat.value(unref(active)));

	const calendar = computed<Calendar>(() => {
		const startOfMonth = unref(active).startOf('month');
		const endOfMonth = unref(active).endOf('month');
		const currentMonth = unref(active).toFormat('y-LL');

		let start = startOfMonth;
		let stop = endOfMonth;

		if (startOfMonth.weekday !== 1) {
			start = startOfMonth.startOf('week');
		}
		if (endOfMonth.weekday < 7) {
			stop = endOfMonth.endOf('week');
		}

		const weeks: Array<CalendarDay[]> = [[]];

		for (let i = 0; i < Math.ceil(Interval.fromDateTimes(start, stop).toDuration('days').days); i += 1) {
			const current = start.plus({ day: i });
			const seconds = current.toSeconds();

			const disabled = seconds < unref(min).toSeconds() || seconds > unref(max).toSeconds();

			weeks[weeks.length - 1].push({
				title: current.day,
				key: current.toISODate(),
				dateTime: current,
				isCurrentMouth: currentMonth === current.toFormat('y-LL'),
				isToday: today.value.toISODate() === current.toISODate(),
				disabled
			});
			if (current.weekday % 7 === 0) {
				weeks.push([]);
			}
		}
		return weeks;
	});
	const weeksTitle = computed(() => {
		const date = DateTime.now().startOf('week');

		return Array(7)
			.fill(1)
			.map((_: any, index) => date.plus({ day: index }).setLocale(locale.value).toFormat('ccc'));
	});

	watch(active, () => {
		active.value = checkMinMax(active.value);
	});
	return { active, weeksTitle, calendar, today, year, month, next, prev };
}
