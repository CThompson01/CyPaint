import { CanvasEvent } from '../canvasEvent'
import square from '../icons/square.svg'
import { Tool } from '../tool'

var originPoint = [-1,-1]

export class SquareTool extends Tool {
	icon = square
	name = 'Square Tool'
	id = 'tool.square'

	deactivate() {
		super.deactivate();
		originPoint = [-1,-1];
	}

	onMouseDown(mousePos, ctx) {
		if (originPoint[0] === -1) {
			originPoint = [mousePos.x, mousePos.y];
			this.beginLayerEdit();
			return undefined;
		} else {
			
		}
	}

	onMouseMove(mousePos, ctx, size, redraw) {
		let color = ctx.fillStyle;
		redraw();
		ctx.fillStyle = color;
		ctx.fillRect(originPoint[0], originPoint[1], mousePos.x - originPoint[0], mousePos.y - originPoint[1]);
	}

	onMouseUp(mousePos, ctx) {
		var canvasEvent = new CanvasEvent(-1, 'square', ctx.fillStyle, {x: originPoint[0], y: originPoint[1], width: mousePos.x - originPoint[0], height: mousePos.y - originPoint[1]});
		originPoint = [-1,-1];
		this.endLayerEdit();
		return canvasEvent;
	}
}