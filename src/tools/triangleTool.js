import triangle from '../icons/triangle.svg'
import { Tool } from '../tool'
import { CanvasEvent } from '../canvasEvent'

var markers = { clicks: -1, top: -1, startX: -1, bottom: -1, endX: -1 }

export class TriangleTool extends Tool {
	icon = triangle
	name = 'Triangle Tool'
	id = 'tool.triangle'

	deactivate() {
		super.deactivate();
		markers = { clicks: -1, top: -1, startX: -1, bottom: -1, endX: -1 }
	}

	onMouseDown(mousePos, ctx) {
		if (markers.clicks === -1) {
			markers.top = mousePos.y
			markers.startX = mousePos.x
			markers.clicks++
			this.beginLayerEdit();
			return null;
		} else if (markers.clicks === 0) {
			if (Math.abs(mousePos.y - markers.top) > Math.abs(mousePos.x - markers.startX)) {
				markers.bottom = mousePos.y
			} else {
				markers.endX = markers.startX
				markers.startX = mousePos.x
			}
			markers.clicks++;
			return null;
		} else {
			if (markers.endX === -1) {
				markers.endX = mousePos.x
			} else {
				markers.bottom = markers.top
				markers.top = mousePos.y
			}

			this.endLayerEdit();

			var canvasEvent = new CanvasEvent(-1, 'triangle', ctx.fillStyle, {top: markers.top, bottom: markers.bottom, 
				startX: markers.startX, endX: markers.endX});
			markers = { clicks: -1, top: -1, startX: -1, bottom: -1, endX: -1 };
			return canvasEvent;
		}
	}
}