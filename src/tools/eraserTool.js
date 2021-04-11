import { CanvasEvent } from '../canvasEvent'
import eraser from '../icons/eraser.svg'
import { Tool } from '../tool'

export class EraserTool extends Tool {
	icon = eraser
	name = 'Eraser Tool'
	id = 'tool.eraser'

	onMouseDown(mousePos, ctx) {
		this.beginLayerEdit();
	}

	onMouseMove(mousePos, ctx, size) {
		return new CanvasEvent(-1, 'eraser', ctx.fillStyle, {x: mousePos.x, y: mousePos.y, size});
	}

	onMouseUp(mousePos, ctx) {
		this.endLayerEdit();
	}
}