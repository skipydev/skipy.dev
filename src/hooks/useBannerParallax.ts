import { useEffect, type RefObject } from 'react'

export function useBannerParallax(bannerRef: RefObject<HTMLDivElement | null>) {
	useEffect(() => {
		const el = bannerRef.current
		if (!el) return
		const prefersReduced = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches
		if (prefersReduced) return

		let raf = 0
		const update = () => {
			const offset = window.scrollY * 0.35
			el.style.transform = `translateY(${offset}px)`
			raf = 0
		}
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(update)
		}
		update()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', onScroll)
			if (raf) cancelAnimationFrame(raf)
		}
	}, [bannerRef])
}
