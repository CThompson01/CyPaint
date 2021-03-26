import eraser from './eraser.svg'
import { Tool } from './tool'

export class EraserTool extends Tool {
    icon = eraser
    name = 'Eraser Tool'
    id = 'tool.eraser'

    onMouseMove(mousePos, ctx) {
			ctx.clearRect(mousePos.x, mousePos.y, 1, 1)
    }
}