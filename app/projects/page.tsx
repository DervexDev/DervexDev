import {
	SiLua, SiTypescript, SiJavascript, SiCplusplus, SiSwift, SiTailwindcss, SiNodedotjs, SiDocker,
	SiReact, SiNextdotjs, SiVapor, SiSpotify,
	SiGit, SiVisualstudiocode, SiXcode, SiRobloxstudio, SiRoblox, SiGithub, SiMicrosoft
} from 'react-icons/si'
import { LiaExternalLinkAltSolid } from 'react-icons/lia'
import { BiError } from 'react-icons/bi'

import Container from '@/components/container'
import Tooltip from '@/components/tooltip'
import Button from '@/components/button'

import Image from 'next/image'

interface Project {
	name: string
	technologies: Array<string>
	time: string
	icon: string
	desc: string | JSX.Element
	links: Array<string>
}

const projects: Array<Project> = [
	{
		name: 'Argon',
		technologies: ['js', 'lua', 'cpp', 'node', 'vsc', 'roblox', 'git'],
		time: 'October 2022 - now',
		icon: 'argon',
		desc: 'Visual Studio Code extension and Roblox plugin. Argon allows for two-way sync of code or any instance between game engine and code editor. It’s very simple to use so it’s accessible even for beginners and comes with many useful built-in tools. It will fit everyone’s needs as it’s highly customizable.',
		links: ['https://github.com/DervexHero/Argon', 'https://marketplace.visualstudio.com/items?itemName=Dervex.argon', 'https://create.roblox.com/marketplace/asset/11263738833/', 'https://devforum.roblox.com/t/2021776', 'https://argonstatsapi.web.app/']
	},
	{
		name: 'Spotify SA',
		technologies: ['swift', 'docker', 'vapor', 'xcode', 'spotify'],
		time: 'August 2023',
		icon: 'spotifySpatialAudio',
		desc: <>Spotify Spatial Audio is simple macOS app that takes advantage of Spotify’s web API to make use of spatial audio on your <a href='https://support.apple.com/en-us/HT211775#:~:text=Make%20sure%20that%20you%27re%20wearing%20your-,AirPods%20Pro%20(1st%20or%C2%A02nd%20generation)%2C%C2%A0AirPods%20Max%2C%20AirPods%20(3rd%20generation)%2C%20Beats%20Fit%20Pro%2C%C2%A0or%20Beats%20Studio%20Pro,-%2C%C2%A0and%20that%20they%27re%20connected%20to%20your%20Mac' className='underline hover:no-underline'>supported</a> AirPods possible directly from the Spotify app. Currently spatial audio on macOS is only supported by Safari thus SSA simply creates new hidden window and switches playback to web player.</>,
		links: ['https://github.com/DervexHero/SpotifySpatialAudio']
	},
	{
		name: 'This page',
		technologies: ['ts', 'tailwind', 'react', 'next', 'node'],
		time: 'August 2023',
		icon: 'dervex',
		desc: 'Well, every developer needs their own site, right? So here is mine! As you can see priorates were monochrome color scheme and simplicity. Those mysterious squares close to the GitHub logo are my contribution this year. Try resizing the window to see some magic happen! Also, this page has 100% score in every Google Lighthouse category.',
		links: ['https://github.com/DervexHero/DervexHero', 'https://dervex.dev/']
	},
	{
		name: 'Universal Comments',
		technologies: ['ts', 'vsc'],
		time: 'January 2023',
		icon: 'universalComments',
		desc: 'Simple Visual Studio Code extension that allows you to use same comment characters in every major language. It also allows to customize your experience by auto closing comment block or by adding spaces automatically.',
		links: ['https://github.com/DervexHero/UniversalComments', 'https://marketplace.visualstudio.com/items?itemName=Dervex.universal-comments']
	},
	{
		name: 'Helium',
		technologies: ['lua', 'roblox'],
		time: 'January 2023',
		icon: 'helium',
		desc: 'Lightweight Roblox Studio plugin for camera bookmarks. It’s exact replica of Unreal Engine’s camera checkpoints. It allows you to save up to 10 camera location and then teleport to them either by keyboard shortcut or using UI.',
		links: ['https://github.com/DervexHero/Helium', 'https://create.roblox.com/marketplace/asset/12243834454/']
	},
]

