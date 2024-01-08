export type SpellProps = {
	id: string
	type: string
	category: string
	creator: string
	effect: string
	hand: string
	image: string
	incantation: string
	light: string
	name: string
	wiki: string
}

export class Spell {
	get id() {
		return this.props.id.toString()
	}

	get type() {
		return this.props.type.toString()
	}

	get category() {
		return this.props.category?.toString()
	}

	get creator() {
		return this.props.creator?.toString()
	}

	get effect() {
		return this.props.effect.toString()
	}

	get hand() {
		return this.props.hand?.toString()
	}

	get image() {
		return this.props.image?.toString()
	}

	get incantation() {
		return this.props.incantation?.toString()
	}

	get light() {
		return this.props.light?.toString()
	}

	get name() {
		return this.props.name.toString()
	}

	get wiki() {
		return this.props.wiki.toString()
	}

	constructor(private readonly props: SpellProps) {}
}
