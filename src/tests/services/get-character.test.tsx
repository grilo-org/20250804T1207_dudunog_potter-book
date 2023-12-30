import { server } from '@/setup-tests'
import { Character } from '@/entities/Character'
import { getCharacter } from '@/app/characters/services/get-character'
import {
	getCharacterErrorResponseHandler,
	getCharacterSuccessResponseHandler,
	makeCharacterResponse,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	return {}
}

describe('get-character service', () => {
	test('should return a character', async () => {
		const characterId = 'f096911b-a140-4cee-96f3-0f92b6a56102'

		const {
			data: {
				id,
				type,
				attributes: {
					alias_names,
					animagus,
					blood_status,
					died,
					eye_color,
					family_members,
					hair_color,
					marital_status,
					skin_color,
					titles,
					...attributes
				},
			},
		} = makeCharacterResponse()

		makeSut(getCharacterSuccessResponseHandler(characterId))

		const characterResponse = await getCharacter.execute({
			id: characterId,
		})

		expect(characterResponse).toBeInstanceOf(Character)
		expect(characterResponse).toEqual(
			new Character({
				...attributes,
				id,
				type,
				aliasNames: alias_names,
				bloodStatus: blood_status,
				eyeColor: eye_color,
				familyMembers: family_members,
				hairColor: hair_color,
				maritalStatus: marital_status,
			}),
		)
	})

	test.fails("should fails when an id wasn't passed", async () => {
		const characterId = 'f096911b-a140-4cee-96f3-0f92b6a56102'
		makeSut(getCharacterSuccessResponseHandler(characterId))

		const character = await getCharacter.execute()

		expect(character).toBeNull()
	})

	test.fails('should fails when the request fails', async () => {
		const characterId = 'f096911b-a140-4cee-96f3-0f92b6a56102'

		makeSut(getCharacterErrorResponseHandler(characterId))

		const character = await getCharacter.execute({
			id: characterId,
		})

		expect(character).toBeNull()
	})
})
