import { CanvasEvent } from '../canvasEvent'
import pen from '../icons/pen.svg'
import { Tool } from '../tool'

export class PencilTool extends Tool {
	icon = pen
	name = 'Pencil Tool'
	id = 'tool.pencil'

	onMouseDown(mousePos, ctx) {
		this.beginLayerEdit();
	}

	onMouseMove(mousePos, ctx) {
		return new CanvasEvent(-1, "pencil", ctx.fillStyle, {x: mousePos.x, y: mousePos.y, size: 1});
	}

	onMouseUp(mousePos, ctx) {
		this.endLayerEdit();
	}
}