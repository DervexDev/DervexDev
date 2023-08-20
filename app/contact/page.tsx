'use client'

import { LiaCopy, LiaCheckSolid, LiaExternalLinkAltSolid } from 'react-icons/lia'
import { SiDiscord, SiTwitter, SiRobloxstudio } from 'react-icons/si'
import { HiMail } from 'react-icons/hi'
import { useState } from 'react'

import { ButtonCSS } from '@/components/button'
import Container from '@/components/container'
import Button from '@/components/button'

interface Contact {
	name: string
	desc: string
	link: string
	icon: JSX.Element
}

const contacts: Array<Contact> = [
	{
		name: 'Discord',
		desc: 'For general purposes add me on discord',
		link: 'https://discord.com/invite/tvGMCbG9',
		icon: <SiDiscord/>
	},
	{
		name: 'Twitter',
		desc: 'For one-time questions dm me on twitter',
		link: 'https://twitter.com/messages/compose?recipient_id=1388272049748156416',
		icon: <SiTwitter/>
	},
	{
		name: 'Mail',
		desc: 'For urgent questions contact with me by e-mail',
		link: 'mailto:dervex@icloud.com',
		icon: <HiMail/>
	},
	{
		name: 'DevForum',
		desc: 'If you are devforum user you can dm me here',
		link: 'https://devforum.roblox.com/u/dervex/summary',
		icon: <SiRobloxstudio/>
	},
]

export default function Home() {
	const [copied, setCopied] = useState(false)

	function button(name: string, link?: string) {
		switch (name) {
			case 'Discord':
				return (
					<Button className='min-w-[78px] h-full text-4xl' borders='l' callback={() => {
						if ('clipboard' in navigator) {
							navigator.clipboard.writeText('dervexhero')
						} else {
							document.execCommand('copy', true, 'dervexhero')
						}

						setCopied(true)

						setTimeout(() => {
							setCopied(false)
						}, 1000);
					}}>
						<div className='absolute' style={{opacity: !copied ? 100 : 0}}>
							<LiaCopy/>
						</div>

						<div style={{opacity: copied ? 100 : 0}}>
							<LiaCheckSolid/>
						</div>
					</Button>
				)
			case 'Mail':
				return (
					<a className={ButtonCSS + 'min-w-[78px] h-full text-4xl border-l-2'} href={link}>
						<LiaExternalLinkAltSolid/>
					</a>
				)
			default:
				return (
					<Button className='min-w-[78px] h-full text-4xl' borders='l' link={link!}>
						<LiaExternalLinkAltSolid/>
					</Button>
				)
		}
	}

	return (
		<div className='w-[100%] xl:w-[75%] flex flex-wrap justify-center'>
			{contacts.map((contact, index) => {
				return (
					<Container key={index} className='w-[350px] h-[160px] md:w-[400px] m-[20px]'>
						<Container className='h-1/2 flex flex-row' borders='b'>
							<Container className={`min-w-[76px] h-full text-${contact.name != 'Mail' ? 3 : 4}xl flex items-center justify-center`} borders='r'>
								{contact.icon}
							</Container>

							<div className='w-full h-full text-3xl sm:text-4xl flex items-center justify-center'>
								<b>{contact.name}</b>
							</div>
						</Container>

						<div className='h-1/2 flex flex-row'>
							<div className='w-full h-full px-4 flex items-center justify-center'>
								{contact.desc}
							</div>

							{button(contact.name, contact.link)}
						</div>
					</Container>
				)
			})}
		</div>
	)
}
