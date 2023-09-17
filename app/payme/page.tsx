'use client'

import { useState } from 'react'
import { SiRevolut } from 'react-icons/si'

import { cancelOrder, createOrder, getOrderStatus } from '@/modules/payment'
import { delay } from '@/modules/utils'

import Container from '@/components/container'
import Button from '@/components/button'
import Input from '@/components/input'

interface Notification {
	text: string
	button: string
}

const notifications: Array<Notification> = [
	{
		text: 'This is placeholder to make animations look better.',
		button: 'Okay'
	},
	{
		text: 'An error occurred while processing your request!',
		button: 'Continue'
	},
	{
		text: 'Please select amount you want to pay me first!',
		button: 'Okay'
	},
	{
		text: 'Waiting for the transaction to finish...',
		button: 'Cancel'
	},
	{
		text: 'Thank you! Working with you was pure pleasure!',
		button: 'Home'
	}
]

let currentId = ''

export default function PayMe() {
	let [note, updateNote] = useState('')
	let [amount, updateAmount] = useState('')
	let [notification, showNotification] = useState(0)

	async function processPayment(cancel?: boolean) {
		if (!cancel) {
			const [checkout, id] = await createOrder(amount, note)

			if (checkout && checkout != 'error') {
				showNotification(3)

				const newWindow = window.open(checkout)

				if (!newWindow || newWindow.closed || typeof newWindow.closed=='undefined') {
					window.open(checkout, '_self')
				}

				currentId = id!

				while (true) {
					const status = await getOrderStatus(id!)

					if (status == 'COMPLETED') {
						showNotification(4)
					} else if (status == 'CANCELLED' || status == 'FAILED') {
						break
					}

					await delay(2000)
				}
			} else if (checkout) {
				showNotification(1)
			} else {
				showNotification(2)
			}
		} else {
			cancelOrder(currentId)
			currentId = ''
		}
	}

	return (
		<Container className='relative w-[80%] max-w-[500px]'>
			<Container className='h-[78px] flex flex-row' borders='b'>
				<Container className='min-w-[76px] h-[76px] text-4xl flex items-center justify-center' borders='r'>
					{<SiRevolut/>}
				</Container>

				<div className='relative w-full flex items-center justify-center'>
					<b className='text-3xl sm:text-4xl text-center'>Pay with Revolut</b>
				</div>
			</Container>

			<Container className='w-full h-[200px]' borders='b'>
				<Input className='w-full h-full px-4 py-4' placeholder='Add note (optional)' value={note} callback={(event) => {
					let value = event.target.value
					value = value.substring(0, 300)
					updateNote(value)
				}}/>
			</Container>

			<Container className='h-[76px] flex flex-row' borders=''>
				<div className='w-[150px] h-full flex items-center'>
					<Input className='w-[calc(100%-30px)] h-full text-4xl pl-4 pt-[18px]' placeholder='0' value={amount} callback={(event) => {
						let value = event.target.value
						value = value.replace(/\D/g, '')
						value = value.substring(0, 4)
						updateAmount(value)
					}}/>
					<p className={`text-4xl ${amount == '' ? 'text-gray-400' : ''}`}>$</p>
				</div>

				<Button className='w-[calc(100%-150px)] text-4xl font-bold' borders='l' callback={() => {
					processPayment()
				}}>
					PAY
				</Button>
			</Container>

			<div className={`absolute inset-0 w-full bg-white dark:bg-black duration-${notification == 0 ? 100 : 200} overflow-hidden flex items-center justify-center`} style={{height: notification == 0 ? '0%' : '100%'}}>
				<div className='w-[80%] h-[60%] flex flex-wrap justify-center'>
					<p className='w-full text-3xl text-center self-center'>{notifications[notification].text}</p>

					<Button className={`w-1/2 h-[50px] self-center duration-100 transition-opacity opacity-${notification == 0 ? 0 : 100}`} callback={() => {
						if (notification == 3) {
							processPayment(true)
						} else if (notification == 4) {
							window.open('/', '_self')
							return
						}

						showNotification(0)
					}}>
						{notifications[notification].button}
					</Button>
				</div>
			</div>
		</Container>
	)
}
