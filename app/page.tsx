'use client'

import Typewriter from 'typewriter-effect'
import Button from '@/components/button'

export default function Home() {
	return (
		<div className='w-[90%] sm:w-[80%]'>
			<p className='text-[20px] sm:text-[30px] lg:text-[40px] xl:text-[50px] font-bold sm:font-normal'>Hey, my name is</p>

			<div className='h-[70px] sm:h-[110px] lg:h-[160px] xl:h-[220px] text-[45px] sm:text-[70px] lg:text-[100px] xl:text-[140px] font-blanka tracking-wider'>
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

			<p className='text-[20px] sm:text-[30px] lg:text-[40px] xl:text-[50px] font-bold sm:font-normal'>and I’m</p>

			<p className='w-[95%] sm:w-[85%] lg:w-[75%] xl:w-[65%] pb-[20px]'>
				Game Developer, Software Engineer, UI/UX & Graphic Designer, 3D Artist and Music Producer
				based in Poland that loves to experiment with unknown and desires to learn more and more.
			</p>

			<div className='flex justify-center sm:justify-normal'>
				<Button className='w-[180px] h-[50px]' link='about'>
					READ MORE
					<span className='opacity-0 -ml-12'>ABOUT</span>
				</Button>
			</div>
		</div>
	)
}
