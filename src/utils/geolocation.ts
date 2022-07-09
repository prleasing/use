import { ref } from '@vue/reactivity';

export async function useGeolocation() {
	const location = ref<GeolocationPosition | null>(null);

	function getPosition() {
		return new Promise((resolve) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position: GeolocationPosition) => {
						resolve(position);
					},
					() => {
						resolve(null);
					}
				);
			} else {
				resolve(null);
			}
		});
	}

	await getPosition();

	return { location, getPosition };
}
