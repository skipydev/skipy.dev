import type { CSSProperties } from 'react'
import { EXPERIENCE_ITEMS } from '../data/content'

export function Experience() {
	return (
		<section id='experience' className='section section-wide'>
			<div className='reveal'>
				<div className='section-content'>
					<div className='section-label'>$ cat timeline.log</div>
					<h2 className='section-title'>Learning by shipping.</h2>

					<div className='terminal-window experience-log reveal'>
						<div className='terminal-titlebar'>
							<span className='terminal-dot terminal-dot-red' />
							<span className='terminal-dot terminal-dot-yellow' />
							<span className='terminal-dot terminal-dot-green' />
							<span className='terminal-titlebar-name'>timeline.log</span>
						</div>

						<div className='experience-log-content'>
							{EXPERIENCE_ITEMS.map((item, i) => (
								<div
									key={item.title}
									className='log-entry reveal'
									style={{ ['--r-delay']: `${i * 0.1}s` } as CSSProperties}
								>
									<div className='log-entry-head'>
										<span className='log-year'>[{item.year}]</span>
										<span className='log-title'>{item.title}</span>
										{item.tags[0] && (
											<span className='log-tag'>{item.tags[0]}</span>
										)}
									</div>
									<p className='log-desc'>{item.desc}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
