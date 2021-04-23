import select from '../icons/select.png'
import { Tool } from '../tool'

var startLocation = {x: -1, y: -1};

export class SelectTool extends Tool {
	icon = select
	name = 'Select Tool'
	id = 'tool.select'

	onMouseDown(mousePos, ctx) {
		startLocation = {x: mousePos.x, y: mousePos.y};
		this.beginLayerEdit();
	}

	onMouseMove(mousePos, ctx, size, redraw) {
		// let canvasEvent = new CanvasEvent(-1, "pencil", ctx.fillStyle, 
		// 	{startX: previousLocation.x, startY: previousLocation.y, endX: mousePos.x, endY: mousePos.y, size});
		// previousLocation = {x: mousePos.x, y: mousePos.y};
		// return canvasEvent;
		redraw();
		ctx.beginPath();
		ctx.rect(startLocation.x, startLocation.y, mousePos.x - startLocation.x, mousePos.y - startLocation.y);
		ctx.stroke();
	}

	onMouseUp(mousePos, ctx) {
		startLocation = {x: -1, y: -1};
		this.endLayerEdit();
	}
}