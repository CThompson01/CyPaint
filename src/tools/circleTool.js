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
		originPoint = [mousePos.x, mousePos.y]
		this.beginLayerEdit();
	}

	onMouseMove(mousePos, ctx, size, redraw) {
		let color = ctx.fillStyle;
		redraw();
		ctx.fillStyle = color;
		const radius = Math.sqrt(Math.pow(mousePos.x - originPoint[0], 2) + Math.pow(mousePos.y - originPoint[1], 2));
		ctx.beginPath();
		ctx.arc(originPoint[0], originPoint[1], radius, 0, 2 * Math.PI);
		ctx.fill();
	}

	onMouseUp(mousePos, ctx) {
		const radius = Math.sqrt(Math.pow(mousePos.x - originPoint[0], 2) + Math.pow(mousePos.y - originPoint[1], 2));
		let canvasEvent = new CanvasEvent(-1, 'circle', ctx.fillStyle, {x: originPoint[0], y: originPoint[1], size: radius});
		originPoint = [-1,-1]
		this.endLayerEdit();
		return canvasEvent;
	}
}