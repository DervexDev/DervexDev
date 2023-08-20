import { fetchContributions } from '@/modules/github'
import Container from './container'

export default async function Sidebar() {
	const contributions = await fetchContributions()

	return (
		<Container className='hidden lg:block h-[calc(100vh-80px)] w-[78px] float-right overflow-hidden' borders='lrb'>
			<div id='githubContributions' className='grid grid-cols-5 grid-flow-row content-start'>
				{contributions.map((contribution, index) => {
					return <div key={index} className='bg-black dark:bg-white aspect-square' style={{opacity: contribution}}/>
				})}
			</div>
		</Container>
	)
}
