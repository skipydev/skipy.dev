import { useEffect, type RefObject } from 'react'

export function useAsciiBackground(
	canvasRef: RefObject<HTMLCanvasElement | null>,
	isDark: boolean,
) {
	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const CHARS = ['.', ':', '+', '*', 'x', '#']
		const CELL = 16
		let width = 0
		let height = 0
		let cols = 0
		let rows = 0
		let raf = 0
		let t = 0

		const getColors = () => {
			const s = getComputedStyle(document.documentElement)
			return {
				red: s.getPropertyValue('--red-rgb').trim().replace(/\s+/g, ','),
				border: s.getPropertyValue('--border-rgb').trim().replace(/\s+/g, ','),
			}
		}
		let colors = getColors()

		const resize = () => {
			const parent = canvas.parentElement
			if (!parent) return
			const rect = parent.getBoundingClientRect()
			width = rect.width
			height = rect.height
			const dpr = window.devicePixelRatio || 1
			canvas.width = width * dpr
			canvas.height = height * dpr
			canvas.style.width = width + 'px'
			canvas.style.height = height + 'px'
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
			cols = Math.ceil(width / CELL)
			rows = Math.ceil(height / CELL)
		}

		requestAnimationFrame(() => {
			resize()
			colors = getColors()
		})

		const ro = new ResizeObserver(() => resize())
		if (canvas.parentElement) ro.observe(canvas.parentElement)
		window.addEventListener('resize', resize)

		const draw = () => {
			if (!width || !height) {
				raf = requestAnimationFrame(draw)
				return
			}
			ctx.clearRect(0, 0, width, height)
			ctx.font = `${CELL - 3}px 'JetBrains Mono', monospace`
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'

			const cx0 = cols / 2
			const cy0 = rows / 2

			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const dx = x - cx0
					const dy = (y - cy0) * 1.4
					const dist = Math.sqrt(dx * dx + dy * dy)
					const wave = Math.sin(dist * 0.5 - t) * 0.5 + 0.5

					if (wave > 0.58) {
						const idx = Math.min(
							CHARS.length - 1,
							Math.floor(((wave - 0.58) / 0.42) * CHARS.length),
						)
						const isHot = wave > 0.88
						const alpha = 0.1 + wave * 0.45
						ctx.fillStyle = isHot
							? `rgba(${colors.red},${alpha})`
							: `rgba(${colors.border},${alpha * 0.55})`
						ctx.fillText(CHARS[idx], x * CELL + CELL / 2, y * CELL + CELL / 2)
					}
				}
			}

			t += 0.016
			raf = requestAnimationFrame(draw)
		}
		raf = requestAnimationFrame(draw)

		return () => {
			cancelAnimationFrame(raf)
			ro.disconnect()
			window.removeEventListener('resize', resize)
		}
	}, [canvasRef, isDark])
}
