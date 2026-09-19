import { useEffect, type RefObject } from 'react'

export function useDraggableFloat(ref: RefObject<HTMLElement | null>) {
	useEffect(() => {
		const el = ref.current
		if (!el) return

		let curX = 0,
			curY = 0
		let targetX = 0,
			targetY = 0
		let startOffsetX = 0,
			startOffsetY = 0
		let startClientX = 0,
			startClientY = 0
		let baseLeft = 0,
			baseTop = 0,
			width = 0,
			height = 0
		let dragging = false
		let moved = false
		let raf = 0

		const applyTransform = () => {
			el.style.transform = `translate3d(${curX}px, ${curY}px, 0)`
		}

		const animate = () => {
			curX += (targetX - curX) * 0.18
			curY += (targetY - curY) * 0.18
			applyTransform()
			if (Math.abs(targetX - curX) > 0.5 || Math.abs(targetY - curY) > 0.5) {
				raf = requestAnimationFrame(animate)
			} else {
				curX = targetX
				curY = targetY
				applyTransform()
				raf = 0
			}
		}

		const ensureAnimating = () => {
			if (!raf) raf = requestAnimationFrame(animate)
		}

		const clampTarget = () => {
			const minX = -baseLeft
			const maxX = window.innerWidth - baseLeft - width
			const minY = -baseTop
			const maxY = window.innerHeight - baseTop - height
			targetX = Math.min(Math.max(targetX, minX), maxX)
			targetY = Math.min(Math.max(targetY, minY), maxY)
		}

		const onPointerDown = (e: PointerEvent) => {
			if (e.pointerType === 'mouse' && e.button !== 0) return
			dragging = true
			moved = false
			const rect = el.getBoundingClientRect()
			baseLeft = rect.left - curX
			baseTop = rect.top - curY
			width = rect.width
			height = rect.height
			startClientX = e.clientX
			startClientY = e.clientY
			startOffsetX = targetX
			startOffsetY = targetY
			el.classList.add('is-dragging')
			window.addEventListener('pointermove', onPointerMove)
			window.addEventListener('pointerup', endDrag)
			window.addEventListener('pointercancel', endDrag)
		}

		const onPointerMove = (e: PointerEvent) => {
			if (!dragging) return
			const dx = e.clientX - startClientX
			const dy = e.clientY - startClientY
			if (Math.abs(dx) > 6 || Math.abs(dy) > 6) moved = true
			targetX = startOffsetX + dx
			targetY = startOffsetY + dy
			clampTarget()
			ensureAnimating()
		}

		const endDrag = () => {
			if (!dragging) return
			dragging = false
			el.classList.remove('is-dragging')
			window.removeEventListener('pointermove', onPointerMove)
			window.removeEventListener('pointerup', endDrag)
			window.removeEventListener('pointercancel', endDrag)
			ensureAnimating()
		}

		const onClickCapture = (e: MouseEvent) => {
			if (moved) {
				e.preventDefault()
				e.stopPropagation()
			}
		}

		const onResize = () => {
			if (dragging) return
			const rect = el.getBoundingClientRect()
			baseLeft = rect.left - curX
			baseTop = rect.top - curY
			width = rect.width
			height = rect.height
			targetX = curX
			targetY = curY
			clampTarget()
			ensureAnimating()
		}

		el.addEventListener('pointerdown', onPointerDown)
		el.addEventListener('click', onClickCapture, { capture: true })
		window.addEventListener('resize', onResize)

		return () => {
			el.removeEventListener('pointerdown', onPointerDown)
			el.removeEventListener('click', onClickCapture, { capture: true })
			window.removeEventListener('pointermove', onPointerMove)
			window.removeEventListener('pointerup', endDrag)
			window.removeEventListener('pointercancel', endDrag)
			window.removeEventListener('resize', onResize)
			if (raf) cancelAnimationFrame(raf)
		}
	}, [ref])
}
