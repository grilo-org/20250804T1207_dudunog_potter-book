import {
	DEFAULT_PAGINATION_PAGE,
	DEFAULT_PAGINATION_PAGE_SIZE,
} from '@/constants'
import { GetSpellsRequest, getSpells } from '@/shared/services/get-spells'
import { useQuery } from '@tanstack/react-query'

export function useGetSpells(params?: GetSpellsRequest) {
	const {
		data: spells,
		isLoading,
		isFetching,
		isSuccess,
		isError,
	} = useQuery({
		queryKey: getSpells.getCacheKey({
			currentPage: params?.currentPage,
			rowsPerPage: params?.rowsPerPage,
			name: params?.name,
		}),
		queryFn: async () => {
			const pageResult = await getSpells.execute({
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
		spells,
		isFetching,
		isLoading,
		isSuccess,
		isError,
	}
}
