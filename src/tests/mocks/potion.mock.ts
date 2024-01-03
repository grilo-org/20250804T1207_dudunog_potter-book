import { PotionProps } from '@/entities/Potion'
import { makePotionResponse } from '@/tests/hooks/handlers'

const {
	data: { attributes, ...basePotion },
} = makePotionResponse()

export const PotionPropsMock: PotionProps = {
	...basePotion,
	...attributes,
	sideEffects: attributes.side_effects,
}
