import pen from './pen.svg'
import { Tool } from './tool'

export class PencilTool extends Tool {
	icon = pen
	name = 'Pencil Tool'
	id = 'tool.pencil'

	onMouseMove(mousePos, ctx) {
		ctx.fillRect(mousePos.x, mousePos.y, 1, 1)
	}
}