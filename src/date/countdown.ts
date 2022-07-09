import { computed, reactive } from 'vue';
import { DurationLike, DurationObjectUnits } from 'luxon/src/duration';
import { DateTime, Duration } from 'luxon';

/** Создает таймер обратного отсчета */
export function useCountdown() {
	const state = reactive<{
		remaining: DurationObjectUnits;
		finished: boolean;
	}>({
		finished: true,
		remaining: { milliseconds: 0 }
	});
	let finish: DateTime;
	// eslint-disable-next-line no-undef
	let timer: NodeJS.Timer;

	function computedRemaining(): DurationObjectUnits {
		const now = DateTime.local();

		state.finished = finish < DateTime.local();
		return finish.diff(now).toObject();
	}
	function stop() {
		state.finished = true;
		state.remaining = { milliseconds: 0 };
		clearInterval(timer);
	}
	function start(params: DurationLike) {
		finish = DateTime.local().plus(params);
		state.finished = true;
		timer = setInterval(() => {
			state.remaining = computedRemaining();
			if (state.finished) {
				stop();
			}
		}, 1000);
	}

	const formatted = computed(() => Duration.fromObject(state.remaining).toFormat('mm:ss'));

	return {
		start,
		stop,
		formatted,
		state
	};
}
