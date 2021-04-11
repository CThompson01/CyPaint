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

	onMouseMove(mousePos, ctx) {
		return new CanvasEvent(-1, 'eraser', {x: mousePos.x, y: mousePos.y, size: 1});
	}

	onMouseUp(mousePos, ctx) {
		this.endLayerEdit();
	}
}