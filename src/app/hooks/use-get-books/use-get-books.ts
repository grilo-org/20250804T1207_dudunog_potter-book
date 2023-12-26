import { useMutation } from '@tanstack/react-query'
import { getBooks } from '@/app/services/get-books'

export function useGetBooks() {
	const { mutateAsync, isLoading, error } = useMutation(
		async (params: any) => getBooks.execute(params),
		{
			mutationKey: getBooks.getCacheKey(),
			cacheTime: Infinity,
		},
	)

	return {
		getBooks: mutateAsync,
		isLoading,
		error,
	}
}
