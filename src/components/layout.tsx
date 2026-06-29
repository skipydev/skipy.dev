import { type ReactNode, useEffect, useRef, useState } from 'react'

export const VinylPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const audioRef = useRef<HTMLAudioElement>(null)

	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current?.pause()
		} else {
			audioRef.current?.play()
		}
		setIsPlaying(!isPlaying)
	}

	return (
		<div className='fixed bottom-6 right-6 z-50 flex items-center gap-4'>
			<audio ref={audioRef} loop src='/your-cool-track.mp3' />
			{isPlaying && (
				<span className='text-sm font-mono uppercase text-blood animate-pulse hidden md:block'>
					Playing
				</span>
			)}
			<button
				onClick={togglePlay}
				className={`vinyl-record w-16 h-16 relative flex items-center justify-center cursor-pointer ${isPlaying ? 'playing' : ''}`}
				title='Врубить музло'
			>
				<div className='w-4 h-4 bg-red-600 rounded-full border-2 border-black' />
			</button>
		</div>
	)
}

export const Layout = ({ children }: { children: ReactNode }) => {
	const [isDark, setIsDark] = useState(true) // По дефолту темная ебать

	useEffect(() => {
		if (isDark) document.documentElement.classList.add('dark-theme')
		else document.documentElement.classList.remove('dark-theme')
	}, [isDark])

	return (
		<div className='min-h-screen flex flex-col font-sans'>
			<header className='w-full max-w-[1200px] mx-auto p-6 flex justify-between items-center z-40 relative'>
				<a href='/' className='font-serif italic text-2xl font-black'>
					skipy.
				</a>
				<div className='flex gap-6 items-center'>
					<nav className='hidden md:flex gap-6 font-mono text-sm uppercase'>
						<a href='#about' className='hover:text-blood transition-colors'>
							/about
						</a>
						<a href='#stack' className='hover:text-blood transition-colors'>
							/stack
						</a>
						<a href='#projects' className='hover:text-blood transition-colors'>
							/projects
						</a>
					</nav>
					<button
						onClick={() => setIsDark(!isDark)}
						className='font-mono text-xs border border-current px-3 py-1 rounded-full hover:text-blood hover:border-blood transition-colors'
					>
						{isDark ? 'LIGHT' : 'DARK'}
					</button>
				</div>
			</header>

			<main className='flex-grow w-full'>{children}</main>

			<footer className='w-full max-w-[1200px] mx-auto p-6 mt-20 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center'>
				<p className='font-mono text-sm opacity-60'>
					© 2026 skipy.dev — no AI slop.
				</p>
				<div className='flex gap-4 mt-4 md:mt-0 font-mono text-sm uppercase'>
					<a href='https://github.com/skipydev' className='hover:text-blood'>
						GitHub
					</a>
					<a
						href='https://t.me/@PACCBET_3A_CEBEPOM'
						className='hover:text-blood'
					>
						Telegram
					</a>
				</div>
			</footer>

			<VinylPlayer />
		</div>
	)
}
