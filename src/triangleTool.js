import triangle from './triangle.svg'
import { Tool } from './tool'

var markers = { clicks: -1, top: -1, startX: -1, bottom: -1, endX: -1 }

export class TriangleTool extends Tool {
	icon = triangle
	name = 'Triangle Tool'
	id = 'tool.triangle'

	onMouseDown(mousePos, ctx) {
		if (markers.clicks === -1) {
			console.log("Start markers")
			markers.top = mousePos.y
			markers.startX = mousePos.x
			markers.clicks++
		} else if (markers.clicks === 0) {
			console.log("Mid Markers")
			if (Math.abs(mousePos.y - markers.top) > Math.abs(mousePos.x - markers.startX)) {
				markers.bottom = mousePos.y
			} else {
				markers.endX = markers.startX
				markers.startX = mousePos.x
			}
			markers.clicks++;
		} else {
			console.log("End Markers")
			if (markers.endX === -1) {
				markers.endX = mousePos.x
			} else {
				markers.bottom = markers.top
				markers.top = mousePos.y
			}

			ctx.beginPath();
			ctx.moveTo(markers.startX, markers.top);
			ctx.lineTo(markers.startX, markers.bottom);
			ctx.lineTo(markers.endX, markers.bottom);
			ctx.fill();

			markers = { clicks: -1, top: -1, startX: -1, bottom: -1, endX: -1 }
		}
	}
}