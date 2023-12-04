import React from 'react'

export default function Layout({ children }) {
	const [isDarkTheme, setIsDarkTheme] = React.useState(false)

	React.useEffect(() => {
		document.documentElement.className = isDarkTheme ? 'dark' : 'light'
	}, [isDarkTheme])

	return (
		<div className="grid justify-items-center">
			<header className="grid items-center bg-element shadow-md w-full h-20">
				<div className="flex justify-between items-baseline gap-8 w-full min-w-max max-w-screen-2xl px-8 mx-auto">
					<h1 className="text-2xl font-extrabold">Where in the world?</h1>
					<button className="font-semibold" onClick={() => setIsDarkTheme(prev => !prev)}>
						{isDarkTheme ? 'Light Mode' : 'Dark Mode'}
					</button>
				</div>
			</header>
			{children}
		</div>
	)
}
