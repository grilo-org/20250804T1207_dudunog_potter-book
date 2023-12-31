import { GetBooksRequest, getBooks } from '@/shared/services/get-books'
import { useQuery } from '@tanstack/react-query'

export function useGetBooks(params?: GetBooksRequest) {
	const {
		data: books,
		isLoading,
		isFetching,
		isSuccess,
		isError,
		error,
	} = useQuery({
		queryKey: getBooks.getCacheKey(),
		queryFn: async () => {
			const pageResult = await getBooks.execute(params)

			if (pageResult) {
				return pageResult
			}

			return null
		},
		enabled: true,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		keepPreviousData: true,
	})

	return {
		books,
		isFetching,
		isLoading,
		isSuccess,
		isError,
		error,
	}
}
