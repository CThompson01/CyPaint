import square from './square.svg'
import { Tool } from './tool'

var originPoint = [-1,-1]

export class SquareTool extends Tool {
	icon = square
	name = 'Square Tool'
	id = 'tool.square'

    onMouseDown(mousePos, ctx) {
        if (originPoint[0] === -1) {
            originPoint = [mousePos.x, mousePos.y]
        } else {
            ctx.fillRect(originPoint[0], originPoint[1], mousePos.x - originPoint[0], mousePos.y - originPoint[1])
            originPoint = [-1,-1]
        }
    }
}