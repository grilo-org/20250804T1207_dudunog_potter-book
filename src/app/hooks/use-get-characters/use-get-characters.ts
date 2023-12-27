import { useQuery } from '@tanstack/react-query'
import {
	GetCharactersRequest,
	getCharacters,
} from '@/app/services/get-characters'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10

export function useGetCharacters(params?: GetCharactersRequest) {
	const {
		data: characters,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: getCharacters.getCacheKey({
			currentPage: params?.currentPage,
			rowsPerPage: params?.rowsPerPage,
			name: params?.name,
		}),
		queryFn: async () => {
			const pageResult = await getCharacters.execute({
				currentPage: params?.currentPage || DEFAULT_PAGE,
				rowsPerPage: params?.rowsPerPage || DEFAULT_PAGE_SIZE,
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
		retry: 2,
		keepPreviousData: true,
	})

	return {
		characters,
		isFetching,
		isLoading,
	}
}
