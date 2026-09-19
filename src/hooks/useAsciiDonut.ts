import { useEffect, type RefObject } from 'react'

const CHARS = '.,-~:;=!*#$@'

export function useAsciiDonut(canvasRef: RefObject<HTMLCanvasElement | null>) {
	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		const CELL = 9
		let width = 0
		let height = 0
		let cols = 0
		let rows = 0
		let raf = 0

		let angleA = 1
		let angleB = 1
		let dragging = false
		let lastX = 0
		let lastY = 0

		const getInkColor = () =>
			getComputedStyle(document.documentElement)
				.getPropertyValue('--ink-rgb')
				.trim()
				.replace(/\s+/g, ',')

		const resize = () => {
			const parent = canvas.parentElement
			if (!parent) return
			const rect = parent.getBoundingClientRect()
			width = rect.width
			height = rect.height
			const dpr = window.devicePixelRatio || 1
			canvas.width = width * dpr
			canvas.height = height * dpr
			canvas.style.width = `${width}px`
			canvas.style.height = `${height}px`
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
			cols = Math.max(1, Math.floor(width / CELL))
			rows = Math.max(1, Math.floor(height / CELL))
		}

		requestAnimationFrame(resize)

		const ro = new ResizeObserver(() => resize())
		if (canvas.parentElement) ro.observe(canvas.parentElement)
		window.addEventListener('resize', resize)

		const onPointerDown = (e: PointerEvent) => {
			dragging = true
			lastX = e.clientX
			lastY = e.clientY
			canvas.setPointerCapture(e.pointerId)
			canvas.style.cursor = 'grabbing'
		}
		const onPointerMove = (e: PointerEvent) => {
			if (!dragging) return
			angleB += (e.clientX - lastX) * 0.012
			angleA += (e.clientY - lastY) * 0.012
			lastX = e.clientX
			lastY = e.clientY
		}
		const onPointerUp = (e: PointerEvent) => {
			dragging = false
			canvas.style.cursor = 'grab'
			if (canvas.hasPointerCapture(e.pointerId)) {
				canvas.releasePointerCapture(e.pointerId)
			}
		}
		canvas.style.cursor = 'grab'
		canvas.addEventListener('pointerdown', onPointerDown)
		window.addEventListener('pointermove', onPointerMove)
		window.addEventListener('pointerup', onPointerUp)

		const draw = () => {
			if (!width || !height || !cols || !rows) {
				raf = requestAnimationFrame(draw)
				return
			}

			const size = cols * rows
			const zbuffer = new Float32Array(size)
			const buffer = new Array<string>(size).fill(' ')

			const R1 = 1
			const R2 = 2.1
			const K2 = 5
			const K1 = (cols * K2 * 0.35) / (R1 + R2)

			const cosA = Math.cos(angleA)
			const sinA = Math.sin(angleA)
			const cosB = Math.cos(angleB)
			const sinB = Math.sin(angleB)

			for (let theta = 0; theta < 6.2832; theta += 0.07) {
				const costheta = Math.cos(theta)
				const sintheta = Math.sin(theta)
				const circlex = R2 + R1 * costheta
				const circley = R1 * sintheta

				for (let phi = 0; phi < 6.2832; phi += 0.02) {
					const cosphi = Math.cos(phi)
					const sinphi = Math.sin(phi)

					const x =
						circlex * (cosB * cosphi + sinA * sinB * sinphi) -
						circley * cosA * sinB
					const y =
						circlex * (sinB * cosphi - sinA * cosB * sinphi) +
						circley * cosA * cosB
					const z = K2 + cosA * circlex * sinphi + circley * sinA
					const ooz = 1 / z

					const xp = Math.floor(cols / 2 + K1 * ooz * x)
					const yp = Math.floor(rows / 2 - K1 * ooz * y)

					if (xp >= 0 && xp < cols && yp >= 0 && yp < rows) {
						const idx = xp + cols * yp
						const luminance =
							cosphi * costheta * sinB -
							cosA * costheta * sinphi -
							sinA * sintheta +
							cosB * (cosA * sintheta - costheta * sinA * sinphi)

						if (luminance > 0 && ooz > zbuffer[idx]) {
							zbuffer[idx] = ooz
							const lumIndex = Math.min(
								CHARS.length - 1,
								Math.max(0, Math.floor(luminance * 8)),
							)
							buffer[idx] = CHARS[lumIndex]
						}
					}
				}
			}

			ctx.clearRect(0, 0, width, height)
			ctx.font = `${CELL}px 'JetBrains Mono', monospace`
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'
			ctx.fillStyle = `rgb(${getInkColor()})`

			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const ch = buffer[x + cols * y]
					if (ch !== ' ') {
						ctx.fillText(ch, x * CELL + CELL / 2, y * CELL + CELL / 2)
					}
				}
			}

			if (!dragging) {
				angleA += 0.011
				angleB += 0.006
			}

			raf = requestAnimationFrame(draw)
		}
		raf = requestAnimationFrame(draw)

		return () => {
			cancelAnimationFrame(raf)
			ro.disconnect()
			window.removeEventListener('resize', resize)
			canvas.removeEventListener('pointerdown', onPointerDown)
			window.removeEventListener('pointermove', onPointerMove)
			window.removeEventListener('pointerup', onPointerUp)
		}
	}, [canvasRef])
}
