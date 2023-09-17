interface Props {
	className?: string
	placeholder? : string
	value?: any
	callback?: (event: any) => undefined
}

export default function Input({className, placeholder, value, callback}: Props) {
	let css = 'group bg-white dark:bg-black border-black dark:border-white outline-none resize-none duration-200 '

	if (className) {
		css += className
	}

	return <textarea className={css} placeholder={placeholder} value={value} onChange={callback} autoComplete='off'/>
}