export default function Projects() {
	function technologies(technologies: Array<string>) {
		return technologies.map((technology, index) => {
			switch (technology) {
				case 'lua':
					return <div key={index} className='pl-2'><SiLua/></div>
				case 'ts':
					return <div key={index} className='pl-2'><SiTypescript/></div>
				case 'js':
					return <div key={index} className='pl-2'><SiJavascript/></div>
				case 'cpp':
					return <div key={index} className='pl-2'><SiCplusplus/></div>
				case 'swift':
					return <div key={index} className='pl-2'><SiSwift/></div>
				case 'docker':
					return <div key={index} className='pl-2'><SiDocker/></div>
				case 'tailwind':
					return <div key={index} className='pl-2'><SiTailwindcss/></div>
				case 'node':
					return <div key={index} className='pl-2'><SiNodedotjs/></div>
				case 'react':
					return <div key={index} className='pl-2'><SiReact/></div>
				case 'next':
					return <div key={index} className='pl-2'><SiNextdotjs/></div>
				case 'vapor':
					return <div key={index} className='pl-2'><SiVapor/></div>
				case 'spotify':
					return <div key={index} className='pl-2'><SiSpotify/></div>
				case 'git':
					return <div key={index} className='pl-2'><SiGit/></div>
				case 'vsc':
					return <div key={index} className='pl-2'><SiVisualstudiocode/></div>
				case 'xcode':
					return <div key={index} className='pl-2'><SiXcode/></div>
				case 'roblox':
					return <div key={index} className='pl-2'><SiRobloxstudio/></div>
				default:
					return <BiError key={index}/>
			}
		})
	}

	function buttons(links: Array<string>) {
		return links.map((link, index) => {
			if (link.includes('github')) {
				return (
					<Button key={index} className='text-4xl w-full flex items-center justify-center' borders={index == 0 ? '' : 'l'} link={link}>
						<SiGithub/>

						<Tooltip>
							GitHub repo
						</Tooltip>
					</Button>
				)
			} else if (link.includes('visualstudio')) {
				return (
					<Button key={index} className='text-4xl w-full flex items-center justify-center' borders={index == 0 ? '' : 'l'} link={link}>
						<SiMicrosoft/>

						<Tooltip>
							VS marketplace
						</Tooltip>
					</Button>
				)
			} else if (link.includes('devforum')) {
				return (
					<Button key={index} className='text-4xl w-full flex items-center justify-center' borders={index == 0 ? '' : 'l'} link={link}>
						<SiRobloxstudio/>

						<Tooltip>
							DevForum topic
						</Tooltip>
					</Button>
				)
			} else if (link.includes('roblox')) {
				return (
					<Button key={index} className='text-4xl w-full flex items-center justify-center' borders={index == 0 ? '' : 'l'} link={link}>
						<SiRoblox/>

						<Tooltip>
							Roblox marketplace
						</Tooltip>
					</Button>
				)
			} else {
				return (
					<Button key={index} className='text-4xl w-full flex items-center justify-center' borders={index == 0 ? '' : 'l'} link={link}>
						<LiaExternalLinkAltSolid/>

						<Tooltip>
							Project website
						</Tooltip>
					</Button>
				)
			}
		})
	}

	return (
		<div className='w-full'>
			<p className='text-center text-xs opacity-60 pt-[10px] -mb-[10px] sm:hidden'>Rotate your device to see more details</p>
			<div className='flex flex-wrap justify-center'>
				{projects.map((project, index) => {
					return (
						<Container key={index} className='w-[600px] m-[20px] self-center'>
							<Container className='h-[78px] flex flex-row' borders='b'>
								<Container className='min-w-[76px] h-full flex items-center justify-center' borders='r'>
									<Image src={`./images/${project.icon}.png`} alt={project.icon} className='invert dark:invert-0' width={60} height={60}/>
								</Container>

								<div className='relative w-full h-full flex items-center justify-center sm:block sm:pl-2 sm:pt-1'>
									<b className='text-3xl sm:text-4xl text-center'>{project.name}</b>
									<p className='hidden sm:block opacity-60'>{project.time}</p>

									<div className='absolute top-0 right-0 h-1/2 hidden sm:flex flex-row p-2 text-2xl'>
										{technologies(project.technologies)}
									</div>
								</div>
							</Container>

							<p className='px-4 py-2 text-justify'>
								{project.desc}
							</p>
							
							<Container className='h-[78px] flex flex-row' borders='t'>
								{buttons(project.links)}
							</Container>
						</Container>
					)
				})}
			</div>
		</div>
	)
}
