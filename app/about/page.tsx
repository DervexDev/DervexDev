import { SiUnrealengine, SiVisualstudio, SiGit, SiRobloxstudio, SiBlender, SiAdobe, SiLua, SiCplusplus, SiRust, SiTypescript, SiSwift, SiPython } from 'react-icons/si'
import Container from '@/components/container'

interface Skill {
	name: string
	level: number
	icon: JSX.Element
}

const softwareSkills: Array<Skill> = [
	{
		name: 'Unreal Engine',
		level: 50,
		icon: <SiUnrealengine/>
	},
	{
		name: 'Visual Studio Code',
		level: 100,
		icon: <SiVisualstudio/>
	},
	{
		name: 'Git',
		level: 100,
		icon: <SiGit/>
	},
	{
		name: 'Roblox Studio',
		level: 100,
		icon: <SiRobloxstudio/>
	},
	{
		name: 'Blender',
		level: 70,
		icon: <SiBlender/>
	},
	{
		name: 'Adobe products',
		level: 80,
		icon: <SiAdobe/>
	}
]

const languageSkills: Array<Skill> = [
	{
		name: 'Lua & Luau',
		level: 100,
		icon: <SiLua/>
	},
	{
		name: 'TypeScript (& JS)',
		level: 80,
		icon: <SiTypescript/>
	},
	{
		name: 'Rust',
		level: 40,
		icon: <SiRust/>
	},
	{
		name: 'C++',
		level: 30,
		icon: <SiCplusplus/>
	},
	{
		name: 'Swift',
		level: 20,
		icon: <SiSwift/>
	},
	{
		name: 'Python',
		level: 60,
		icon: <SiPython/>
	}
]

export default function Home() {  
	function graphs(skills: Array<Skill>) {
		return skills.map((skill, index) => {
			return (
				<Container className='h-[78px]' borders={index == 0 ? '' :	 't'}>
					<Container className='h-1/2 flex flex-row' borders='b'>
						<Container className='min-w-[37px] h-full text-2xl flex items-center justify-center' borders='r'>
							{skill.icon}
						</Container>

						<div className='w-full h-full text-sm sm:text-xl flex items-center justify-center'>
							<b className='text-center'>{skill.name}</b>
						</div>
					</Container>

					<div className='h-1/2 flex flex-row'>
						<Container className='w-full h-full' borders='r'>
							<div className='h-full bg-black dark:bg-white' style={{width: `${skill.level}%`}}>

							</div>
						</Container>

						<div className='w-[80px] px-4 flex items-center justify-center'>
							{skill.level}%
						</div>
					</div>
				</Container>
			)
		})
	}

	return (
		<div className='w-full flex flex-wrap justify-center'>
				<Container className='w-[700px] m-[20px] self-center'>
					<Container className='h-[78px] text-3xl sm:text-4xl flex items-center justify-center' borders='b'>
						<b>More about me</b>
					</Container>

					<p className='px-4 py-2 text-justify'>
						My real name is Dawid Radziejewski, I’m {new Date().getFullYear() - 2005} years old and live in Poland, at least for now.
						I do programming on daily basis as it’s my favorite hobby and current job – mostly game development.
						I also really enjoy working on open-source software that you can explore on this site.
						My other big hobby is music production, more exactly bass house / electronic.
						Soon you might hear my songs on the internet.
					</p>

					<p className='px-4 py-2 text-justify'>
						I’m learning programming since 2020 and I’m 100% self-thought.
						Currently I focus on <b>Unreal Engine (C++)</b>, <b>Roblox (Lua)</b>, <b>CLI apps (Rust)</b> and other <b>web or VSC tools (JavaScript and TypeScript)</b>.
						I’m graphic designer by profession and I’m learning it since 2019.
						I’m familiar with following Adobe products: <b>Photoshop</b>, <b>Illustrator</b>, <b>PremierePro</b>, <b>AfterEffects</b>, <b>Audition</b> and <b>InDesign</b>.
						I’m also familiar with <b>Blender</b> so I know how create game-ready models and animate them.
						With music I started experimenting when I was very little.
						At first, I used <b>FL Studio</b> but recently I switched to <b>Ableton</b>.
					</p>
				</Container>

				<Container className='w-[600px] m-[20px] self-center'>
					<Container className='h-[78px] text-3xl sm:text-4xl flex items-center justify-center' borders='b'>
						<b>My skills</b>
					</Container>

					<div className='flex flex-row'>
						<Container className='w-1/2' borders='r'>
							{graphs(softwareSkills)}
						</Container>

						<div className='w-1/2'>
							{graphs(languageSkills)}
						</div>
					</div>
				</Container>
		</div>
	)
}
