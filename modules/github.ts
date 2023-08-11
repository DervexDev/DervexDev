import fetch from 'node-fetch'

const TOKEN = process.env.GITHUB_TOKEN || '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'
const INTENSITY = 0.75
const QUERY = `
query($userName:String!) {
	user(login: $userName){
		contributionsCollection {
			contributionCalendar {
				weeks {
					contributionDays {
						contributionCount
					}
				}
			}
		}
	}
}`
const VARIABLES = `
{
	"userName": "DervexHero"
}`

interface Cache {
	lastFetched: number
	data: Array<number>
	max: number
}

// let cache: Cache = {
// 	lastFetched: Date.now(),
// 	data: [],
// 	max: 0
// }
let cache: Cache = {
	lastFetched: Math.round(Date.now() / 1000),
	data: [0, 0,  6, 0, 0, 0, 3, 1, 1, 1, 0, 0,
		0, 0,  0, 1, 3, 1, 1, 5, 0, 0, 0, 1,
		2, 4,  0, 0, 1, 0, 2, 0, 0, 0, 3, 2,
		1, 2,  0, 0, 0, 1, 0, 2, 2, 7, 0, 0,
		2, 6,  0, 1, 0, 3, 0, 0, 0, 6, 6, 0,
		3, 0,  0, 2, 3, 0, 0, 0, 0, 0, 0, 0,
		0, 0,  0, 0, 2, 3, 5, 2, 0, 0, 0, 1,
		4, 6, 11, 1, 0, 5, 0, 0, 0, 0, 1, 1,
		0, 0,  0, 1, 3, 1, 1, 5, 0, 0, 0, 1,
		2, 4,  0, 0, 1, 0, 2, 0, 0, 0, 3, 2,
		1, 2,  0, 0, 0, 1, 0, 2, 2, 7, 0, 0,
		2, 6,  0, 1, 0, 3, 0, 0, 0, 6, 6, 0,
		3, 0,  0, 2, 3, 0, 0, 0, 0, 0, 0, 0,
		0, 0,  0, 0, 2, 3, 5, 2, 0, 0, 0, 1,
		4, 6, 11, 1, 0, 5, 0, 0, 0, 0, 1, 1,
		1, 2,  0, 0, 0, 1, 0, 2, 2, 7, 0, 0,
		2, 6,  0, 1, 0, 3, 0, 0, 0, 6, 6, 0,
		3, 0,  0, 2, 3, 0, 0, 0, 0, 0, 0, 0,
		0, 0,  0, 0, 2, 3, 5, 2, 0, 0, 0, 1,
		4, 6, 11, 1, 0, 5, 0, 0, 0, 0, 1, 1,
		1, 3,  1, 1,],
	max: 11 * INTENSITY
}

export async function fetchContributions(mobile?: boolean): Promise<[Array<number>, number]> {
	if (Math.round(Date.now() / 1000) - cache.lastFetched < 3600 && cache.data.length != 0) {
		return [cache.data, cache.max]
	}

	const response: any = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${TOKEN}`
		},
		body: JSON.stringify({
			query: QUERY,
			variables: VARIABLES
		})
	})

	const {data: {user: {contributionsCollection: {contributionCalendar: {_, weeks}}}}} = await response.json()

	Object.keys(weeks).forEach((i) => {
		const week = weeks[i].contributionDays

		Object.keys(week).forEach((j) => {
			const day = week[j].contributionCount

			cache.data.push(day)

			if (cache.max < day) {
				cache.max = day
			}
		})
	})

	cache.data.reverse()
	cache.max *= INTENSITY
	cache.lastFetched = Date.now()

	if (!mobile) {
		return [cache.data, cache.max]
	} else {
		return [cache.data.slice(0, 200), cache.max]
	}
}

export function getContributions(mobile?: boolean): [Array<number>, number] {
	if (mobile) {
		return [cache.data.slice(0, 200), cache.max]
	} else {
		return [cache.data, cache.max]
	}
}
