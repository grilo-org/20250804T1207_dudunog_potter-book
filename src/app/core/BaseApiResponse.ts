export type BaseApiMetadata = {
	pagination: {
		current: number
		records: number
	}
}

export type BaseApiResponse<ResponseType> = {
	data: ResponseType
	meta: BaseApiMetadata
}
