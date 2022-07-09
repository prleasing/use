export function useLocalStorage<T>(key: string) {
	function get(): T | null {
		const value = window.localStorage.getItem(key);

		try {
			return value ? JSON.parse(value) : null;
		} catch (e) {
			let errorText;

			if (e instanceof Error) {
				errorText = e.message;
			} else if (typeof e === 'string') {
				errorText = e;
			}
			return errorText === 'Unexpected token d in JSON at position 0' ? (value as unknown as T) : null;
		}
	}

	function set(value: T) {
		if (typeof value === null) {
			window.localStorage.removeItem(key);
			return;
		}
		if (typeof value === 'string') {
			window.localStorage.setItem(key, value);
		}
		window.localStorage.setItem(key, JSON.stringify(value));
	}

	return { get, set };
}
