import { CanvasEvent } from '../canvasEvent'
import circle from '../icons/circle.svg'
import { Tool } from '../tool'

var originPoint = [-1,-1]

export class CircleTool extends Tool {
	icon = circle
	name = 'Circle Tool'
	id = 'tool.circle'

	deactivate() {
		super.deactivate();
		originPoint = [-1,-1]
	}

	onMouseDown(mousePos, ctx) {
		if (originPoint[0] === -1) {
			originPoint = [mousePos.x, mousePos.y]
			this.beginLayerEdit();
		} else {
			const radius = Math.sqrt(Math.pow(mousePos.x - originPoint[0], 2) + Math.pow(mousePos.y - originPoint[1], 2))
			var canvasEvent = new CanvasEvent(-1, 'circle', {x: originPoint[0], y: originPoint[1], size: radius});
			originPoint = [-1,-1]
			this.endLayerEdit();
			return canvasEvent;
		}
	}
}