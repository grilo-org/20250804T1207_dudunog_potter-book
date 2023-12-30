import { server } from '@/setup-tests'
import { Spell } from '@/entities/Spell'
import { getSpell } from '.'
import {
	getSpellErrorResponseHandler,
	getSpellSuccessResponseHandler,
	makeSpellResponse,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	return {}
}

describe('get-spell service', () => {
	test('should return a spell', async () => {
		const spellId = '6c2ba173-85e8-4708-8c1a-30620e14294a'

		const {
			data: {
				id,
				type,
				attributes: { ...rest },
			},
		} = makeSpellResponse()

		makeSut(getSpellSuccessResponseHandler(spellId))

		const spellResponse = await getSpell.execute({
			id: spellId,
		})

		expect(spellResponse).toBeInstanceOf(Spell)
		expect(spellResponse).toEqual(
			new Spell({
				...rest,
				id,
				type,
			}),
		)
	})

	test.fails("should fails when an id wasn't passed", async () => {
		const spellId = '6c2ba173-85e8-4708-8c1a-30620e14294a'
		makeSut(getSpellSuccessResponseHandler(spellId))

		const spell = await getSpell.execute()

		expect(spell).toBeNull()
	})

	test.fails('should fails when the request fails', async () => {
		const spellId = '6c2ba173-85e8-4708-8c1a-30620e14294a'

		makeSut(getSpellErrorResponseHandler(spellId))

		const spell = await getSpell.execute({
			id: spellId,
		})

		expect(spell).toBeNull()
	})
})
