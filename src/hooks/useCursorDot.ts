import { useEffect } from 'react'

export function useCursorDot() {
	useEffect(() => {
		if (!window.matchMedia('(pointer: fine)').matches) return
		const dot = document.querySelector<HTMLDivElement>('.cursor-dot')
		if (!dot) return

		let mouseX = -100,
			mouseY = -100
		let dotX = -100,
			dotY = -100
		let started = false,
			raf = 0

		const onMove = (e: globalThis.MouseEvent) => {
			mouseX = e.clientX
			mouseY = e.clientY
			if (!started) {
				started = true
				dotX = mouseX
				dotY = mouseY
				document.documentElement.classList.add('has-custom-cursor')
			}

			const target = e.target as HTMLElement | null
			if (target?.closest?.('a, button, .magnetic')) {
				dot.classList.add('is-hovering')
			} else {
				dot.classList.remove('is-hovering')
			}
		}

		const animate = () => {
			dotX += (mouseX - dotX) * 0.18
			dotY += (mouseY - dotY) * 0.18
			dot.style.transform = `translate3d(${dotX}px,${dotY}px,0)`
			raf = requestAnimationFrame(animate)
		}
		raf = requestAnimationFrame(animate)

		window.addEventListener('mousemove', onMove, { passive: true })
		return () => {
			window.removeEventListener('mousemove', onMove)
			cancelAnimationFrame(raf)
			document.documentElement.classList.remove('has-custom-cursor')
		}
	}, [])
}
