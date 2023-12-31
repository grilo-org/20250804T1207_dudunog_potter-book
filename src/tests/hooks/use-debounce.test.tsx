import { useDebounce } from '@/shared/hooks/use-debounce'
import { wrapper } from '@/tests/utils'
import { test } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'

describe('use-debounce hook', () => {
	test('should update the state after the specified delay', async ({
		expect,
	}) => {
		const { result } = renderHook(() => useDebounce(null, 500), {
			wrapper,
		})

		act(() => {
			result.current[1]('test value')
		})

		expect(result.current[0]).toBe(null)

		await waitFor(() => expect(result.current[0]).toBe('test value'))
	})

	test("should update the state after the specified delay when parameters wasn't passed", async ({
		expect,
	}) => {
		const { result } = renderHook(() => useDebounce(), {
			wrapper,
		})

		act(() => {
			result.current[1]('test value')
		})

		expect(result.current[0]).toBe(null)

		await new Promise(resolve => setTimeout(resolve, 500))

		await waitFor(() => expect(result.current[0]).toBe('test value'))
	})
})
