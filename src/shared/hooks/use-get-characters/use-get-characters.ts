import {
	DEFAULT_PAGINATION_PAGE,
	DEFAULT_PAGINATION_PAGE_SIZE,
} from '@/constants'
import {
	GetCharactersRequest,
	getCharacters,
} from '@/shared/services/get-characters'
import { useQuery } from '@tanstack/react-query'

export function useGetCharacters(params?: GetCharactersRequest) {
	const {
		data: characters,
		isLoading,
		isFetching,
		isSuccess,
		isError,
	} = useQuery({
		queryKey: getCharacters.getCacheKey({
			currentPage: params?.currentPage,
			rowsPerPage: params?.rowsPerPage,
			name: params?.name,
		}),
		queryFn: async () => {
			const pageResult = await getCharacters.execute({
				currentPage: params?.currentPage || DEFAULT_PAGINATION_PAGE,
				rowsPerPage: params?.rowsPerPage || DEFAULT_PAGINATION_PAGE_SIZE,
				name: params?.name,
			})

			return pageResult
		},
		enabled: true,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		keepPreviousData: true,
	})

	return {
		characters,
		isFetching,
		isLoading,
		isSuccess,
		isError,
	}
}
