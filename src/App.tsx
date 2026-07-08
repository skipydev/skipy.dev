import {
	type CSSProperties,
	type RefObject,
	useEffect,
	useRef,
	useState,
} from 'react'
import './App.scss'

const NAV_ITEMS = [
	{ id: 'about', num: '01', label: 'about' },
	{ id: 'stack', num: '02', label: 'stack' },
	{ id: 'experience', num: '03', label: 'experience' },
	{ id: 'projects', num: '04', label: 'projects' },
	{ id: 'contact', num: '05', label: 'contact' },
]

const STACK_CATEGORIES = [
	{
		title: '01 — Backend & DB',
		desc: 'Architecture, APIs and data handling.',
		tools: [
			{ slug: 'nestjs', name: 'NestJS' },
			{ slug: 'nodedotjs', name: 'Node.js' },
			{ slug: 'go', name: 'Go' },
			{ slug: 'postgresql', name: 'PostgreSQL' },
			{ slug: 'prisma', name: 'Prisma' },
			{ slug: 'redis', name: 'Redis' },
			{ slug: 'mysql', name: 'MySQL' },
		],
	},
	{
		title: '02 — Frontend',
		desc: 'Interfaces and client-side logic.',
		tools: [
			{ slug: 'react', name: 'React' },
			{ slug: 'nextdotjs', name: 'Next.js' },
			{ slug: 'typescript', name: 'TypeScript' },
			{ slug: 'tailwindcss', name: 'Tailwind' },
			{ slug: 'html5', name: 'HTML5' },
			{ slug: 'vite', name: 'Vite' },
		],
	},
	{
		title: '03 — Infra',
		desc: 'Environment and deployment.',
		tools: [
			{ slug: 'linux', name: 'Linux' },
			{ slug: 'docker', name: 'Docker' },
			{ slug: 'git', name: 'Git' },
			{ slug: 'nginx', name: 'Nginx' },
		],
	},
]

const RHYTHM = [58, 82, 46, 72, 92, 54, 66, 80]

const EXPERIENCE_ITEMS = [
	{
		year: '2026 — Present',
		title: 'IT Internship — Backend / Full-stack',
		desc: "Real tasks in commercial development, even if small ones. It's the first time I'm seeing how theory holds up against actual production code, getting real feedback, and finding out how much I didn't know. TASKFORCE",
		tags: ['NestJS', 'PostgreSQL', 'Docker'],
	},
	{
		year: 'Ongoing',
		title: 'Cybersecurity & Systems, on my own time',
		desc: 'Working through Hack The Box challenges and generally poking at how systems break. Daily driver is Linux (CachyOS), mostly because I like understanding what my machine is actually doing.',
		tags: ['Linux', 'Networking', 'CTF'],
	},
	{
		year: 'In progress',
		title: 'Olympiads & university entrance prep',
		desc: 'Algorithms, non-standard math, and exam prep (physics, CS, English) — trying to get into a decent technical university, the regular way.',
		tags: ['Algorithms', 'Math', 'Physics'],
	},
]

const PROJECTS = [
	{
		name: 'working-with-git',
		url: 'https://github.com/skipydev/working-with-git',
		desc: 'Git workflow drills — branching, merging, resolving conflicts, PRs. Not a "project" in the flashy sense, just where I actually learned git instead of memorizing five commands.',
		tags: ['Git', 'HTML5'],
	},
	{
		name: 'easy-ph',
		url: 'https://github.com/skipydev/EasyPH',
		desc: 'Master your EGE preparation with our AI-driven learning platform, built on the advanced DeepSeek model. We combine high-level academic resources—including official MSU textbooks—with AI-powered intelligence to simplify complex topics. Navigate materials effortlessly, get instant answers, and stay organized with a study plan built for results.',
		tags: ['React', 'TypeScript', 'Go'],
	},
]

function useRevealAll() {
	useEffect(() => {
		const revealEls = document.querySelectorAll('.reveal')
		if (!revealEls.length) return

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible')
						observer.unobserve(entry.target)
					}
				})
			},
			{ threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
		)

		revealEls.forEach(el => observer.observe(el))
		return () => observer.disconnect()
	}, [])
}

