import fetch from 'node-fetch'

const TOKEN = process.env.GITHUB_TOKEN
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

let cache: Cache = {
	lastFetched: Date.now(),
	data: [],
	max: 0
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

	const json = await response.json()

	if (!json || json.message) {
		return [cache.data, cache.max]
	}

	const {data: {user: {contributionsCollection: {contributionCalendar: {_, weeks}}}}} = json

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
