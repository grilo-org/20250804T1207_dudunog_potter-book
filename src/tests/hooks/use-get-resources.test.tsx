import { Book } from '@/entities/Book'
import { Character } from '@/entities/Character'
import { Movie } from '@/entities/Movie'
import { Potion } from '@/entities/Potion'
import { Spell } from '@/entities/Spell'
import { useGetResources } from '@/shared/hooks/use-get-resources'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getBooksNullBodyResponseHandler,
	getBooksErrorResponseHandler,
	getBooksSuccessResponseHandler,
	getCharactersEmptyResponseHandler,
	getCharactersErrorResponseHandler,
	getCharactersSuccessResponseHandler,
	getMoviesEmptyResponseHandler,
	getMoviesErrorResponseHandler,
	getMoviesSuccessResponseHandler,
	getPotionsEmptyResponseHandler,
	getPotionsErrorResponseHandler,
	getPotionsSuccessResponseHandler,
	getSpellsEmptyResponseHandler,
	getSpellsErrorResponseHandler,
	getSpellsSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { renderHook, waitFor } from '@testing-library/react'

const makeSut = async (...handler: Array<HttpHandler>) => {
	server.use(...handler)

	const { result } = renderHook(() => useGetResources(), { wrapper })

	return {
		result,
	}
}

describe('use-get-resources hook', async () => {
	test('should return resources', async () => {
		const name = 'Harry Potter'
		const { result } = await makeSut(
			getBooksSuccessResponseHandler,
			getCharactersSuccessResponseHandler,
			getMoviesSuccessResponseHandler,
			getPotionsSuccessResponseHandler,
			getSpellsSuccessResponseHandler,
		)

		const resources = await result.current.getResources({
			name,
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(Array.isArray(resources)).toBeTruthy()

			resources.forEach(resource => {
				const resourcesClasses = [Book, Character, Movie, Potion, Spell]
				expect(resourcesClasses.some(c => resource instanceof c)).toBeTruthy()
			})
		})
	})

	test('should return an empty list when the server returns no resources', async () => {
		const name = 'Harry Potter'
		const { result } = await makeSut(
			getBooksNullBodyResponseHandler,
			getCharactersEmptyResponseHandler,
			getMoviesEmptyResponseHandler,
			getPotionsEmptyResponseHandler,
			getSpellsEmptyResponseHandler,
		)

		const resources = await result.current.getResources({
			name,
		})

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(resources).toEqual([])
		})
	})

	test.fails(
		'should return an error state when the request fails',
		async () => {
			const name = 'Harry Potter'
			const { result } = await makeSut(
				getBooksErrorResponseHandler,
				getCharactersErrorResponseHandler,
				getMoviesErrorResponseHandler,
				getPotionsErrorResponseHandler,
				getSpellsErrorResponseHandler,
			)

			await result.current.getResources({
				name,
			})

			await waitFor(() => {
				expect(result.current.isError).toBeTruthy()
			})
		},
	)
})
