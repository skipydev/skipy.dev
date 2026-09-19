import type { CSSProperties } from 'react'
import { CONTACTS } from '../data/content'
import { ArrowIcon } from './icons'

type ContactProps = {
	onScrollTo: (id: string) => void
}

export function Contact({ onScrollTo }: ContactProps) {
	return (
		<section id='contact' className='section section-wide contact-section'>
			<div className='reveal'>
				<div className='section-content'>
					<div className='section-label'>$ contact --open</div>
					<h2 className='section-title contact-title'>Get in touch.</h2>
					<p className='section-description'>
						Looking for internships, projects, or just talking about code. Use
						whatever works for you.
					</p>

					<div className='contact-table'>
						<div className='contact-row contact-row-head'>
							<span className='contact-row-index'>#</span>
							<span className='contact-row-channel-label'>channel</span>
							<span className='contact-row-handle-label'>handle</span>
						</div>

						{CONTACTS.map((contact, i) => (
							<a
								key={contact.id}
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
								<span className='contact-row-handle'>{contact.handle}</span>
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
						open to work — respond within 24h
					</div>

					<div
						className='contact-closing reveal'
						style={{ ['--r-delay']: '0.55s' } as CSSProperties}
					>
						<p className='contact-closing-text'>
							I actually respond. No ghosting, no auto-reply nonsense.
						</p>
						<a
							href='#hero-top'
							onClick={e => {
								e.preventDefault()
								onScrollTo('hero-top')
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
	)
}
