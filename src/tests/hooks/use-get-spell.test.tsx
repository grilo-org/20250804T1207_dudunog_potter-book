import { Spell } from '@/entities/Spell'
import { useGetSpell } from '@/app/spells/hooks/use-get-spell'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getSpellEmptyResponseHandler,
	getSpellErrorResponseHandler,
	getSpellSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { renderHook, waitFor } from '@testing-library/react'

const makeSut = (handler: HttpHandler, spellId: string) => {
	server.use(handler)

	const { result } = renderHook(
		() =>
			useGetSpell({
				id: spellId,
			}),
		{ wrapper },
	)

	return {
		result,
	}
}

describe('use-get-spell hook', () => {
	test('should return a loading state while the request is in progress', async () => {
		const spellId = '363adee4-5b00-47cc-9dab-a2ab5bbbaae4'
		const { result } = makeSut(getSpellSuccessResponseHandler(spellId), spellId)

		expect(result.current.isLoading).toBeTruthy()
	})

	test('should return a spell', async () => {
		const spellId = '363adee4-5b00-47cc-9dab-a2ab5bbbaae4'
		const { result } = makeSut(getSpellSuccessResponseHandler(spellId), spellId)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.spell).toBeInstanceOf(Spell)
		})
	})

	test('should return null when the server returns no spell', async () => {
		const spellId = '363adee4-5b00-47cc-9dab-a2ab5bbbaae4'
		const { result } = makeSut(getSpellEmptyResponseHandler(spellId), spellId)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.spell).toBeNull()
		})
	})

	test('should return an error state when the request fails', async () => {
		const spellId = '363adee4-5b00-47cc-9dab-a2ab5bbbaae4'
		const { result } = makeSut(getSpellErrorResponseHandler(spellId), spellId)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()
		})
	})
})
