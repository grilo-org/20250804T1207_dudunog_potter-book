import { GetBooksRequest, getBooks } from '@/app/services/get-books'
import { useQuery } from '@tanstack/react-query'

export function useGetBooks(params?: GetBooksRequest) {
	const {
		data: books,
		isLoading,
		isFetching,
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
		retry: 2,
		keepPreviousData: true,
	})

	return {
		books,
		isFetching,
		isLoading,
	}
}
