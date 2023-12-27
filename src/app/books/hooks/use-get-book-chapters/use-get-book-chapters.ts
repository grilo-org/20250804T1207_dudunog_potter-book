import {
	GetBookChaptersRequest,
	getBookChapters,
} from '@/app/books/services/get-book-chapters'
import { useQuery } from '@tanstack/react-query'

export function useGetBookChapters(params?: GetBookChaptersRequest) {
	const {
		data: bookChapters,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: getBookChapters.getCacheKey({
			id: params?.id,
		}),
		queryFn: async () => {
			const pageResult = await getBookChapters.execute(params)

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
		bookChapters,
		isFetching,
		isLoading,
	}
}
