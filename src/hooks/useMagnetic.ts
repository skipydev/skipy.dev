import { useEffect } from 'react'

export function useMagnetic() {
	useEffect(() => {
		if (!window.matchMedia('(pointer: fine)').matches) return

		const onMove = (e: globalThis.MouseEvent) => {
			const el = (e.target as HTMLElement | null)?.closest?.<HTMLElement>('.magnetic')
			if (!el) return
			const rect = el.getBoundingClientRect()
			const x = (e.clientX - rect.left - rect.width / 2) * 0.3
			const y = (e.clientY - rect.top - rect.height / 2) * 0.3
			el.style.transform = `translate3d(${x}px,${y}px,0)`
		}

		const onLeave = (e: globalThis.MouseEvent) => {
			const el = (e.target as HTMLElement | null)?.closest?.<HTMLElement>('.magnetic')
			if (el) el.style.transform = 'translate3d(0,0,0)'
		}

		document.addEventListener('mousemove', onMove, { passive: true })
		document.addEventListener('mouseleave', onLeave, {
			passive: true,
			capture: true,
		})

		return () => {
			document.removeEventListener('mousemove', onMove)
			document.removeEventListener('mouseleave', onLeave, { capture: true })
		}
	}, [])
}
