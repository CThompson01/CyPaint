import circle from './circle.svg'
import { Tool } from './tool'

var originPoint = [-1,-1]

export class CircleTool extends Tool {
	icon = circle
	name = 'Circle Tool'
	id = 'tool.circle'

    onMouseDown(mousePos, ctx) {
        if (originPoint[0] === -1) {
            originPoint = [mousePos.x, mousePos.y]
        } else {
            let radius = Math.sqrt(Math.pow(mousePos.x - originPoint[0], 2) + Math.pow(mousePos.y - originPoint[1], 2))
            ctx.beginPath()
            ctx.arc(originPoint[0], originPoint[1], radius, 0, 2*Math.PI)
            ctx.fill()
            originPoint = [-1,-1]
        }
    }
}