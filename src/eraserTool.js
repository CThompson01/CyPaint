import eraser from './eraser.svg'
import { Tool } from './tool'

export class EraserTool extends Tool {
	icon = eraser
	name = 'Eraser Tool'
	id = 'tool.eraser'

	onMouseDown(mousePos, ctx) {
		this.beginLayerEdit();
	}

	onMouseMove(mousePos, ctx) {
		ctx.clearRect(mousePos.x, mousePos.y, 1, 1)
	}

	onMouseUp(mousePos, ctx) {
		this.endLayerEdit();
	}
}