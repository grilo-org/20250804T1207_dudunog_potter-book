import { Character } from '@/entities/Character'
import { useGetCharacter } from '@/app/characters/hooks/use-get-character'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getCharacterEmptyResponseHandler,
	getCharacterErrorResponseHandler,
	getCharacterSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { renderHook, waitFor } from '@testing-library/react'

const makeSut = (handler: HttpHandler, characterId: string) => {
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetCharacter({
				id: characterId,
			}),
		{ wrapper },
	)

	return {
		result,
	}
}

describe('use-get-character hook', () => {
	test('should return a loading state while the request is in progress', async () => {
		const characterId = 'f096911b-a140-4cee-96f3-0f92b6a56102'
		const { result } = makeSut(
			getCharacterSuccessResponseHandler(characterId),
			characterId,
		)

		expect(result.current.isLoading).toBeTruthy()
	})

	test('should return a character', async () => {
		const characterId = 'f096911b-a140-4cee-96f3-0f92b6a56102'
		const { result } = makeSut(
			getCharacterSuccessResponseHandler(characterId),
			characterId,
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.character).toBeInstanceOf(Character)
		})
	})

	test('should return null when the server returns no character', async () => {
		const characterId = 'f096911b-a140-4cee-96f3-0f92b6a56102'
		const { result } = makeSut(
			getCharacterEmptyResponseHandler(characterId),
			characterId,
		)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.character).toBeNull()
		})
	})

	test('should return an error state when the request fails', async () => {
		const characterId = 'f096911b-a140-4cee-96f3-0f92b6a56102'
		const { result } = makeSut(
			getCharacterErrorResponseHandler(characterId),
			characterId,
		)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()
		})
	})
})