function useScrollProgress() {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const update = () => {
			const scrollTop = window.scrollY
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight
			setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
		}
		update()
		window.addEventListener('scroll', update, { passive: true })
		window.addEventListener('resize', update)
		return () => {
			window.removeEventListener('scroll', update)
			window.removeEventListener('resize', update)
		}
	}, [])

	return progress
}

function useCursorDot() {
	useEffect(() => {
		if (!window.matchMedia('(pointer: fine)').matches) return
		const dot = document.querySelector<HTMLDivElement>('.cursor-dot')
		if (!dot) return

		let mouseX = -100,
			mouseY = -100
		let dotX = -100,
			dotY = -100
		let started = false,
			raf = 0

		const onMove = (e: globalThis.MouseEvent) => {
			mouseX = e.clientX
			mouseY = e.clientY
			if (!started) {
				started = true
				dotX = mouseX
				dotY = mouseY
				document.documentElement.classList.add('has-custom-cursor')
			}

			const target = e.target as HTMLElement
			if (target.closest('a, button, .magnetic')) {
				dot.classList.add('is-hovering')
			} else {
				dot.classList.remove('is-hovering')
			}
		}

		const animate = () => {
			dotX += (mouseX - dotX) * 0.18
			dotY += (mouseY - dotY) * 0.18
			dot.style.transform = `translate3d(${dotX}px,${dotY}px,0)`
			raf = requestAnimationFrame(animate)
		}
		raf = requestAnimationFrame(animate)

		window.addEventListener('mousemove', onMove, { passive: true })
		return () => {
			window.removeEventListener('mousemove', onMove)
			cancelAnimationFrame(raf)
			document.documentElement.classList.remove('has-custom-cursor')
		}
	}, [])
}

function useMagnetic() {
	useEffect(() => {
		if (!window.matchMedia('(pointer: fine)').matches) return

		const onMove = (e: globalThis.MouseEvent) => {
			const el = (e.target as HTMLElement).closest<HTMLElement>('.magnetic')
			if (!el) return
			const rect = el.getBoundingClientRect()
			const x = (e.clientX - rect.left - rect.width / 2) * 0.3
			const y = (e.clientY - rect.top - rect.height / 2) * 0.3
			el.style.transform = `translate3d(${x}px,${y}px,0)`
		}

		const onLeave = (e: globalThis.MouseEvent) => {
			const el = (e.target as HTMLElement).closest<HTMLElement>('.magnetic')
			if (el) el.style.transform = 'translate3d(0,0,0)'
		}

		document.addEventListener('mousemove', onMove, { passive: true })
		document.addEventListener('mouseleave', onLeave, {
			passive: true,
			capture: true,
		})

		return () => {
			document.removeEventListener('mousemove', onMove)
			document.removeEventListener('mouseleave', onLeave, { capture: true })
		}
	}, [])
}

function useBannerParallax(bannerRef: RefObject<HTMLDivElement | null>) {
	useEffect(() => {
		const el = bannerRef.current
		if (!el) return
		const prefersReduced = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches
		if (prefersReduced) return

		let raf = 0
		const update = () => {
			const offset = window.scrollY * 0.35
			el.style.transform = `translateY(${offset}px)`
			raf = 0
		}
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(update)
		}
		update()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', onScroll)
			if (raf) cancelAnimationFrame(raf)
		}
	}, [bannerRef])
}

