'use server'

const TOKEN = process.env.REVOLUT_TOKEN

export async function createOrder(amount: string, note: string): Promise<Array<string | undefined>> {
	if (amount == '' || Number(amount) == 0) {
		return [undefined, undefined]
	}

	let response: any = await fetch('https://merchant.revolut.com/api/1.0/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${TOKEN}`
		},
		body: JSON.stringify({
			currency: 'USD',
			amount: Number(amount) * 100,
			description: note != '' ? note : undefined
		})
	}).catch(() => {
		return [undefined, undefined]
	})

	response = await response.json()	

	return [response.checkout_url || 'error', response.id || 'error']
}

export async function cancelOrder(id: string) {
	if (id == '') {
		return
	}

	fetch(`https://merchant.revolut.com/api/1.0/orders/${id}/cancel`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${TOKEN}`
		}
	}).catch(() => {})
}

export async function getOrderStatus(id: string): Promise<string | undefined> {
	if (id == '') {
		return
	}

	let response: any = await fetch(`https://merchant.revolut.com/api/1.0/orders/${id}`, {
		method: 'GET',
		cache: 'no-cache',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${TOKEN}`
		}
	}).catch(() => {
		return
	})

	response = await response.json()

	return response.state
}
