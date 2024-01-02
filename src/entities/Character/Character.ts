export type CharacterProps = {
	id: string
	type: string
	aliasNames: string[]
	bloodStatus: string
	born: string
	eyeColor: string
	familyMembers: string[]
	gender: string
	hairColor: string
	height: string
	house: string
	image: string
	jobs: string[]
	maritalStatus: string
	name: string
	nationality: string
	patronus: string
	romances: string[]
	slug: string
	species: string
	wands: string[]
	weight: string
	boggart: string
	wiki: string
}

export class Character {
	get id() {
		return this.props.id.toString()
	}

	get type() {
		return this.props.type.toString()
	}

	get aliasNames() {
		return this.props.aliasNames
	}

	get bloodStatus() {
		return this.props.bloodStatus?.toString()
	}

	get born() {
		return this.props.born?.toString()
	}

	get eyeColor() {
		return this.props.eyeColor?.toString()
	}

	get familyMembers() {
		return this.props.familyMembers
	}

	get gender() {
		return this.props.gender?.toString()
	}

	get hairColor() {
		return this.props.hairColor?.toString()
	}

	get height() {
		return this.props.height?.toString()
	}

	get house() {
		return this.props.house?.toString()
	}

	get image() {
		return this.props.image?.toString()
	}

	get jobs() {
		return this.props.jobs
	}

	get maritalStatus() {
		return this.props.maritalStatus?.toString()
	}

	get name() {
		return this.props.name.toString()
	}

	get nationality() {
		return this.props.nationality?.toString()
	}

	get patronus() {
		return this.props.patronus?.toString()
	}

	get romances() {
		return this.props.romances
	}

	get slug() {
		return this.props.slug.toString()
	}

	get species() {
		return this.props.species?.toString()
	}

	get wands() {
		return this.props.wands
	}

	get weight() {
		return this.props.weight?.toString()
	}

	get boggart() {
		return this.props.boggart?.toString()
	}

	get wiki() {
		return this.props.wiki.toString()
	}

	constructor(private readonly props: CharacterProps) {}
}
