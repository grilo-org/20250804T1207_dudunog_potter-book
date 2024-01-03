import { ReactNode } from 'react'
import {
	getBooksErrorResponseHandler,
	getBooksSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import mockRouter, { Url } from 'next-router-mock'
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes'

export const handlers = [
	getBooksSuccessResponseHandler,
	getBooksErrorResponseHandler,
]

const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	})

export const wrapper = ({ children }: { children: ReactNode }) => {
	const queryClient = createQueryClient()
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

export const makeRouterSut = () => {
	mockRouter.useParser(
		createDynamicRouteParser([
			'/books',
			'/books/[id]',
			'/characters',
			'/characters/[id]',
			'/movies',
			'/movies/[id]',
			'/potions',
			'/potions/[id]',
			'/spells',
			'/spells/[id]',
		]),
	)
}

export const resetMockRouter = (initialUrl: Url) => {
	mockRouter.setCurrentUrl(initialUrl)
}
