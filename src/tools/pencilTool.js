import { CanvasEvent } from '../canvasEvent'
import pen from '../icons/pen.svg'
import { Tool } from '../tool'

var previousLocation = {x: -1, y: -1};

export class PencilTool extends Tool {
	icon = pen
	name = 'Pencil Tool'
	id = 'tool.pencil'

	onMouseDown(mousePos, ctx) {
		previousLocation = {x: mousePos.x, y: mousePos.y};
		this.beginLayerEdit();
	}

	onMouseMove(mousePos, ctx, size) {
		let canvasEvent = new CanvasEvent(-1, "pencil", ctx.fillStyle, 
			{startX: previousLocation.x, startY: previousLocation.y, endX: mousePos.x, endY: mousePos.y, size});
		previousLocation = {x: mousePos.x, y: mousePos.y};
		return canvasEvent;
	}

	onMouseUp(mousePos, ctx) {
		previousLocation = {x: -1, y: -1};
		this.endLayerEdit();
	}
}