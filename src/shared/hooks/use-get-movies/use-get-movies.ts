import { GetMoviesRequest, getMovies } from '@/shared/services/get-movies'
import { useQuery } from '@tanstack/react-query'

export function useGetMovies(params?: GetMoviesRequest) {
	const {
		data: movies,
		isLoading,
		isFetching,
		isSuccess,
		isError,
	} = useQuery({
		queryKey: getMovies.getCacheKey({
			name: params?.name,
		}),
		queryFn: async () => {
			const pageResult = await getMovies.execute({
				name: params?.name,
			})

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
		movies,
		isFetching,
		isLoading,
		isSuccess,
		isError,
	}
}
