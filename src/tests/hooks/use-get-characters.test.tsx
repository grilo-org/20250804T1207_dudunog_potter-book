import { Character } from '@/entities/Character'
import { Pagination } from '@/entities/Pagination'
import { useGetCharacters } from '@/shared/hooks/use-get-characters'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getCharactersErrorResponseHandler,
	getCharactersNullBodyResponseHandler,
	getCharactersSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { renderHook, waitFor } from '@testing-library/react'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	const { result } = renderHook(() => useGetCharacters(), { wrapper })

	return {
		result,
	}
}

describe('use-get-characters hook', () => {
	test('should return a loading state while the request is in progress', async () => {
		const { result } = makeSut(getCharactersSuccessResponseHandler)

		expect(result.current.isLoading).toBeTruthy()
	})

	test('should return a list of characters', async () => {
		const { result } = makeSut(getCharactersSuccessResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.characters).toBeInstanceOf(Pagination)
			expect(Array.isArray(result.current.characters?.data)).toBeTruthy()
			expect(result.current.characters?.data).toHaveLength(5)

			result.current.characters?.data?.forEach(character => {
				expect(character).toBeInstanceOf(Character)
			})
		})
	})

	test('should return an empty list when the server returns no characters', async () => {
		const { result } = makeSut(getCharactersNullBodyResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.characters?.data).toEqual([])
		})
	})

	test('should return an error state when the request fails', async () => {
		const { result } = makeSut(getCharactersErrorResponseHandler)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()
		})
	})
})
