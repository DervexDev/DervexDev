'use client'

import Typewriter from 'typewriter-effect'
import Button from '@/components/button'

export default function Home() {
	return (
		<div className='w-[90%] sm:w-[80%]'>
			<p className='text-[6vw] sm:text-[3vw] -mb-[8px] sm:-mb-0 sm:absolute font-bold sm:font-normal'>Hey, my name is</p>

			<div className='font-blanka tracking-wider text-[12vw] sm:text-[10vw] sm:pt-[20px]'>
				<Typewriter options={{
					cursor: '_',
					loop: true
				}} onInit={(typewriter) => {typewriter
					.typeString('Dervex')
					.pauseFor(2000)
					.typeString('Hero')
					.pauseFor(2000)
					.deleteChars(9)
					.typeString('RVX')
					.pauseFor(2000)
					.start()
				}}/>
			</div>

			<p className='text-[6vw] sm:text-[3vw] sm:-mt-[1vw] font-bold sm:font-normal'>and I’m a</p>

			<p className='w-[95%] sm:w-[65%] pb-[30px] sm:pb-[20px]'>
				Software engineer, UI/UX & graphic designer, 3D artis, music producer based in Poland with
				experience in game development, tool, web app programming and all major Adobe products.
			</p>

			<div className='flex justify-center sm:justify-normal'>
				<Button className='w-[180px] h-[50px]' link='about'>
					READ MORE
				</Button>
			</div>
		</div>
	)
}
