import { CharacterProps } from '@/entities/Character'
import { makeCharacterResponse } from '@/tests/hooks/handlers'

const {
	data: { attributes, ...baseCharacter },
} = makeCharacterResponse()

export const CharacterPropsMock: CharacterProps = {
	...baseCharacter,
	...attributes,
	aliasNames: attributes.alias_names,
	bloodStatus: attributes.blood_status,
	eyeColor: attributes.eye_color,
	familyMembers: attributes.family_members,
	hairColor: attributes.hair_color,
	maritalStatus: attributes.marital_status,
}
