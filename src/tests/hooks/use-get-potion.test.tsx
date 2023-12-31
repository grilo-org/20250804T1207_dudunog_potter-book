import { Potion } from '@/entities/Potion'
import { useGetPotion } from '@/app/potions/hooks/use-get-potion'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getPotionEmptyResponseHandler,
	getPotionErrorResponseHandler,
	getPotionSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { renderHook, waitFor } from '@testing-library/react'

const makeSut = (handler: HttpHandler, potionId: string) => {
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetPotion({
				id: potionId,
			}),
		{ wrapper },
	)

	return {
		result,
	}
}

describe('use-get-potion hook', () => {
	test('should return a loading state while the request is in progress', async () => {
		const potionId = 'af984889-3b1f-4b43-a49c-71c45d6fc012'
		const { result } = makeSut(
			getPotionSuccessResponseHandler(potionId),
			potionId,
		)

		expect(result.current.isLoading).toBeTruthy()
	})

	test('should return a potion', async () => {
		const potionId = 'af984889-3b1f-4b43-a49c-71c45d6fc012'
		const { result } = makeSut(
			getPotionSuccessResponseHandler(potionId),
			potionId,
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.potion).toBeInstanceOf(Potion)
		})
	})

	test('should return null when the server returns no potion', async () => {
		const potionId = 'af984889-3b1f-4b43-a49c-71c45d6fc012'
		const { result } = makeSut(
			getPotionEmptyResponseHandler(potionId),
			potionId,
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.potion).toBeNull()
		})
	})

	test('should return an error state when the request fails', async () => {
		const potionId = 'af984889-3b1f-4b43-a49c-71c45d6fc012'
		const { result } = makeSut(
			getPotionErrorResponseHandler(potionId),
			potionId,
		)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()
		})
	})
})
