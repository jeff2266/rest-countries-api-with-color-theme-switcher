import * as React from 'react'

export default function useDebounce(value: string, delay: number = 500): [string, (value: string) => void] {
	const [debouncedValue, setDebouncedValue] = React.useState<string>(value)
	const timer = React.useRef(null)

	return [
		debouncedValue,
		(value?: string) => {
			if (timer.current !== null) clearTimeout(timer.current)
			timer.current = setTimeout(() => {
				setDebouncedValue(value)
			}, delay)
		}
	]
}
