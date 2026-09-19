import { useEffect, useRef, useState } from 'react'
import './App.scss'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import { VinylPlayer } from './components/VinylPlayer'
import {
	useAsciiBackground,
	useBannerParallax,
	useCursorDot,
	useDraggableFloat,
	useMagnetic,
	useMusicPlayer,
	useRevealAll,
	useScrollProgress,
} from './hooks'

export default function App() {
	const [isDark, setIsDark] = useState(() => {
		const saved = localStorage.getItem('theme')
		if (saved) return saved === 'dark'
		return true
	})

	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const scrollProgress = useScrollProgress()
	const { audioRef, isPlaying, toggle } = useMusicPlayer()
	const asciiCanvasRef = useRef<HTMLCanvasElement>(null)
	const bannerRef = useRef<HTMLDivElement>(null)
	const vinylWrapRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		document.documentElement.classList.toggle('dark-theme', isDark)
		localStorage.setItem('theme', isDark ? 'dark' : 'light')
	}, [isDark])

	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [isMenuOpen])

	useRevealAll()
	useCursorDot()
	useMagnetic()
	useAsciiBackground(asciiCanvasRef, isDark)
	useBannerParallax(bannerRef)
	useDraggableFloat(vinylWrapRef)

	const handleScroll = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
	}

	const handleNavClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
		e.preventDefault()
		setIsMenuOpen(false)
		handleScroll(id)
	}

	return (
		<>
			<div className='noise-overlay' />

			<div className='cursor-dot' />

			<div className='scroll-progress-track'>
				<div
					className='scroll-progress-bar'
					style={{ width: `${scrollProgress}%` }}
				/>
			</div>

			<Header
				isDark={isDark}
				onToggleTheme={() => setIsDark(!isDark)}
				isMenuOpen={isMenuOpen}
				onToggleMenu={() => setIsMenuOpen(prev => !prev)}
				onNavClick={handleNavClick}
			/>

			<main className={isMenuOpen ? 'is-blurred' : ''}>
				<Hero
					bannerRef={bannerRef}
					asciiCanvasRef={asciiCanvasRef}
					onScrollTo={handleScroll}
				/>
				<About />
				<Stack />
				<Experience />
				<Projects />
				<Contact onScrollTo={handleScroll} />
			</main>

			<Footer />

			<VinylPlayer
				wrapRef={vinylWrapRef}
				audioRef={audioRef}
				isPlaying={isPlaying}
				onToggle={toggle}
			/>
		</>
	)
}
