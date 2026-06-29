import { useEffect, useRef } from 'react'
import './App.css'
import { Layout } from './components/layout'

// Данные для стека (в виде графика)
const stackData = [
	{ name: 'TypeScript', lvl: 90, icon: 'TS' },
	{ name: 'React/Next', lvl: 85, icon: 'RE' },
	{ name: 'NestJS', lvl: 80, icon: 'NE' },
	{ name: 'Go', lvl: 60, icon: 'GO' },
	{ name: 'PostgreSQL', lvl: 75, icon: 'DB' },
]

// Твои пет-проекты с гитхаба
const projects = [
	{
		title: 'EasyPhysics',
		desc: 'Учебный проект, который улетел в архив за неактивность, но дал мне дохуя опыта в деплое.',
		link: '#',
	},
	{
		title: 'CLI Tools',
		desc: 'Набор тулзов на Go для автоматизации рутины на Linux.',
		link: '#',
	},
	{
		title: 'Fullstack E-com',
		desc: 'Классика жанра. NestJS на бэке, React на фронте.',
		link: '#',
	},
]

function App() {
	const revealRefs = useRef<(HTMLElement | null)[]>([])

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible')
					}
				})
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
		)

		revealRefs.current.forEach(ref => ref && observer.observe(ref))
		return () => observer.disconnect()
	}, [])

	const addToRefs = (el: HTMLElement | null) => {
		if (el && !revealRefs.current.includes(el)) {
			revealRefs.current.push(el)
		}
	}

	return (
		<Layout>
			<section className='w-full max-w-300 mx-auto px-6 py-20 md:py-40 flex flex-col items-start justify-center'>
				<h1 className='text-6xl md:text-9xl font-black font-sans uppercase tracking-tighter leading-none mb-6'>
					Maxim <br />
					<span className='text-blood font-serif italic font-medium'>
						Skipy.
					</span>
				</h1>
				<p className='max-w-2xl text-lg md:text-2xl font-medium opacity-80 leading-relaxed mb-10'>
					Пишу код, готовлюсь к ЕГЭ и пытаюсь поступать в ИТМО. Я не строю из
					себя сеньор-архитектора корпорации — я просто пацан, который старается
					делать <span className='text-blood font-bold'>качественные</span> и{' '}
					<span className='text-blood font-bold'>стабильные</span> вещи.
				</p>
				<div className='flex flex-col sm:flex-row gap-4'>
					<a href='#contact' className='btn-square'>
						Contact me
					</a>
					<a
						href='https://github.com/skipydev'
						target='_blank'
						className='btn-square border-opacity-50'
					>
						GitHub
					</a>
				</div>
			</section>

			{/* ABOUT SECTION (Мягкая форма) */}
			<section id='about' className='px-4' ref={addToRefs}>
				<div className='soft-section flex flex-col md:flex-row gap-12 items-center reveal'>
					<div className='flex-1'>
						<h2 className='text-4xl md:text-6xl font-black mb-6'>
							Who the <span className='text-blood'>fuck</span> am I?
						</h2>
						<p className='text-lg opacity-80 mb-4 leading-relaxed'>
							Мне 16, базируюсь в Москве. Люблю Linux, гонять таски на Hack The
							Box и писать бэкенд, который не падает от двух юзеров. Сейчас
							прохожу стажировку, параллельно ботаю алгосы и математику.
						</p>
						<p className='text-lg opacity-80 leading-relaxed'>
							Делаю упор на архитектуру, но если надо — могу и фронт наверстать
							так, чтобы это не выглядело как привет из 2007-го.
						</p>
					</div>
					<div className='flex-1 flex justify-center'>
						<div className='w-64 h-64 bg-current rounded-[3rem] rotate-12 flex items-center justify-center text-bg text-8xl font-serif hover:rotate-0 transition-transform duration-500 cursor-pointer'>
							{'}'}
						</div>
					</div>
				</div>
			</section>

			<section id='stack' className='px-4 py-20' ref={addToRefs}>
				<div className='max-w-[1200px] mx-auto reveal'>
					<h2 className='text-4xl md:text-6xl font-black mb-16 text-center uppercase'>
						My <span className='text-blood'>Arsenal</span>
					</h2>

					{/* Тот самый уникальный стек в виде вылетающей гистограммы */}
					<div className='flex items-end justify-center gap-2 md:gap-6 h-80 border-b-2 border-current pb-2 relative'>
						{stackData.map((tech, i) => (
							<div
								key={tech.name}
								className='bar-chart-item flex flex-col items-center group w-16 md:w-24 relative'
								style={{ transitionDelay: `${i * 150}ms` }}
							>
								{/* Всплывающая подсказка */}
								<span className='absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-sm text-blood font-bold whitespace-nowrap'>
									{tech.name}
								</span>

								{/* Сам столбик */}
								<div
									className='w-full bg-current rounded-t-xl group-hover:bg-blood transition-colors duration-300'
									style={{ height: `${tech.lvl}%` }}
								>
									<div className='w-full h-full flex items-end justify-center pb-4 text-bg font-black opacity-50 group-hover:opacity-100'>
										{tech.icon}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* PROJECTS SECTION (Сетка из гитхаб пет-проектов) */}
			<section id='projects' className='px-4 py-20' ref={addToRefs}>
				<div className='max-w-[1200px] mx-auto reveal'>
					<h2 className='text-4xl md:text-6xl font-black mb-12 uppercase'>
						Pet <span className='text-blood'>Projects</span>
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{projects.map((proj, i) => (
							<a
								href={proj.link}
								key={i}
								className='block p-8 border-2 border-current hover:-translate-y-2 hover:border-blood transition-all duration-300 group'
							>
								<h3 className='text-2xl font-bold mb-4 group-hover:text-blood transition-colors'>
									{proj.title}
								</h3>
								<p className='opacity-70'>{proj.desc}</p>
								<div className='mt-8 font-mono text-sm uppercase border-b border-current inline-block pb-1 group-hover:border-blood group-hover:text-blood'>
									View Source
								</div>
							</a>
						))}
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default App
