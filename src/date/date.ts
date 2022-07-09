import { DateTime } from 'luxon';

export function useCurrentDate() {
	return DateTime.now();
}
