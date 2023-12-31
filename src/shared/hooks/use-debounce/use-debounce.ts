import { useCallback, useState } from 'react'
import lodash from 'lodash'

export const useDebounce = (obj: any = null, time = 1000): any[] => {
	const [state, setState] = useState(obj)

	const debounce = useCallback(
		lodash.debounce((value: string) => setState(value), time),
		[],
	)

	const setDebouncedState = (val: any): any => {
		debounce(val)
	}

	return [state, setDebouncedState]
}
