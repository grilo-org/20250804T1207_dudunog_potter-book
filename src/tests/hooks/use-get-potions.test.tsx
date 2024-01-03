import { Potion } from '@/entities/Potion'
import { Pagination } from '@/entities/Pagination'
import { useGetPotions } from '@/shared/hooks/use-get-potions'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getPotionsNullBodyResponseHandler,
	getPotionsErrorResponseHandler,
	getPotionsSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { renderHook, waitFor } from '@testing-library/react'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	const { result } = renderHook(() => useGetPotions(), { wrapper })

	return {
		result,
	}
}

describe('use-get-potions hook', () => {
	test('should return a loading state while the request is in progress', async () => {
		const { result } = makeSut(getPotionsSuccessResponseHandler)

		expect(result.current.isLoading).toBeTruthy()
	})

	test('should return a list of potions', async () => {
		const { result } = makeSut(getPotionsSuccessResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.potions).toBeInstanceOf(Pagination)
			expect(Array.isArray(result.current.potions?.data)).toBeTruthy()
			expect(result.current.potions?.data).toHaveLength(5)

			result.current.potions?.data?.forEach(potion => {
				expect(potion).toBeInstanceOf(Potion)
			})
		})
	})

	test('should return an empty list when the server returns no potions', async () => {
		const { result } = makeSut(getPotionsNullBodyResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.potions?.data).toEqual([])
		})
	})

	test('should return an error state when the request fails', async () => {
		const { result } = makeSut(getPotionsErrorResponseHandler)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()
		})
	})
})
