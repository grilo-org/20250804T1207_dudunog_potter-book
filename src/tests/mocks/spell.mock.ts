import { SpellProps } from '@/entities/Spell'
import { makeSpellResponse } from '@/tests/hooks/handlers'

const {
	data: { attributes, ...baseSpell },
} = makeSpellResponse()

export const SpellPropsMock: SpellProps = {
	...baseSpell,
	...attributes,
}
