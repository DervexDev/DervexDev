export function clamp(num: number, min: number, max: number): number {
	return Math.min(Math.max(num, min), max)
}

export function countKeys(array: Array<any>, key: string): number {
	let found = 0

	array.forEach((v) => {
		if (v[key]) {
			found += 1
		}
	})

	return found
}
