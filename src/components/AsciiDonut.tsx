import { useRef } from 'react'
import { useAsciiDonut } from '../hooks'

export function AsciiDonut() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	useAsciiDonut(canvasRef)

	return (
		<div className='ascii-donut'>
			<canvas ref={canvasRef} className='ascii-donut-canvas' />
		</div>
	)
}
