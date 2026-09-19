import type { CSSProperties } from 'react'
import { NAV_ITEMS } from '../data/content'
import { MoonIcon, SunIcon } from './icons'

type HeaderProps = {
	isDark: boolean
	onToggleTheme: () => void
	isMenuOpen: boolean
	onToggleMenu: () => void
	onNavClick: (e: React.MouseEvent<HTMLElement>, id: string) => void
}

export function Header({
	isDark,
	onToggleTheme,
	isMenuOpen,
	onToggleMenu,
	onNavClick,
}: HeaderProps) {
	return (
		<header className='header'>
			<div className='header-inner'>
				<a href='#' onClick={e => onNavClick(e, 'hero-top')} className='logo'>
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
							onClick={e => onNavClick(e, item.id)}
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
						onClick={onToggleTheme}
						aria-label={
							isDark ? 'Switch to light theme' : 'Switch to dark theme'
						}
						className='theme-toggle'
					>
						{isDark ? <MoonIcon /> : <SunIcon />}
					</button>

					<button
						className={`burger-btn mobile-nav-trigger ${isMenuOpen ? 'is-open' : ''}`}
						onClick={onToggleMenu}
						aria-label='Toggle menu'
					>
						<span className='burger-lines'>
							<span className='burger-line' />
							<span className='burger-line' />
							<span className='burger-line' />
						</span>
					</button>
				</div>
			</div>

			<nav
				className={`mobile-nav mobile-nav-trigger ${isMenuOpen ? 'is-open' : ''}`}
			>
				<div className='mobile-nav-list'>
					{NAV_ITEMS.map((item, i) => (
						<a
							key={item.id}
							href={`#${item.id}`}
							onClick={e => onNavClick(e, item.id)}
							className='mobile-nav-item'
							style={{ ['--r-delay']: `${0.45 + i * 0.06}s` } as CSSProperties}
						>
							<span className='mobile-nav-num'>{item.num}</span>
							<span className='mobile-nav-label'>{item.label}</span>
							<span className='mobile-nav-arrow'>↘</span>
						</a>
					))}
				</div>

				<div
					className='mobile-nav-footer'
					style={
						{
							['--r-delay']: `${0.45 + NAV_ITEMS.length * 0.06}s`,
						} as CSSProperties
					}
				>
					<span>built with React, Vite &amp; TS</span>
				</div>
			</nav>
		</header>
	)
}
