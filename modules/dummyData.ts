export function getDummyData(length?: number): Array<number> {
	length = length || 360

	const data: Array<number> = []

	for (let i = 0; i < length; i++) {
		data.push(Math.random())	
	}	

	return data
}
