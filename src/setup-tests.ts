import '@testing-library/jest-dom'
import { setupServer } from 'msw/node'
import { handlers } from '@/tests/utils'

export const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
