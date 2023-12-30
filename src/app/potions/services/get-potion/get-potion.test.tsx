import { server } from '@/setup-tests'
import { Potion } from '@/entities/Potion'
import { getPotion } from '.'
import {
	getPotionErrorResponseHandler,
	getPotionSuccessResponseHandler,
	makePotionResponse,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	return {}
}

describe('get-potion service', () => {
	test('should return a potion', async () => {
		const potionId = '6c2ba173-85e8-4708-8c1a-30620e14294a'

		const {
			data: {
				id,
				type,
				attributes: { side_effects, ...rest },
			},
		} = makePotionResponse()

		makeSut(getPotionSuccessResponseHandler(potionId))

		const potionResponse = await getPotion.execute({
			id: potionId,
		})

		expect(potionResponse).toBeInstanceOf(Potion)
		expect(potionResponse).toEqual(
			new Potion({
				...rest,
				id,
				type,
				sideEffects: side_effects,
			}),
		)
	})

	test.fails("should fails when an id wasn't passed", async () => {
		const potionId = '6c2ba173-85e8-4708-8c1a-30620e14294a'
		makeSut(getPotionSuccessResponseHandler(potionId))

		const potion = await getPotion.execute()

		expect(potion).toBeNull()
	})

	test.fails('should fails when the request fails', async () => {
		const potionId = '6c2ba173-85e8-4708-8c1a-30620e14294a'

		makeSut(getPotionErrorResponseHandler(potionId))

		const potion = await getPotion.execute({
			id: potionId,
		})

		expect(potion).toBeNull()
	})
})
