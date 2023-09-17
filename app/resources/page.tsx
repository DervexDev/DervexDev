import { LiaExternalLinkAltSolid } from 'react-icons/lia'
import { SiLua, SiGithub } from 'react-icons/si'

import { Wally } from '@/components/icons'
import Container from '@/components/container'
import Tooltip from '@/components/tooltip'
import Button from '@/components/button'

interface Resource {
	name: string
	desc: string | JSX.Element
	links: Array<string>
	icon: JSX.Element
}

const resources: Array<Resource> = [
	{
		name: 'Advanced Signal',
		desc: 'Probably the best implementation of signal class in Roblox as it combines performance and flexibility into one module. You can choose whether you prefer speed or ease of use by changing its config.',
		links: ['https://github.com/DervexHero/AdvancedSignal', 'https://wally.run/package/dervexhero/advancedsignal'],
		icon: <SiLua/>
	},
	{
		name: 'Advanced Spring',
		desc: 'This implementation of spring class supports every major Roblox and Luau datatype as well as auto running in separate thread. It’s very easy to use and customizable via constructor or global config.',
		links: ['https://github.com/DervexHero/AdvancedSpring', 'https://wally.run/package/dervexhero/advancedspring'],
		icon: <SiLua/>
	},
	{
		name: 'Lua Sorting Algorithms',
		desc: <>Implementation of over 20 sorting algorithms in Lua and Luau. All algorithms have been ported from Python which can be found on <a href='https://www.geeksforgeeks.org/sorting-algorithms/' className='underline hover:no-underline'>GeeksforGeeks</a> site. Every file is ready to use module that can be imported.</>,
		links: ['https://github.com/DervexHero/LuaSortingAlgorithms'],
		icon: <SiLua/>
	},
]

export default function Resources() {
	function buttons(links: Array<string>) {
		return links.map((link, index) => {
			if (link.includes('github')) {
				return (
					<Button key={index} className='relative text-4xl w-full flex items-center justify-center' borders={index == 0 ? '' : 'l'} link={link}>
						<SiGithub/>

						<Tooltip>
							GitHub repo
						</Tooltip>
					</Button>
				)
			} else if (link.includes('wally')) {
				return (
					<Button key={index} className='relative text-4xl w-full flex items-center justify-center' borders={index == 0 ? '' : 'l'} link={link}>
						<Wally className='h-1/2 fill-black group-hover:fill-white dark:fill-white group-hover:dark:fill-black'/>

							<Tooltip>
								Wally package
							</Tooltip>
					</Button>
				)
			} else {
				return (
					<Button key={index} className='relative text-4xl w-full flex items-center justify-center' borders={index == 0 ? '' : 'l'} link={link}>
						<LiaExternalLinkAltSolid/>

						<Tooltip>
							Resource website
						</Tooltip>
					</Button>
				)
			}
		})
	}

	return (
		<div className='w-full flex flex-wrap justify-center'>
			{resources.map((resource, index) => {
				return (
					<Container key={index} className='w-[600px] m-[20px] self-center'>
						<Container className='h-[78px] flex flex-row' borders='b'>
							<Container className='min-w-[76px] h-[76px] text-4xl flex items-center justify-center' borders='r'>
								{resource.icon}
							</Container>

							<div className='relative w-full flex items-center justify-center'>
								<b className='text-3xl sm:text-4xl text-center'>{resource.name}</b>
							</div>
						</Container>

						<p className='px-4 py-2 text-justify'>
							{resource.desc}
						</p>

						<Container className='h-[78px] flex flex-row' borders='t'>
							{buttons(resource.links)}
						</Container>
					</Container>
				)
			})}
		</div>
	)
}
