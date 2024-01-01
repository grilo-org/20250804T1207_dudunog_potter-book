import { Spell } from '@/entities/Spell'
import { Pagination } from '@/entities/Pagination'
import { useGetSpells } from '@/shared/hooks/use-get-spells'
import { server } from '@/setup-tests'
import { wrapper } from '@/tests/utils'
import {
	getSpellsNullBodyResponseHandler,
	getSpellsErrorResponseHandler,
	getSpellsSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { renderHook, waitFor } from '@testing-library/react'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	const { result } = renderHook(() => useGetSpells(), { wrapper })

	return {
		result,
	}
}

describe('use-get-spells hook', () => {
	test('should return a loading state while the request is in progress', async () => {
		const { result } = makeSut(getSpellsSuccessResponseHandler)

		expect(result.current.isLoading).toBeTruthy()
	})

	test('should return a list of spells', async () => {
		const { result } = makeSut(getSpellsSuccessResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.spells).toBeInstanceOf(Pagination)
			expect(Array.isArray(result.current.spells?.data)).toBeTruthy()
			expect(result.current.spells?.data).toHaveLength(5)

			result.current.spells?.data?.forEach(spell => {
				expect(spell).toBeInstanceOf(Spell)
			})
		})
	})

	test('should return an empty list when the server returns no spells', async () => {
		const { result } = makeSut(getSpellsNullBodyResponseHandler)

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()
			expect(result.current.spells?.data).toEqual([])
		})
	})

	test('should return an error state when the request fails', async () => {
		const { result } = makeSut(getSpellsErrorResponseHandler)

		await waitFor(() => {
			expect(result.current.isError).toBeTruthy()
		})
	})
})
