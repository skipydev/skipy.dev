import { type MouseEvent, useEffect, useState } from 'react'
import './App.css'

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

const TagIcon = ({ slug }: { slug: string }) => (
	<span className='tag-icon-wrap'>
		<img
			src={`https://cdn.simpleicons.org/${slug}`}
			alt=''
			className='tag-icon'
			loading='lazy'
		/>
	</span>
)

const SqlTagIcon = () => (
	<span className='tag-icon-wrap'>
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='tag-icon'
		>
			<ellipse cx='12' cy='5' rx='8' ry='3' />
			<path d='M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5' />
			<path d='M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6' />
		</svg>
	</span>
)

function App() {
	const [isDark, setIsDark] = useState(() => {
		return document.documentElement.classList.contains('dark-theme')
	})
	const [scrollProgress, setScrollProgress] = useState(0)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isMenuOpen])

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add('dark-theme')
			localStorage.setItem('theme', 'dark')
		} else {
			document.documentElement.classList.remove('dark-theme')
			localStorage.setItem('theme', 'light')
		}
	}, [isDark])

	useEffect(() => {
		const updateScrollProgress = () => {
			const scrollTop = window.scrollY
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight
			const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
			setScrollProgress(progress)
		}
		updateScrollProgress()
		window.addEventListener('scroll', updateScrollProgress, { passive: true })
		window.addEventListener('resize', updateScrollProgress)
		return () => {
			window.removeEventListener('scroll', updateScrollProgress)
			window.removeEventListener('resize', updateScrollProgress)
		}
	}, [])

	const handleScroll = (e: MouseEvent<HTMLElement>, id: string) => {
		e.preventDefault()
		const element = document.getElementById(id)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	useEffect(() => {
		if (!window.matchMedia('(pointer: fine)').matches) return
		const dot = document.querySelector<HTMLDivElement>('.cursor-dot')
		if (!dot) return

		let mouseX = -100
		let mouseY = -100
		let dotX = -100
		let dotY = -100
		let started = false
		let raf = 0

		const onMove = (e: globalThis.MouseEvent) => {
			mouseX = e.clientX
			mouseY = e.clientY
			if (!started) {
				started = true
				dotX = mouseX
				dotY = mouseY
				document.documentElement.classList.add('has-custom-cursor')
			}
		}

		const animate = () => {
			dotX += (mouseX - dotX) * 0.18
			dotY += (mouseY - dotY) * 0.18
			dot.style.transform = `translate(${dotX}px, ${dotY}px)`
			raf = requestAnimationFrame(animate)
		}
		raf = requestAnimationFrame(animate)

		const hoverables = document.querySelectorAll<HTMLElement>('a, button')
		const onEnter = () => dot.classList.add('is-hovering')
		const onLeave = () => dot.classList.remove('is-hovering')
		hoverables.forEach(el => {
			el.addEventListener('mouseenter', onEnter)
			el.addEventListener('mouseleave', onLeave)
		})

		window.addEventListener('mousemove', onMove)
		return () => {
			window.removeEventListener('mousemove', onMove)
			cancelAnimationFrame(raf)
			document.documentElement.classList.remove('has-custom-cursor')
			hoverables.forEach(el => {
				el.removeEventListener('mouseenter', onEnter)
				el.removeEventListener('mouseleave', onLeave)
			})
		}
	}, [])

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
			{ threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
		)
		revealEls.forEach(el => observer.observe(el))
		return () => observer.disconnect()
	}, [])

	const handleMenuLinkClick = (e: MouseEvent<HTMLElement>, id: string) => {
		handleScroll(e, id)
		setIsMenuOpen(false)
	}

	return (
		<>
			<div className='cursor-dot' />

			<div className='scroll-progress-track'>
				<div
					className='scroll-progress-bar'
					style={{ width: `${scrollProgress}%` }}
				/>
			</div>

			<div className='ambient-light light-1' />
			<div className='ambient-light light-2' />
			<div className='bg-text text-1'>QUICKNESS</div>
			<div className='bg-text text-2'>MULTITASKING</div>
			<div className='bg-text text-3'>CONVENIENCE</div>

			<header className='header'>
				<div className='header-container'>
					<a
						href='#'
						className='logo'
						onClick={e => handleMenuLinkClick(e, 'hero-top')}
					>
						<span className='bk bk-o'>{'{'}</span>
						<span> skipy.dev </span>
						<span className='bk bk-c'>{'}'}</span>
						<span className='logo-role'>| fullstack engineer</span>
					</a>

					<nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
						<div className='nav-links-wrapper'>
							<div className='nav-item'>
								<span className='nav-num'>01 </span>
								<a href='#about' onClick={e => handleMenuLinkClick(e, 'about')}>
									/about
								</a>
								<span className='nav-arrow'>↘</span>
							</div>
							<div className='nav-item'>
								<span className='nav-num'>02 </span>
								<a href='#stack' onClick={e => handleMenuLinkClick(e, 'stack')}>
									/stack
								</a>
								<span className='nav-arrow'>↘</span>
							</div>
							<div className='nav-item'>
								<span className='nav-num'>03 </span>
								<a
									href='#experience'
									onClick={e => handleMenuLinkClick(e, 'experience')}
								>
									experience
								</a>
								<span className='nav-arrow'>↘</span>
							</div>
							<div className='nav-item'>
								<span className='nav-num'>04</span>
								<a
									href='#contact'
									onClick={e => handleMenuLinkClick(e, 'contact')}
								>
									/contact
								</a>
								<span className='nav-arrow'>↘</span>
							</div>
						</div>

						<div className='nav-mobile-footer'>
							<span className='nav-footer-tech'>
								built with React, Vite & TS
							</span>
							<span className='nav-footer-status'>
								<span className='blink-dot dot-green' /> open to work
							</span>
						</div>
					</nav>

					<div className='header-controls'>
						<button
							className='theme-toggle'
							onClick={() => setIsDark(!isDark)}
							aria-label={
								isDark ? 'Switch to light theme' : 'Switch to dark theme'
							}
						>
							{isDark ? <MoonIcon /> : <SunIcon />}
						</button>

						<button
							className={`burger-btn ${isMenuOpen ? 'open' : ''}`}
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							aria-label='Toggle menu'
						>
							<span className='burger-line'></span>
							<span className='burger-line'></span>
							<span className='burger-line'></span>
						</button>
					</div>
				</div>
			</header>

			<main id='hero-top' className='hero grid-bg'>
				<span className='decor dec-1 flicker'>[ INIT_SEQ: TRUE ]</span>
				<span className='decor dec-2'>v.1.0.4</span>
				<span className='decor dec-5'>ROOT_ACCESS: GRANTED</span>

				<div className='container hero-container'>
					<div className='blob' />

					<div className='system-status'>
						<span className='blink-dot dot-green' />
						<span>alive</span>
					</div>

					<h1 className='hero-title'>
						Skipy<span className='cursor'>_</span>
					</h1>
					<p className='sub'>
						16 y.o. I design high-performance services and tune my workflow to
						fit the task at hand. Built on code stability, algorithmic
						efficiency, and a deep understanding of Linux tooling.
					</p>
					<div className='btns'>
						<a
							href='#contact'
							onClick={e => handleScroll(e, 'contact')}
							className='btn btn-k'
						>
							Say Hello
						</a>
						<a
							href='https://github.com/skipydev'
							target='_blank'
							rel='noopener noreferrer'
							className='btn btn-o'
						>
							GitHub
						</a>
						<a
							href={`${import.meta.env.BASE_URL}Skipy_CV.pdf`}
							target='_blank'
							rel='noopener noreferrer'
							className='btn btn-o'
						>
							Download CV
						</a>
					</div>
				</div>
			</main>

			<section id='about' className='section'>
				<div className='container numbered-section reveal'>
					<div className='section-side'>
						<div className='section-num'>01</div>
						<div className='section-num-label'>about</div>
						<div className='about-status'>
							<div className='status-eyebrow'>$ status</div>
							<div className='status-line status-online'>
								<span
									className='blink-dot dot-green'
									style={{ width: '6px', height: '6px' }}
								/>
								open to work
							</div>
							<div className='status-line'>
								<span className='status-key'>age</span>
								<span className='status-val'>16</span>
							</div>
							<div className='status-line'>
								<span className='status-key'>loc</span>
								<span className='status-val'>moscow</span>
							</div>
							<div className='status-line'>
								<span className='status-key'>tz</span>
								<span className='status-val'>utc+3</span>
							</div>
							<div className='status-line'>
								<span className='status-key'>os</span>
								<span className='status-val'>cachyos / win</span>
							</div>
						</div>
					</div>
					<div className='section-main' style={{ position: 'relative' }}>
						<span className='decor dec-3 flicker'>// SEC_01_READY</span>
						<span className='decor dec-6'>[ LOAD_MEM: 1024MB ]</span>
						<span className='deco-line deco-line-v deco-line-about' />
						<div className='about-eyebrow'>$ profile</div>
						<h2 className='about-headline'>
							I write software.
							<br />
							Mostly <span className='accent-script'>solo.</span>
						</h2>
						<p className='sec-desc'>
							I build complex backend solutions and full-featured web
							applications. My job is to create reliable, fast systems that
							handle heavy load with ease.
						</p>
						<p className='sec-desc'>
							I combine a deep understanding of architecture with a disciplined
							approach to clean code, leaning on proven tools and a Linux
							environment for everyday work.
						</p>
						<div className='about-table'>
							<div className='about-row'>
								<span className='about-row-key'>role</span>
								<span className='about-row-val'>
									backend & full-stack engineer
								</span>
							</div>
							<div className='about-row'>
								<span className='about-row-key'>focus</span>
								<span className='about-row-val'>system architecture</span>
							</div>
							<div className='about-row'>
								<span className='about-row-key'>native</span>
								<span className='about-row-val'>kitty, neovim</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id='stack' className='section grid-bg'>
				<div className='container numbered-section reveal'>
					<div className='section-side'>
						<div className='section-num'>02</div>
						<div className='section-num-label'>stack</div>
						<div className='about-status'>
							<div className='status-eyebrow'>$ facts</div>
							<div className='status-line status-online'>
								<span
									className='blink-dot dot-green'
									style={{ width: '6px', height: '6px' }}
								/>
								choleric
							</div>
							<div className='status-line'>
								<span className='status-key'>male</span>
								<span className='status-val'>man</span>
							</div>
							<div className='status-line'>
								<span className='status-key'>born</span>
								<span className='status-val'>2009</span>
							</div>
							<div className='status-line'>
								<span className='status-key'>tz</span>
								<span className='status-val'>utc+3</span>
							</div>
							<div className='status-line'>
								<span className='status-key'>work</span>
								<span className='status-val'>false</span>
							</div>
						</div>
					</div>
					<div className='section-main'>
						<span className='decor dec-4' style={{ top: '-20px', left: '0' }}>
							[ SYS.MODULES_LOADED ]
						</span>
						<div className='sec-title'>the working stack</div>

						<div className='bento-grid'>
							<div className='bento-card span-2'>
								<div className='bento-glow' />
								<div className='card-status-light'>
									<span className='blink-dot dot-green' />
								</div>
								<h3>
									<span className='accent'>01.</span> Backend & DB
								</h3>
								<p className='bento-desc'>
									Architecture, APIs and data handling.
								</p>
								<div className='bento-tags'>
									<span className='tag'>
										<TagIcon slug='nestjs' />
										NestJS
									</span>
									<span className='tag'>
										<TagIcon slug='go' />
										Go
									</span>
									<span className='tag'>
										<TagIcon slug='nodedotjs' />
										Node.js
									</span>
									<span className='tag'>
										<TagIcon slug='postgresql' />
										PostgreSQL
									</span>
									<span className='tag'>
										<TagIcon slug='prisma' />
										Prisma
									</span>
									<span className='tag'>
										<TagIcon slug='redis' />
										Redis
									</span>
									<span className='tag'>
										<SqlTagIcon />
										SQL
									</span>
								</div>
							</div>

							<div className='bento-card'>
								<div className='bento-glow' />
								<h3>
									<span className='accent'>02.</span> Frontend
								</h3>
								<p className='bento-desc'>Interfaces and client-side logic.</p>
								<div className='bento-tags'>
									<span className='tag'>
										<TagIcon slug='react' />
										React
									</span>
									<span className='tag'>
										<TagIcon slug='nextdotjs' />
										Next.js
									</span>
									<span className='tag'>
										<TagIcon slug='typescript' />
										TypeScript
									</span>
									<span className='tag'>
										<TagIcon slug='tailwindcss' />
										Tailwind
									</span>
									<span className='tag'>
										<TagIcon slug='html5' />
										HTML5
									</span>
									<span className='tag'>
										<TagIcon slug='vite' />
										Vite
									</span>
								</div>
							</div>

							<div className='bento-card'>
								<div className='bento-glow' />
								<h3>
									<span className='accent'>03.</span> Infra
								</h3>
								<p className='bento-desc'>Environment and deployment.</p>
								<div className='bento-tags'>
									<span className='tag'>
										<TagIcon slug='linux' />
										Linux
									</span>
									<span className='tag'>
										<TagIcon slug='docker' />
										Docker
									</span>
									<span className='tag'>
										<TagIcon slug='git' />
										Git
									</span>
									<span className='tag'>
										<TagIcon slug='nginx' />
										Nginx
									</span>
								</div>
							</div>

							<div className='bento-card span-2'>
								<div className='bento-glow' />
								<div className='card-status-light'>
									<span className='blink-dot dot-red' />
								</div>
								<h3>
									<span className='accent'>04.</span> Languages
								</h3>
								<div className='bento-lang-bars'>
									<div className='lang-bar-wrap'>
										<div className='lang-label'>
											<span>TypeScript / JavaScript</span> <span>90%</span>
										</div>
										<div className='lang-bar'>
											<div className='lang-progress' style={{ width: '90%' }} />
										</div>
									</div>
									<div className='lang-bar-wrap'>
										<div className='lang-label'>
											<span>Python</span> <span>77%</span>
										</div>
										<div className='lang-bar'>
											<div className='lang-progress' style={{ width: '77%' }} />
										</div>
									</div>
									<div className='lang-bar-wrap'>
										<div className='lang-label'>
											<span> C++ / Go</span> <span>39%</span>
										</div>
										<div className='lang-bar'>
											<div className='lang-progress' style={{ width: '39%' }} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id='experience' className='section'>
				<div className='container numbered-section reveal'>
					<div className='section-side'>
						<div className='section-num'>03</div>
						<div className='section-num-label'>experience</div>
					</div>
					<div className='section-main'>
						<span className='decor dec-3 flicker' style={{ right: '10%' }}>
							_WORKFLOW_ACTIVE
						</span>
						<div className='about-eyebrow'>$ timeline</div>
						<h2 className='about-headline'>
							Hands-on.
							<br />
							Tasks <span className='accent-script'>in production.</span>
						</h2>

						<div className='exp-list'>
							<div className='exp-item'>
								<div className='exp-year'>2026 - Present</div>
								<div className='exp-content'>
									<h4 className='exp-title'>
										IT Internship — Backend/Full-stack
									</h4>
									<p className='exp-desc'>
										Right now I'm doing an internship where I deal with real
										tasks in commercial development. It's a great chance to see
										theory applied in practice, get feedback, and optimize
										backend processes.
									</p>
								</div>
							</div>
							<div className='exp-item'>
								<div className='exp-year'>Daily Grind</div>
								<div className='exp-content'>
									<h4 className='exp-title'>Cybersec & System Tuning</h4>
									<p className='exp-desc'>
										In my free time I keep diving into systems administration
										and infosec — specifically, working through hands-on
										challenges on Hack The Box. At the same time I'm prepping
										for university admission, putting in a lot of hours on
										algorithms and exact sciences.
									</p>
								</div>
							</div>
							<div className='exp-item'>
								<div className='exp-year'>In Progress</div>
								<div className='exp-content'>
									<h4 className='exp-title'>Olympiads & Exams</h4>
									<p className='exp-desc'>
										Grinding algorithms, solving non-standard math problems, and
										prepping for exams (physics, CS, English) to get into a
										strong university.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id='contact' className='section contact-hero-style grid-bg'>
				<div className='container' style={{ position: 'relative' }}>
					<span className='decor dec-1 flicker' style={{ top: '-40px' }}>
						[ END_OF_FILE ]
					</span>
					<span className='decor dec-7'>AWAITING_INPUT...</span>

					<div className='contact-hero-content reveal'>
						<div
							className='about-eyebrow'
							style={{ justifyContent: 'center', display: 'flex' }}
						>
							$ /dev/null
						</div>
						<h2
							className='hero-title'
							style={{ fontSize: '42px', marginBottom: '24px' }}
						>
							Let's build <br />
							<span className='accent-script'>something sick.</span>
						</h2>
						<p
							className='sub'
							style={{ margin: '0 auto 40px', maxWidth: '480px' }}
						>
							: I'm always open to interesting work, whether it's building a new
							service or solving an unconventional technical problem. If you've
							got a project or an idea that needs solid technical execution, I'd
							love to talk. Reach out on messengers or drop me an email.
						</p>

						<div
							className='term'
							style={{ maxWidth: '500px', margin: '0 auto 40px' }}
						>
							<div className='term-chrome'>
								<span className='dot dr' />
								<span className='dot dy' />
								<span className='dot dg' />
								<span className='term-title'>skippy@arch — ping.sh</span>
							</div>
							<div className='term-body'>
								<span className='tg'>skippy@arch</span>
								<span className='tc'>:</span>
								<span className='tb'>~</span>
								<span className='tc'>$ </span>
								<span className='tw'>./ping_me.sh</span>
								{'\n'}
								<span className='ta'>telegram</span>
								<span className='td'> = </span>
								<a href='#' className='term-link'>
									"@PACCBET_3A_CEBEPOM"
								</a>
								{'\n'}
								<span className='ta'>discord</span>
								<span className='td'> = </span>
								<a href='#' className='term-link'>
									"@socoolbaby"
								</a>
								{'\n'}
								<span className='ta'>github</span>
								<span className='td'> = </span>
								<a href='#' className='term-link'>
									github.com/skipydev"
								</a>
								{'\n'}
								<span className='tg'>SUCCESS: Signal sent.</span>{' '}
								<span className='cursor' style={{ color: '#fff' }}>
									_
								</span>
							</div>
						</div>

						<div className='btns' style={{ justifyContent: 'center' }}>
							<a href='https://skipyy1@proton.me' className='btn btn-k'>
								Send Email
							</a>
						</div>
					</div>
				</div>
			</section>

			<footer className='site-footer'>
				<div className='container footer-container'>
					<span className='footer-copy'>
						© 2026 skipy.dev — built with React, Vite & TS
					</span>

					<div className='footer-links'>
						<a
							href='https://github.com/skipydev'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='GitHub'
						>
							<img
								src='https://cdn.simpleicons.org/github'
								alt=''
								className='footer-icon'
								loading='lazy'
							/>
						</a>
						<a
							href='https://t.me/@PACCBET_3A_CEBEPOM'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Telegram'
						>
							<img
								src='https://cdn.simpleicons.org/telegram'
								alt=''
								className='footer-icon'
								loading='lazy'
							/>
						</a>
						<a
							href='discord.com'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Discord'
						>
							<img
								src='https://cdn.simpleicons.org/discord'
								alt=''
								className='footer-icon'
								loading='lazy'
							/>
						</a>
					</div>

					<span className='footer-status'>
						<span className='blink-dot dot-green' />
						all systems operational
					</span>
				</div>
			</footer>
		</>
	)
}

export default App
