import type { CSSProperties } from 'react'
import { AsciiDonut } from './AsciiDonut'
import { ABOUT_PRINCIPLES } from '../data/content'

const WHOAMI_ROWS = [
	{ key: 'mode', value: 'backend-focused full-stack', accent: true },
	{ key: 'focus', value: 'system design, performance', accent: false },
	{ key: 'stack', value: 'Go, TypeScript, React', accent: false },
	{ key: 'infra', value: 'Linux, Docker, PostgreSQL', accent: false },
]

export function About() {
	return (
		<section id='about' className='section'>
			<div className='reveal'>
				<div className='section-content'>
					<div className='section-label'>$ whoami</div>
					<h2 className='section-title'>
						Just build real <span className='highlight'>dope.</span>
					</h2>

					<div className='about-grid'>
						<div
							className='about-lead reveal'
							style={{ ['--r-delay']: '0.1s' } as CSSProperties}
						>
							<p className='about-quote'>
								"Code you understand beats code that looks clever."
							</p>
							<p className='section-text'>
								I care about writing code that works and that I actually
								understand. Not clever, not trendy — code that does what it's
								supposed to do.
							</p>
							<p className='section-text'>
								Backend is where I spend most time. APIs, databases, scaling
								systems that don't fall apart. But I do full-stack because
								sometimes you need to — React for frontend, Go and Node for
								backend, Docker for deployment. Whatever solves the problem.
							</p>
							<p className='section-text'>
								Read documentation instead of StackOverflow. Understand why
								something works, not just copy the solution. Break your own
								code intentionally to see what breaks. That's how you actually
								learn instead of just being another developer who can't debug
								anything.
							</p>
						</div>

						<div
							className='whoami-card terminal-window reveal'
							style={{ ['--r-delay']: '0.15s' } as CSSProperties}
						>
							<div className='terminal-titlebar'>
								<span className='terminal-dot terminal-dot-red' />
								<span className='terminal-dot terminal-dot-yellow' />
								<span className='terminal-dot terminal-dot-green' />
								<span className='terminal-titlebar-name'>skipy@dev</span>
							</div>

							<div className='whoami-content'>
								<div className='whoami-cmd'>
									<span className='whoami-prompt'>skipy@dev:~$</span> fastfetch
								</div>
								<div className='whoami-body'>
									<AsciiDonut />
									<div className='whoami-info'>
										{WHOAMI_ROWS.map(row => (
											<div className='whoami-row' key={row.key}>
												<span className='whoami-key'>{row.key}</span>
												<span
													className={
														row.accent
															? 'whoami-value whoami-value-accent'
															: 'whoami-value'
													}
												>
													{row.value}
												</span>
											</div>
										))}
									</div>
								</div>

								<div className='whoami-cmd'>
									<span className='whoami-prompt'>skipy@dev:~$</span> cat
									principles.md
								</div>
								<div className='whoami-principles'>
									{ABOUT_PRINCIPLES.map(p => (
										<div className='whoami-principle' key={p.n}>
											<span className='whoami-principle-n'>{p.n} ›</span>
											<span className='whoami-principle-text'>{p.text}</span>
										</div>
									))}
								</div>

								<div className='whoami-cmd'>
									<span className='whoami-prompt'>skipy@dev:~$</span>
									<span className='whoami-cursor' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
