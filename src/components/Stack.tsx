import type { CSSProperties } from 'react'
import { STACK_CHAPTERS } from '../data/content'

type Tool = (typeof STACK_CHAPTERS)[number]['tools'][number]

const totalTools = STACK_CHAPTERS.reduce((sum, c) => sum + c.tools.length, 0)

// enough repeats so each half of the track comfortably outspans any viewport width,
// otherwise the seamless -50% loop shows a gap for short tool lists
const MIN_ITEMS_PER_HALF = 16
const SECONDS_PER_ITEM = 9

function ToolChip({ tool, showDot }: { tool: Tool; showDot: boolean }) {
	return (
		<span className='tool-chip-wrap'>
			<span className='tool-chip'>
				<span
					className='icon-mask tool-chip-icon'
					style={
						{
							['--icon-url']: `url(https://cdn.simpleicons.org/${tool.slug})`,
						} as CSSProperties
					}
				/>
				<span className='tool-chip-name'>{tool.name}</span>
			</span>
			{showDot && <span className='tool-chip-dot'>·</span>}
		</span>
	)
}

export function Stack() {
	return (
		<section id='stack' className='section'>
			<div className='reveal'>
				<div className='section-content'>
					<div className='section-label'>$ ls ~/stack</div>
					<h2 className='section-title'>
						the <span className='highlight'>working</span> stack.
					</h2>
					<p className='section-description'>
						Not a buzzword list. These are tools I write code with every day,
						understand the trade-offs, know when they make sense and when
						they don't.
					</p>

					<div className='stack-chapters'>
						{STACK_CHAPTERS.map((chapter, idx) => {
							const direction = idx % 2 === 0 ? 'left' : 'right'
							const repeatsPerHalf = Math.max(
								1,
								Math.ceil(MIN_ITEMS_PER_HALF / chapter.tools.length),
							)
							const half = Array.from({ length: repeatsPerHalf }).flatMap(
								() => chapter.tools,
							)
							const tiles = [...half, ...half]
							const duration = half.length * SECONDS_PER_ITEM

							return (
								<div
									key={chapter.title}
									className='chapter reveal'
									style={{ ['--r-delay']: `${idx * 0.1}s` } as CSSProperties}
								>
									<div className='chapter-head'>
										<span className='chapter-num'>
											{String(idx + 1).padStart(2, '0')}
										</span>
										<span className='chapter-rule' />
										<h3 className='chapter-title'>{chapter.title}</h3>
										<span className='chapter-count'>
											{String(chapter.tools.length).padStart(2, '0')} tools
										</span>
									</div>
									<p className='chapter-desc'>{chapter.desc}</p>

									<div className={`marquee marquee-${direction}`}>
										<div
											className='marquee-track'
											style={{ ['--marquee-duration']: `${duration}s` } as CSSProperties}
										>
											{tiles.map((tool, i) => (
												<ToolChip
													key={`${tool.name}-${i}`}
													tool={tool}
													showDot
												/>
											))}
										</div>
									</div>

									<div className='chapter-tools-static'>
										{chapter.tools.map((tool, i) => (
											<ToolChip
												key={tool.name}
												tool={tool}
												showDot={i < chapter.tools.length - 1}
											/>
										))}
									</div>
								</div>
							)
						})}
					</div>

					<div className='stack-footer'>
						$ {totalTools} tools total — sorted by where they live in the work.
					</div>
				</div>
			</div>
		</section>
	)
}
