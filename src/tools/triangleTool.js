import triangle from '../icons/triangle.svg'
import { Tool } from '../tool'
import { CanvasEvent } from '../canvasEvent'

var markers = { top: -1, startX: -1 }

export class TriangleTool extends Tool {
	icon = triangle
	name = 'Triangle Tool'
	id = 'tool.triangle'

	deactivate() {
		super.deactivate();
		markers = { clicks: -1, top: -1, startX: -1, bottom: -1, endX: -1 }
	}

	onMouseDown(mousePos, ctx) {
		markers.top = mousePos.y
		markers.startX = mousePos.x
		this.beginLayerEdit();
	}

	onMouseMove(mousePos, ctx, size, redraw) {
		let color = ctx.fillStyle;
		redraw();
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(markers.startX, markers.top);
		ctx.lineTo(markers.startX, mousePos.y);
		ctx.lineTo(mousePos.x, mousePos.y);
		ctx.fill();
	}

	onMouseUp(mousePos, ctx) {
		let canvasEvent = new CanvasEvent(-1, 'triangle', ctx.fillStyle, {top: markers.top, bottom: mousePos.y,
			startX: markers.startX, endX: mousePos.x});
		markers = {top: -1, startX: -1};
		this.endLayerEdit();
		return canvasEvent;
	}
}