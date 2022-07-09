import { useState } from '../state';

export function useLoading(init = false) {
	const [loading, setLoading] = useState(init);
	const start = () => {
		setLoading(true);
	};
	const stop = () => {
		setLoading(false);
	};

	return {
		isLoading: loading,
		start,
		stop
	};
}
