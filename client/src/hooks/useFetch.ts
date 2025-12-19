import { useState } from "react";

export function useFetch<T>({ fetchFn }: { fetchFn: () => Promise<T> }) {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetch = async () => {
		try {
			setIsLoading(true);
			setError(null);

			const result = await fetchFn();
			setData(result);
		} catch (err) {
			setError(
				err instanceof Error ? err : new Error("An unknown error occurred"),
			);
		} finally {
			setIsLoading(false);
		}
	};

	return { data, isLoading, error, fetch };
}
