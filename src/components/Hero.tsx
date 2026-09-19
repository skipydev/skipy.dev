import type { RefObject } from 'react'

type HeroProps = {
	bannerRef: RefObject<HTMLDivElement | null>
	asciiCanvasRef: RefObject<HTMLCanvasElement | null>
	onScrollTo: (id: string) => void
}

export function Hero({ bannerRef, asciiCanvasRef, onScrollTo }: HeroProps) {
	return (
		<section id='hero-top' className='hero-section'>
			<div className='profile-banner' ref={bannerRef}>
				<canvas ref={asciiCanvasRef} className='ascii-canvas banner-canvas' />
			</div>

			<div className='reveal hero-content'>
				<div className='profile-header-row'>
					<div className='profile-left'>
						<div className='profile-avatar-wrap'>
							<img
								src={`${import.meta.env.BASE_URL}avatar.gif`}
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
								<p className='about-quote hero-quote'>
									"Making stuff that doesn't break"
								</p>
							</div>

							<p className='hero-subtitle'>
								I build web applications. Mostly backend, some frontend. I'm
								19. Sometimes the code works, sometimes it doesn't — that's
								just development. I know Go, TypeScript, React. I like
								understanding how things actually work instead of blindly
								following tutorials. That's basically it.
							</p>

							<div className='hero-buttons'>
								<a
									href='#contact'
									onClick={() => onScrollTo('contact')}
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
							</div>
						</div>
					</div>
				</div>
			</div>

			<button
				className='scroll-cue'
				onClick={() => onScrollTo('about')}
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
	)
}
