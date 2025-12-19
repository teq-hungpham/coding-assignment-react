import { useState } from "react";

export function useMutation<T, Payload>({
	mutationFn,
}: {
	mutationFn: (variables: Payload) => Promise<T>;
}) {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const mutate = async (variables: Payload) => {
		try {
			setIsLoading(true);
			setError(null);

			const result = await mutationFn(variables);
			setData(result);
			return result;
		} catch (err) {
			setError(
				err instanceof Error ? err : new Error("An unknown error occurred"),
			);
			return null;
		} finally {
			setIsLoading(false);
		}
	};

	return { data, isLoading, error, mutate };
}
