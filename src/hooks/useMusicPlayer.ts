import { useRef, useState } from 'react'

export function useMusicPlayer() {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [hasError, setHasError] = useState(false)

	const toggle = () => {
		const audio = audioRef.current
		if (!audio) return
		if (isPlaying) {
			audio.pause()
			setIsPlaying(false)
		} else {
			audio
				.play()
				.then(() => setIsPlaying(true))
				.catch(() => setHasError(true))
		}
	}

	return { audioRef, isPlaying, hasError, toggle }
}
