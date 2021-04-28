import { CanvasEvent } from '../canvasEvent'
import select from '../icons/select.png'
import { Tool } from '../tool'

var startLocation = { x: -1, y: -1 };

export class SelectTool extends Tool {
	icon = select
	name = 'Select Tool'
	id = 'tool.select'

	onMouseDown(mousePos, ctx) {
		startLocation = { x: mousePos.x, y: mousePos.y };
		this.beginLayerEdit();
	}

	onMouseMove(mousePos, ctx, size, redraw) {
		redraw();
		ctx.strokeStyle = 'black';
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.rect(startLocation.x, startLocation.y, mousePos.x - startLocation.x, mousePos.y - startLocation.y);
		ctx.stroke();
		ctx.lineWidth = size;

	}

	onMouseUp(mousePos, ctx) {
		let event = new CanvasEvent(-1, 'select', ctx.fillStyle, 
			{ startLocation, width: mousePos.x - startLocation.x, height: mousePos.y - startLocation.y });
		startLocation = { x: -1, y: -1 };
		this.endLayerEdit();
		return event;
	}
}