function useAsciiBackground(
	canvasRef: RefObject<HTMLCanvasElement | null>,
	isDark: boolean,
) {
	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const CHARS = ['.', ':', '+', '*', 'x', '#']
		const CELL = 16
		let width = 0
		let height = 0
		let cols = 0
		let rows = 0
		let raf = 0
		let t = 0

		const getColors = () => {
			const s = getComputedStyle(document.documentElement)
			return {
				red: s.getPropertyValue('--red-rgb').trim().replace(/\s+/g, ','),
				border: s.getPropertyValue('--border-rgb').trim().replace(/\s+/g, ','),
			}
		}
		let colors = getColors()

		const resize = () => {
			const parent = canvas.parentElement
			if (!parent) return
			const rect = parent.getBoundingClientRect()
			width = rect.width
			height = rect.height
			const dpr = window.devicePixelRatio || 1
			canvas.width = width * dpr
			canvas.height = height * dpr
			canvas.style.width = width + 'px'
			canvas.style.height = height + 'px'
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
			cols = Math.ceil(width / CELL)
			rows = Math.ceil(height / CELL)
		}

		requestAnimationFrame(() => {
			resize()
			colors = getColors()
		})

		const ro = new ResizeObserver(() => resize())
		if (canvas.parentElement) ro.observe(canvas.parentElement)
		window.addEventListener('resize', resize)

		const draw = () => {
			if (!width || !height) {
				raf = requestAnimationFrame(draw)
				return
			}
			ctx.clearRect(0, 0, width, height)
			ctx.font = `${CELL - 3}px 'JetBrains Mono', monospace`
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'

			const cx0 = cols / 2
			const cy0 = rows / 2

			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const dx = x - cx0
					const dy = (y - cy0) * 1.4
					const dist = Math.sqrt(dx * dx + dy * dy)
					const wave = Math.sin(dist * 0.5 - t) * 0.5 + 0.5

					if (wave > 0.58) {
						const idx = Math.min(
							CHARS.length - 1,
							Math.floor(((wave - 0.58) / 0.42) * CHARS.length),
						)
						const isHot = wave > 0.88
						const alpha = 0.1 + wave * 0.45
						ctx.fillStyle = isHot
							? `rgba(${colors.red},${alpha})`
							: `rgba(${colors.border},${alpha * 0.55})`
						ctx.fillText(CHARS[idx], x * CELL + CELL / 2, y * CELL + CELL / 2)
					}
				}
			}

			t += 0.016
			raf = requestAnimationFrame(draw)
		}
		raf = requestAnimationFrame(draw)

		return () => {
			cancelAnimationFrame(raf)
			ro.disconnect()
			window.removeEventListener('resize', resize)
		}
	}, [canvasRef, isDark])
}

function useMusicPlayer() {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [hasError, setHasError] = useState(false)

	const toggle = () => {
		const audio = audioRef.current
		if (!audio) return
		if (isPlaying) {
			audio.pause()
			setIsPlaying(false)
		} else {
			audio
				.play()
				.then(() => setIsPlaying(true))
				.catch(() => setHasError(true))
		}
	}

	return { audioRef, isPlaying, hasError, toggle }
}

const MoonIcon = () => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
	</svg>
)

const SunIcon = () => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<circle cx='12' cy='12' r='4' />
		<line x1='12' y1='2' x2='12' y2='4' />
		<line x1='12' y1='20' x2='12' y2='22' />
		<line x1='4' y1='12' x2='2' y2='12' />
		<line x1='22' y1='12' x2='20' y2='12' />
		<line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
		<line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
		<line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
		<line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
	</svg>
)

const PlayIcon = () => (
	<svg viewBox='0 0 24 24' fill='currentColor'>
		<path d='M8 5v14l11-7z' />
	</svg>
)

const PauseIcon = () => (
	<svg viewBox='0 0 24 24' fill='currentColor'>
		<rect x='6' y='5' width='4' height='14' />
		<rect x='14' y='5' width='4' height='14' />
	</svg>
)

const GithubIcon = () => (
	<svg viewBox='0 0 24 24' fill='currentColor'>
		<path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
	</svg>
)

const TelegramIcon = () => (
	<svg viewBox='0 0 24 24' fill='currentColor'>
		<path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295-.391 0-.32-.145-.451-.51l-1.03-3.384-2.963-.924c-.644-.203-.658-.643.135-.953l11.593-4.471c.535-.196 1.063.128.88.995z' />
	</svg>
)

