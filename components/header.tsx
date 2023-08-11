'use client'

import { useState, useEffect } from 'react'
import { useCollapse } from 'react-collapsed'
import { clamp, countKeys } from '@/modules/utils'
import { getContributions } from '@/modules/github'
import HeaderButton, { HeaderButtonType } from './headerButton'
import Container from './container'
import Button from './button'

const HEADER_BUTTONS: Array<HeaderButtonType> = [
	{
		link: '/',
		icon: 'logo'
	},
	{
		link: 'about',
		text: 'ABOUT'
	},
	{
		link: 'projects',
		text: 'PROJECTS'
	},
	{
		link: 'resources',
		text: 'RESOURCES'
	},
	{
		link: 'contact',
		text: 'CONTACT'
	},
	{
		link: 'https://twitter.com/DervexHero',
		icon: 'twitter'
	},
	{
		link: 'https://www.youtube.com/@DervexHero',
		icon: 'youtube'
	},
	{
		link: 'https://devforum.roblox.com/u/dervex/summary',
		icon: 'roblox'
	},
	{
		link: 'https://dev.epicgames.com/community/profile/v1OA/Dervex',
		icon: 'unreal'
	},
	{
		link: 'https://github.com/DervexHero',
		icon: 'github'
	}
]
const TEXT_BUTTONS = countKeys(HEADER_BUTTONS, 'text')

export default function Header () {
	const [buttonCount, setButtonCount] = useState(10)
	const [isExpanded, setIsExpanded] = useState(false)
	const { getCollapseProps } = useCollapse({isExpanded})

	function header() {
		let buttons = HEADER_BUTTONS

		if (buttonCount != HEADER_BUTTONS.length) {
			buttons = HEADER_BUTTONS.slice(0, buttonCount - 1)

			buttons.push({
				button: <Button className='min-w-[76px] border-l-2 flex-col' borders='l' callback={() => {
					setIsExpanded(!isExpanded)
				}}>
					<span className={`bg-black dark:bg-white group-hover:bg-white dark:group-hover:bg-black block transition-all duration-200 ease-out w-[25px] h-[2px] ${isExpanded ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}/>
					<span className={`bg-black dark:bg-white group-hover:bg-white dark:group-hover:bg-black block transition-all duration-100 ease-out w-[25px] h-[2px] my-0.5 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}/>
					<span className={`bg-black dark:bg-white group-hover:bg-white dark:group-hover:bg-black block transition-all duration-200 ease-out w-[25px] h-[2px] ${isExpanded ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}/>
				</Button>
			})
		} else if (isExpanded) {
			setIsExpanded(false)
		}

		if (buttonCount == 2) {
			buttons[0].icon = 'banner'
		} else {
			buttons[0].icon = 'logo'
		}
		
		return (
			<Container className='h-[80px] flex flex-row'>
				{buttons.map((button, index) => {
					return <HeaderButton key={index} button={button} borders={index == 0 ? '' : 'l'}/>
				})}
			</Container>
		)
	}

	function menu() {
		let buttons: Array<HeaderButtonType> = []
		let iconButtons: Array<HeaderButtonType> = []
		let textButtons: Array<HeaderButtonType> = []

		if (buttonCount != HEADER_BUTTONS.length) {
			buttons = HEADER_BUTTONS.slice(buttonCount - 1, HEADER_BUTTONS.length)

			if (buttons.length == HEADER_BUTTONS.length - 1) {
				textButtons = buttons.slice(0, TEXT_BUTTONS)
				iconButtons = buttons.slice(TEXT_BUTTONS, buttons.length)
			}
		}

		if (buttons.length == 0) {
			return
		} else if (textButtons.length == 0) {
			return (
				<Container className='absolute right-0 z-10 w-[78px] duration-300' borders='lrb' style={{opacity: isExpanded ? 100 : 0}}>
					<div {...getCollapseProps()}>
						{buttons.map((button, index) => {
							return <HeaderButton key={index} button={button} borders={index == 0 ? '' : 't'} compact={true}/>
						})}
					</div>
				</Container>
			)
		} else {
			const [contributions, max] = getContributions()

			return (
				<Container className='absolute z-10 w-full duration-300' borders='lrb' style={{opacity: isExpanded ? 100 : 0}}>
					<div {...getCollapseProps()}>
						<div className='flex flex-row'>
							<div className='w-[calc(100%-76px)] flex flex-col'>
								{textButtons.map((button, index) => {
									return <HeaderButton key={index} className='h-[76px] text-2xl' button={button} borders={'b'} callback={() => {
										setIsExpanded(false)
									}}/>
								})}

								<div className='h-[76px] grid grid-rows-5 grid-flow-col content-start overflow-hidden bg-white dark:bg-black'>
									{contributions.map((contribution, index) => {
										return <div key={index} className='bg-black w-[15.2px] h-full dark:bg-white aspect-square' style={{opacity: contribution / max}}/>
									})}
								</div>
							</div>

							<div className='w-[76px]'>
								{iconButtons.map((button, index) => {
									return <HeaderButton key={index} button={button} borders={index == iconButtons.length - 1 ? 'l' : 'lb'}/>
								})}
							</div>
						</div>
					</div>
				</Container>
			)
		}
	}

	useEffect(() => {
		function updateHeaderSize() {
			if (window.innerWidth > 640) {
				if (window.innerWidth >= 1024) {
					setButtonCount(HEADER_BUTTONS.length)
				} else {
					setButtonCount(clamp(Math.floor(window.innerWidth / 100) - 1, TEXT_BUTTONS + 2, HEADER_BUTTONS.length))
				}
			} else {
				setButtonCount(2)
			}
		}

		updateHeaderSize()
		window.addEventListener('resize', () => updateHeaderSize())

		return () => {
			window.removeEventListener('resize', () => updateHeaderSize())
		}
	}, [])

	return (
		<header>
			{header()}
			{menu()}
		</header>
	)
}
