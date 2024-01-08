export type PotionProps = {
	id: string
	type: string
	characteristics: string
	difficulty: string
	effect: string
	image: string
	ingredients: string
	inventors: string
	manufacturers: string
	name: string
	sideEffects: string
	time: string
	wiki: string
}

export class Potion {
	get id() {
		return this.props.id.toString()
	}

	get type() {
		return this.props.type.toString()
	}

	get characteristics() {
		return this.props.characteristics?.toString()
	}

	get difficulty() {
		return this.props.difficulty?.toString()
	}

	get effect() {
		return this.props.effect?.toString()
	}

	get image() {
		return this.props.image?.toString()
	}

	get ingredients() {
		return this.props.ingredients?.toString()
	}

	get inventors() {
		return this.props.inventors?.toString()
	}

	get manufacturers() {
		return this.props.manufacturers?.toString()
	}

	get name() {
		return this.props.name.toString()
	}

	get sideEffects() {
		return this.props.sideEffects?.toString()
	}

	get time() {
		return this.props.time?.toString()
	}

	get wiki() {
		return this.props.wiki.toString()
	}

	constructor(private readonly props: PotionProps) {}
}
