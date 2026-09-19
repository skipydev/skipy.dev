import {
	DiscordIcon,
	EmailIcon,
	GithubIcon,
	TelegramIcon,
} from '../components/icons'

export const NAV_ITEMS = [
	{ id: 'about', num: '01', label: 'about' },
	{ id: 'stack', num: '02', label: 'stack' },
	{ id: 'experience', num: '03', label: 'experience' },
	{ id: 'projects', num: '04', label: 'projects' },
	{ id: 'contact', num: '05', label: 'contact' },
]

export const STACK_CHAPTERS = [
	{
		title: 'languages',
		desc: 'Sharpened, low-level, daily.',
		tools: [
			{ slug: 'typescript', name: 'TypeScript' },
			{ slug: 'javascript', name: 'JavaScript' },
			{ slug: 'python', name: 'Python' },
			{ slug: 'go', name: 'Go' },
			{ slug: 'cplusplus', name: 'C++' },
		],
	},
	{
		title: 'frontend',
		desc: 'Interfaces and client-side logic.',
		tools: [
			{ slug: 'react', name: 'React' },
			{ slug: 'nextdotjs', name: 'Next.js' },
			{ slug: 'tailwindcss', name: 'Tailwind' },
			{ slug: 'html5', name: 'HTML5' },
			{ slug: 'vite', name: 'Vite' },
		],
	},
	{
		title: 'backend & data',
		desc: 'Architecture, APIs and data handling.',
		tools: [
			{ slug: 'nestjs', name: 'NestJS' },
			{ slug: 'nodedotjs', name: 'Node.js' },
			{ slug: 'postgresql', name: 'PostgreSQL' },
			{ slug: 'prisma', name: 'Prisma' },
			{ slug: 'redis', name: 'Redis' },
			{ slug: 'mysql', name: 'MySQL' },
		],
	},
	{
		title: 'infra & devops',
		desc: 'Environment and deployment.',
		tools: [
			{ slug: 'linux', name: 'Linux' },
			{ slug: 'docker', name: 'Docker' },
			{ slug: 'git', name: 'Git' },
			{ slug: 'nginx', name: 'Nginx' },
		],
	},
]

export const ABOUT_PRINCIPLES = [
	{ n: '01', text: 'Understand the code you write' },
	{ n: '02', text: 'Test before you ship' },
	{ n: '03', text: 'Performance matters' },
	{ n: '04', text: 'Maintainability > cleverness' },
]

export const EXPERIENCE_ITEMS = [
	{
		year: '2026 — Present',
		title: 'Production Code',
		desc: "Working with real production systems is different than building demos. Performance matters. Debugging production issues taught me more than any course. Getting feedback from senior devs, understanding why your code is slow, seeing what happens when you don't handle errors properly.",
		tags: ['TASKFORCE'],
	},
	{
		year: 'Ongoing',
		title: 'Linux & Systems',
		desc: 'Using Linux daily (CachyOS) because I want to know how things actually work, not just use a black box. Understanding what’s happening on the OS level helps when debugging, deploying, or designing systems. Can’t write performant code if you don’t understand how the system works.',
		tags: ['HackTheBox + Linux deep dives'],
	},
	{
		year: 'In progress',
		title: 'Fundamentals & Algorithms',
		desc: 'ИТМО prep for algorithms and computer science fundamentals. Not trying to be a competitive programmer, but understanding the fundamentals changes how you approach problems. Big O notation, data structures, why some solutions are better than others — that stuff matters.',
		tags: [],
	},
]

export const PROJECTS = [
	{
		name: 'skipy.dev',
		url: 'https://github.com/skipydev/skipy.dev',
		desc: "This site. Open source — the terminal chrome, the marquee, the ASCII donut, all hand-rolled with no extra dependencies. Copy whatever's useful.",
		tags: ['React', 'TypeScript', 'Vite'],
	},
	{
		name: 'easy-ph',
		url: 'https://github.com/skipydev/EasyPH',
		desc: 'Built an EGE learning platform because existing ones suck or cost money. DeepSeek for the backend, actual resources, not hallucination. Sometimes the best project is just solving a problem that exists.',
		tags: ['React', 'TypeScript', 'Go'],
	},
]

const GITHUB_HANDLE = 'skipydev'
export const GITHUB_URL = `https://github.com/${GITHUB_HANDLE}`
const TELEGRAM_HANDLE = '@skipydev'
export const TELEGRAM_URL = 'https://t.me/PACCBET_3A_CEBEPOM'
const DISCORD_HANDLE = 'socoolbaby'
const DISCORD_URL = 'https://discord.gg/VKqSreqpHw'
const EMAIL_HANDLE = 'hello@skipy.dev'
const EMAIL_URL = `mailto:${EMAIL_HANDLE}`

export const CONTACTS = [
	{
		id: 'telegram',
		name: 'Telegram',
		sub: 'fastest',
		handle: TELEGRAM_HANDLE,
		url: TELEGRAM_URL,
		Icon: TelegramIcon,
		inFooter: true,
	},
	{
		id: 'github',
		name: 'GitHub',
		sub: 'code stuff',
		handle: GITHUB_HANDLE,
		url: GITHUB_URL,
		Icon: GithubIcon,
		inFooter: true,
	},
	{
		id: 'discord',
		name: 'Discord',
		sub: 'longer conversations',
		handle: DISCORD_HANDLE,
		url: DISCORD_URL,
		Icon: DiscordIcon,
		inFooter: true,
	},
	{
		id: 'email',
		name: 'Email',
		sub: 'formal inquiries',
		handle: EMAIL_HANDLE,
		url: EMAIL_URL,
		Icon: EmailIcon,
		inFooter: false,
	},
]

export const GITHUB_REPOS_URL = `${GITHUB_URL}?tab=repositories`
