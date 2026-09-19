import type { CSSProperties } from 'react'
import { GITHUB_REPOS_URL, PROJECTS } from '../data/content'
import { ArrowIcon } from './icons'

export function Projects() {
	return (
		<section id='projects' className='section section-wide'>
			<div className='reveal'>
				<div className='section-content'>
					<div className='section-label'>$ ls ~/projects</div>
					<h2 className='section-title'>
						Learning projects, <span className='highlight'>not demo apps.</span>
					</h2>
					<p className='section-description'>
						My GitHub is mostly learning repos and projects I built to
						understand something better. Not polished portfolio pieces.
						That's fine — this is where you actually learn, making mistakes
						and iterating. Better than fake apps that look good but teach you
						nothing.
					</p>

					<div className='terminal-window projects-window reveal'>
						<div className='terminal-titlebar'>
							<span className='terminal-dot terminal-dot-red' />
							<span className='terminal-dot terminal-dot-yellow' />
							<span className='terminal-dot terminal-dot-green' />
							<span className='terminal-titlebar-name'>~/projects</span>
						</div>

						<div className='projects-window-content'>
							{PROJECTS.map((proj, idx) => (
								<a
									key={proj.name}
									href={proj.url}
									target='_blank'
									rel='noopener noreferrer'
									className='project-row reveal'
									style={{ ['--r-delay']: `${idx * 0.1}s` } as CSSProperties}
								>
									<div className='project-row-head'>
										<span className='project-row-name'>{proj.name}</span>
										<span className='project-row-arrow'>
											<ArrowIcon />
										</span>
									</div>
									<p className='project-row-desc'>{proj.desc}</p>
									<div className='project-row-tags'>
										{proj.tags.map(tag => (
											<span key={tag} className='project-row-tag'>
												{tag}
											</span>
										))}
									</div>
								</a>
							))}

							<a
								href={GITHUB_REPOS_URL}
								target='_blank'
								rel='noopener noreferrer'
								className='project-row-all'
							>
								<span>rest on GitHub — 13+ repos</span>
								<ArrowIcon />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