const DiscordIcon = () => (
	<svg viewBox='0 0 24 24' fill='currentColor'>
		<path d='M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 00-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.028C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.056 19.9 19.9 0 005.993 3.03.08.08 0 00.087-.028c.461-.63.873-1.295 1.226-1.994a.076.076 0 00-.042-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.294.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.009c.12.098.246.198.373.295a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.076.076 0 00-.041.107c.36.699.77 1.364 1.225 1.994a.077.077 0 00.087.028 19.963 19.963 0 006.002-3.03.076.076 0 00.032-.056c.5-4.506-.838-8.962-3.552-12.662a.06.06 0 00-.031-.028zM8.02 15.278c-1.148 0-2.093-.993-2.093-2.214 0-1.222.929-2.214 2.093-2.214 1.173 0 2.093.992 2.093 2.214 0 1.221-.92 2.214-2.093 2.214zm7.975 0c-1.149 0-2.094-.993-2.094-2.214 0-1.222.929-2.214 2.094-2.214 1.172 0 2.092.992 2.092 2.214 0 1.221-.92 2.214-2.092 2.214z' />
	</svg>
)

const EmailIcon = () => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<rect x='2' y='4' width='20' height='16' rx='2' />
		<path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
	</svg>
)

const ArrowIcon = () => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<line x1='7' y1='17' x2='17' y2='7' />
		<polyline points='7 7 17 7 17 17' />
	</svg>
)

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

			<header className='header'>
				<div className='header-inner'>
					<a
						href='#'
						onClick={e => handleNavClick(e, 'hero-top')}
						className='logo'
					>
						<span className='logo-bracket'>{'{'}</span>
						<span className='logo-text'>skipy.dev</span>
						<span className='logo-bracket'>{'}'}</span>
						<span className='logo-sub'>| fullstack engineer</span>
					</a>

					<nav className='desktop-nav'>
						{NAV_ITEMS.map(item => (
							<a
								key={item.id}
								href={`#${item.id}`}
								onClick={e => handleNavClick(e, item.id)}
								className='nav-link'
							>
								<span className='nav-link-text' data-text={item.label}>
									{item.label}
								</span>
							</a>
						))}
					</nav>

					<div className='header-actions'>
						<button
							onClick={() => setIsDark(!isDark)}
							aria-label={
								isDark ? 'Switch to light theme' : 'Switch to dark theme'
							}
							className='theme-toggle'
						>
							{isDark ? <MoonIcon /> : <SunIcon />}
						</button>

						<button
							className={`burger-btn mobile-nav-trigger ${isMenuOpen ? 'is-open' : ''}`}
							onClick={() => setIsMenuOpen(prev => !prev)}
							aria-label='Toggle menu'
						>
							<span className='burger-line' />
							<span className='burger-line' />
							<span className='burger-line' />
						</button>
					</div>
				</div>

				<nav
					className={`mobile-nav mobile-nav-trigger ${isMenuOpen ? 'is-open' : ''}`}
				>
					<div className='mobile-nav-list'>
						{NAV_ITEMS.map(item => (
							<a
								key={item.id}
								href={`#${item.id}`}
								onClick={e => handleNavClick(e, item.id)}
								className='mobile-nav-item'
							>
								<span className='mobile-nav-num'>{item.num}</span>
								<span className='mobile-nav-label'>{item.label}</span>
								<span className='mobile-nav-arrow'>↘</span>
							</a>
						))}
					</div>

					<div className='mobile-nav-footer'>
						<span>built with React, Vite &amp; TS</span>
						<span className='mobile-nav-status'>
							<span className='blink-dot' />
							open to work
						</span>
					</div>
				</nav>
			</header>

			<main>
				<section id='hero-top' className='hero-section'>
					<div className='profile-banner' ref={bannerRef}>
						<canvas
							ref={asciiCanvasRef}
							className='ascii-canvas banner-canvas'
						/>
					</div>

					<div className='reveal hero-content'>
						<div className='profile-header-row'>
							<div className='profile-left'>
								<div className='profile-avatar-wrap'>
									<img
										src='/public/avatar.gif'
										alt='Skipy'
										className='profile-avatar'
									/>
								</div>

								<div className='profile-info-wrap'>
									<div className='profile-meta'>
										<h1 className='hero-title'>
											Skipy
											<svg
												className='verified-badge'
												viewBox='0 0 24 24'
												fill='currentColor'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path d='M22.5 12.5362L20.8143 10.3703L21.0537 7.64052L18.4285 6.94274L16.6433 5.04403L14.0772 5.92612L12 4.00403L9.92283 5.92612L7.35667 5.04403L5.57149 6.94274L2.94632 7.64052L3.18567 10.3703L1.5 12.5362L3.18567 14.702L2.94632 17.4318L5.57149 18.1296L7.35667 20.0283L9.92283 19.1462L12 21.0683L14.0772 19.1462L16.6433 20.0283L18.4285 18.1296L21.0537 17.4318L20.8143 14.702L22.5 12.5362ZM10.5756 16.2917L6.96963 12.6857L8.38384 11.2715L10.5756 13.4633L15.6162 8.42277L17.0304 9.83698L10.5756 16.2917Z' />
											</svg>
											<span className='cursor-blink' aria-hidden='true' />
										</h1>
										<span className='profile-handle'>
											@skipydev · fullstack engineer
										</span>
										<p className='about-quote'>
											"Stop faking your professional growth"
										</p>
									</div>

									<p className='hero-subtitle'>
										16, self-taught, mostly figuring it out by building. I'm not
										going to pretend I'm some senior backend architect — I'm
										still early. What I do care about: writing things properly,
										understanding the tools instead of copy-pasting, and
										actually finishing what I start.
									</p>

									<div className='hero-buttons'>
										<a
											href='#contact'
											onClick={() => handleScroll('contact')}
											className='btn btn-fill magnetic'
										>
											dm
										</a>
										<a
											href='https://github.com/skipydev'
											target='_blank'
											rel='noopener noreferrer'
											className='btn btn-outline magnetic'
										>
											git
										</a>
										<a
											href='/Skipy_CV.pdf'
											target='_blank'
											rel='noopener noreferrer'
											className='btn btn-outline magnetic'
										>
											CV
										</a>
									</div>
								</div>
							</div>

							<aside className='hero-sidebar'>
								<div className='hero-sidebar-row'>
									<div className='hero-sidebar-card'>
										<span className='hero-sidebar-label'>age</span>
										<span className='hero-sidebar-big'>16</span>
									</div>
									<div className='hero-sidebar-card'>
										<span className='hero-sidebar-label'>timezone</span>
										<span className='hero-sidebar-big'>UTC+3</span>
									</div>
								</div>

								<div className='hero-sidebar-item'>
									<span className='hero-sidebar-label'>status</span>
									<span className='hero-sidebar-value hero-sidebar-value-red'>
										<span className='blink-dot' />
										open to work
									</span>
								</div>

								<div className='hero-sidebar-item'>
									<span className='hero-sidebar-label'>currently</span>
									<span className='hero-sidebar-value'>
										IT Internship · Backend
									</span>
								</div>

								<div className='hero-sidebar-item'>
									<span className='hero-sidebar-label'>location</span>
									<span className='hero-sidebar-value'>Moscow, Russia</span>
								</div>

								<div className='hero-sidebar-item'>
									<span className='hero-sidebar-label'>focus</span>
									<span className='hero-sidebar-value'>
										Backend · Systems · APIs
									</span>
								</div>

								<div className='hero-sidebar-item'>
									<span className='hero-sidebar-label'>daily env</span>
									<span className='hero-sidebar-value'>
										CachyOS · Neovim · Kitty
									</span>
								</div>

								<div className='hero-sidebar-item'>
									<span className='hero-sidebar-label'>education</span>
									<span className='hero-sidebar-value'>
										Preparing for university · 2026
									</span>
								</div>

								<div className='hero-sidebar-links'>
									<a
										href='https://github.com/skipydev'
										target='_blank'
										rel='noopener noreferrer'
										className='hero-sidebar-link'
									>
										<GithubIcon />
										<span>github.com/skipydev</span>
									</a>
									<a
										href='https://t.me/PACCBET_3A_CEBEPOM'
										target='_blank'
										rel='noopener noreferrer'
										className='hero-sidebar-link'
									>
										<TelegramIcon />
										<span>@skipydev</span>
									</a>
									<a
										href='mailto:hello@skipy.dev'
										className='hero-sidebar-link'
									>
										<EmailIcon />
										<span>hello@skipy.dev</span>
									</a>
								</div>
							</aside>
						</div>
					</div>

					<button
						className='scroll-cue'
						onClick={() => handleScroll('about')}
						aria-label='Scroll down'
					>
						<svg
							className='scroll-cue-arrow'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<line x1='12' y1='3' x2='12' y2='21' />
							<polyline points='6 15 12 21 18 15' />
						</svg>
						<span className='scroll-cue-text'>scroll</span>
					</button>
				</section>

				<section id='about' className='section'>
					<div className='reveal'>
						<div className='section-content'>
							<div className='section-label'>$ whoami</div>
							<h2 className='section-title'>
								Stop pretending, start
								<br />
								actually <span className='highlight'>building.</span>
							</h2>

							<div className='about-grid'>
								<div
									className='about-lead reveal'
									style={{ ['--r-delay']: '0.1s' } as CSSProperties}
								>
									<p className='about-quote'>
										"How you fall doesn't matter. It's how you land."
									</p>
									<p className='section-text'>
										I am focused on building robust software engineering habits:
										relying on documentation, understanding systems at a
										fundamental level, and taking full responsibility for the
										code I ship. While my core expertise lies in backend and
										systems work—including Linux, APIs, and databases—I maintain
										a versatile full-stack approach to meet comprehensive
										project demands. I value continuous, genuine technical
										development and prioritize deep understanding over rapid,
										superficial progress.
									</p>
								</div>

								<div className='about-principles'>
									{[
										{ n: '01', text: 'Stop pretending you know everything.' },
										{ n: '02', text: 'Your code tells different story.' },
										{ n: '03', text: `Hard truths hurt, don't they?` },
										{ n: '04', text: 'Maybe just quit while ahead.' },
									].map((p, i) => (
										<div
											key={p.n}
											className='about-principle reveal'
											style={
												{
													['--r-delay']: `${0.15 + i * 0.08}s`,
												} as CSSProperties
											}
										>
											<span className='about-principle-n'>{p.n}</span>
											<span className='about-principle-text'>{p.text}</span>
										</div>
									))}
								</div>
							</div>

							<div
								className='about-tags reveal'
								style={{ ['--r-delay']: '0.4s' } as CSSProperties}
							>
								<span className='about-tag about-tag-red'>
									backend-leaning full-stack
								</span>
								<span className='about-tag'>systems & architecture</span>
								<span className='about-tag'>still learning</span>
								<span className='about-tag'>kitty + neovim</span>
							</div>
						</div>
					</div>
				</section>

				<section id='stack' className='section'>
					<div className='reveal'>
						<div className='section-content'>
							<div className='section-label'>$ ls ~/stack</div>
							<h2 className='section-title'>Tools I reach for.</h2>
							<p className='section-description'>
								Bar height here is just rhythm, not a skill score.
							</p>

							<div className='stack-categories'>
								{STACK_CATEGORIES.map((cat, idx) => (
									<div
										key={cat.title}
										className='reveal'
										style={{ ['--r-delay']: `${idx * 0.15}s` } as CSSProperties}
									>
										<h3 className='category-title'>{cat.title}</h3>
										<p className='category-desc'>{cat.desc}</p>
										<div className='eq-row'>
											{cat.tools.map((tool, i) => (
												<div
													key={tool.name}
													className='eq-bar-wrap reveal'
													style={
														{
															['--r-delay']: `${idx * 0.15 + i * 0.06}s`,
														} as CSSProperties
													}
												>
													<span
														className='icon-mask eq-icon'
														style={
															{
																['--icon-url']: `url(https://cdn.simpleicons.org/${tool.slug})`,
															} as CSSProperties
														}
													/>
													<div className='eq-bar-track'>
														<div
															className='eq-bar-fill'
															style={
																{
																	height: `${RHYTHM[i % RHYTHM.length]}%`,
																	['--h']: `${RHYTHM[i % RHYTHM.length]}%`,
																	['--eq-delay']: `${i * 0.05}s`,
																} as CSSProperties
															}
														/>
													</div>
													<span className='eq-label'>{tool.name}</span>
												</div>
											))}
										</div>
									</div>
								))}
							</div>

							<div
								className='languages-block reveal'
								style={{ ['--r-delay']: '0.6s' } as CSSProperties}
							>
								<h3 className='category-title'>04 — Languages (self-rated)</h3>
								<div className='languages-list'>
									{[
										{ name: 'TypeScript / JavaScript', value: 90 },
										{ name: 'Python', value: 77 },
										{ name: 'C++ / Go', value: 39 },
									].map((lang, i) => (
										<div
											key={lang.name}
											className='language-row reveal'
											style={
												{ ['--r-delay']: `${0.7 + i * 0.1}s` } as CSSProperties
											}
										>
											<div className='language-top'>
												<span>{lang.name}</span>
												<span className='language-value'>{lang.value}%</span>
											</div>
											<div className='language-track'>
												<div
													className='language-fill'
													style={{ width: `${lang.value}%` }}
												/>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id='experience' className='section section-wide'>
					<div className='reveal'>
						<div className='section-content'>
							<div className='section-label'>$ cat timeline.log</div>
							<h2 className='section-title'>
								Hands-on, <span className='highlight'>not finished.</span>
							</h2>

							<div className='experience-grid'>
								{EXPERIENCE_ITEMS.map((item, i) => (
									<div
										key={item.title}
										className='reveal experience-card'
										style={{ ['--r-delay']: `${i * 0.15}s` } as CSSProperties}
									>
										<div className='experience-year'>{item.year}</div>
										<h4 className='experience-title'>{item.title}</h4>
										<p className='experience-desc'>{item.desc}</p>
										<div className='experience-tags'>
											{item.tags.map(tag => (
												<span key={tag} className='experience-tag'>
													{tag}
												</span>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section id='projects' className='section section-wide'>
					<div className='reveal'>
						<div className='section-content'>
							<div className='section-label'>$ ls ~/projects</div>
							<h2 className='section-title'>
								Mostly practice. <span className='highlight'>On purpose.</span>
							</h2>
							<p className='section-description'>
								No polished mockups or fake apps here. Most of my GitHub right
								now consists of learning repos and pet-projects — and honestly,
								that’s exactly where a 16 y. o. profile should be. Just pure
								practice and building stuff
							</p>

							<div className='projects-grid'>
								{PROJECTS.map((proj, idx) => (
									<a
										key={proj.name}
										href={proj.url}
										target='_blank'
										rel='noopener noreferrer'
										className='reveal project-card'
										style={
											{
												['--r-delay']: `${0.15 + idx * 0.15}s`,
											} as CSSProperties
										}
									>
										<div className='project-header'>
											<span className='project-name'>{proj.name}</span>
											<span className='project-arrow'>
												<ArrowIcon />
											</span>
										</div>
										<p className='project-desc'>{proj.desc}</p>
										<div className='project-tags'>
											{proj.tags.map(tag => (
												<span key={tag} className='project-tag'>
													{tag}
												</span>
											))}
										</div>
									</a>
								))}

								<a
									href='https://github.com/skipydev?tab=repositories'
									target='_blank'
									rel='noopener noreferrer'
									className='reveal project-card-all'
									style={{ ['--r-delay']: '0.45s' } as CSSProperties}
								>
									<span className='project-card-all-arrow'>
										<ArrowIcon />
									</span>
									<span>the rest is on GitHub — 13 repos, mostly drills</span>
								</a>
							</div>
						</div>
					</div>
				</section>

				<section id='contact' className='section section-wide contact-section'>
					<div className='reveal'>
						<div className='section-content'>
							<div className='section-label'>$ contact --open</div>
							<h2 className='section-title contact-title'>Let's talk.</h2>
							<p className='section-description'>
								Open to internships, collabs, or just an interesting
								conversation about code. Pick whichever channel you actually
								use.
							</p>

							<div className='contact-table'>
								<div className='contact-row contact-row-head'>
									<span className='contact-row-index'>#</span>
									<span className='contact-row-channel-label'>channel</span>
									<span className='contact-row-handle-label'>handle</span>
								</div>

								{[
									{
										name: 'Telegram',
										sub: 'fastest, most days',
										value: '@skipydev',
										url: 'https://t.me/PACCBET_3A_CEBEPOM',
										Icon: TelegramIcon,
									},
									{
										name: 'GitHub',
										sub: 'code, issues, the receipts',
										value: 'skipydev',
										url: 'https://github.com/skipydev',
										Icon: GithubIcon,
									},
									{
										name: 'Discord',
										sub: 'group calls, longer chats',
										value: 'skipy_dev',
										url: 'https://discord.com/users/YOUR_ID',
										Icon: DiscordIcon,
									},
									{
										name: 'Email',
										sub: 'usually replies within a day',
										value: 'hello@skipy.dev',
										url: 'mailto:hello@skipy.dev',
										Icon: EmailIcon,
									},
								].map((contact, i) => (
									<a
										key={contact.name}
										href={contact.url}
										target={
											contact.url.startsWith('mailto:') ? undefined : '_blank'
										}
										rel={
											contact.url.startsWith('mailto:')
												? undefined
												: 'noopener noreferrer'
										}
										className='reveal contact-row'
										style={{ ['--r-delay']: `${i * 0.08}s` } as CSSProperties}
									>
										<span className='contact-row-index'>
											{String(i + 1).padStart(2, '0')}
										</span>
										<div className='contact-row-channel'>
											<span className='contact-row-icon'>
												<contact.Icon />
											</span>
											<div className='contact-row-text'>
												<span className='contact-row-name'>
													{contact.name.toLowerCase()}
												</span>
												<span className='contact-row-sub'>{contact.sub}</span>
											</div>
										</div>
										<span className='contact-row-handle'>{contact.value}</span>
										<span className='contact-row-arrow'>
											<ArrowIcon />
										</span>
									</a>
								))}
							</div>

							<div
								className='contact-status reveal'
								style={{ ['--r-delay']: '0.45s' } as CSSProperties}
							>
								<span className='blink-dot' />
								open to work - usually replies within a day
							</div>

							<div
								className='contact-closing reveal'
								style={{ ['--r-delay']: '0.55s' } as CSSProperties}
							>
								<p className='contact-closing-text'>
									Whichever channel you pick, I'll actually reply — no
									auto-responder, no ghosting. Say hi.
								</p>
								<a
									href='#hero-top'
									onClick={e => {
										e.preventDefault()
										handleScroll('hero-top')
									}}
									className='contact-back-top magnetic'
								>
									back to top
									<span className='contact-back-top-arrow'>↑</span>
								</a>
							</div>
						</div>
					</div>
				</section>
			</main>

			<footer className='footer'>
				<div className='footer-inner'>
					<span className='footer-text'>
						© 2026 skipy.dev — built with React, Vite &amp; SCSS
					</span>

					<div className='footer-links'>
						<a
							href='https://github.com/skipydev'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='GitHub'
							className='footer-icon magnetic'
						>
							<GithubIcon />
						</a>
						<a
							href='https://t.me/PACCBET_3A_CEBEPOM'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Telegram'
							className='footer-icon magnetic'
						>
							<TelegramIcon />
						</a>
						<a
							href='https://discord.com'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Discord'
							className='footer-icon magnetic'
						>
							<DiscordIcon />
						</a>
					</div>

					<span className='footer-status'>
						<span className='blink-dot' />
						all systems operational
					</span>
				</div>
			</footer>

			<div className='vinyl-wrap'>
				<audio
					ref={audioRef}
					src='/Hugo TSR - Fenêtre Sur Rue.mp3'
					loop
					onError={() => {}}
				/>
				<button
					className={`vinyl-disc ${isPlaying ? 'is-playing' : ''}`}
					onClick={toggle}
					aria-label={isPlaying ? 'Pause' : 'Play'}
				>
					<span className='vinyl-label'>
						{isPlaying ? <PauseIcon /> : <PlayIcon />}
					</span>
				</button>
				<div className='vinyl-meta'>
					<strong>now spinning</strong>
					{isPlaying ? (
						<span className='vinyl-bars'>
							<span />
							<span />
							<span />
							<span />
						</span>
					) : (
						<span>tap the record</span>
					)}
				</div>
			</div>
		</>
	)
}
