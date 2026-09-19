import type { RefObject } from 'react'
import { PauseIcon, PlayIcon } from './icons'

type VinylPlayerProps = {
	wrapRef: RefObject<HTMLDivElement | null>
	audioRef: RefObject<HTMLAudioElement | null>
	isPlaying: boolean
	onToggle: () => void
}

export function VinylPlayer({
	wrapRef,
	audioRef,
	isPlaying,
	onToggle,
}: VinylPlayerProps) {
	return (
		<div className='vinyl-wrap' ref={wrapRef}>
			<audio
				ref={audioRef}
				src={`${import.meta.env.BASE_URL}Hugo TSR - Fenêtre Sur Rue.mp3`}
				loop
				onError={() => {}}
			/>
			<button
				className={`vinyl-disc ${isPlaying ? 'is-playing' : ''}`}
				onClick={onToggle}
				aria-label={isPlaying ? 'Pause' : 'Play'}
			>
				<span className='vinyl-label'>
					{isPlaying ? <PauseIcon /> : <PlayIcon />}
				</span>
			</button>
			<div className='vinyl-meta'>
				<strong>now spinning</strong>
				{isPlaying ? (
					<span className='vinyl-bars'>
						<span />
						<span />
						<span />
						<span />
					</span>
				) : (
					<span>tap the record</span>
				)}
			</div>
		</div>
	)
}
