import { useGetCharacter } from '@/app/characters/hooks/use-get-character'
import { CharacterTabsList } from '@/app/characters/components/character-tabs-list'
import { server } from '@/setup-tests'
import { makeRouterSut, resetMockRouter, wrapper } from '@/tests/utils'
import { getCharacterSuccessResponseHandler } from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import {
	fireEvent,
	render,
	renderHook,
	screen,
	waitFor,
} from '@testing-library/react'

const makeSut = (handler?: HttpHandler) => {
	const characterId = '70107ed4-9555-4d21-8fbc-c79bd90800ba'

	makeRouterSut()

	if (handler) {
		server.use(handler)
	}

	const { result } = renderHook(
		() =>
			useGetCharacter({
				id: characterId,
			}),
		{ wrapper },
	)

	render(<CharacterTabsList characterId={characterId} />, {
		wrapper: ({ children }) =>
			wrapper({
				children: <MemoryRouterProvider>{children}</MemoryRouterProvider>,
			}),
	})

	return {
		result,
	}
}

describe('character-tabs-list component', () => {
	afterEach(() =>
		resetMockRouter('/characters/70107ed4-9555-4d21-8fbc-c79bd90800ba'),
	)

	test('should renders character details correctly', async () => {
		const characterId = '70107ed4-9555-4d21-8fbc-c79bd90800ba'

		makeSut(getCharacterSuccessResponseHandler(characterId))

		expect(screen.getByTestId('character-tabs')).toBeInTheDocument()
	})

	test('should change tab content when click in a tab', async () => {
		const characterId = '70107ed4-9555-4d21-8fbc-c79bd90800ba'
		const wandsTabKey = 'wands'

		const { result } = makeSut(getCharacterSuccessResponseHandler(characterId))

		await waitFor(() => {
			expect(result.current.isSuccess).toBeTruthy()

			const lastTab = screen.getByTestId(`${wandsTabKey}-tab-item-header`)

			fireEvent.click(lastTab)

			expect(
				screen.getByTestId(`${wandsTabKey}-tab-item-content`),
			).toBeInTheDocument()
		})
	})
})
