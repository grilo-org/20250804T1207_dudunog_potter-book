type CharacterProps = {
	id: string
	type: string
	born: string
	gender: string
	image: string
	jobs: string[]
	name: string
	nationality: string
	slug: string
	species: string
	wands: string[]
	wiki: string
}

export class Character {
	get id() {
		return this.props.id.toString()
	}

	get type() {
		return this.props.type.toString()
	}

	get born() {
		return this.props.born.toString()
	}

	get gender() {
		return this.props.gender.toString()
	}

	get image() {
		return this.props.image?.toString()
	}

	get jobs() {
		return this.props.jobs.toString()
	}

	get name() {
		return this.props.name.toString()
	}

	get nationality() {
		return this.props.nationality.toString()
	}

	get slug() {
		return this.props.slug.toString()
	}

	get species() {
		return this.props.species.toString()
	}

	get wands() {
		return this.props.wands.toString()
	}

	get wiki() {
		return this.props.wiki.toString()
	}

	constructor(private readonly props: CharacterProps) {}
}
