import { CanvasEvent } from '../canvasEvent';
import translate from '../icons/translate.png'
import { Tool } from '../tool'

// var startLocation = {x: -1, y: -1};
var selArea = { startLocation: { x: -1, y: -1 }, endLocation: { x: -1, y: -1 } };
var imgData;

export class TranslateTool extends Tool {
	icon = translate
	name = 'Translate Tool'
	id = 'tool.translate'

	onMouseDown(mousePos, ctx, size, redraw, selectedArea) {
		// startLocation = {x: mousePos.x, y: mousePos.y};
		redraw();
		selArea = selectedArea;
		imgData = ctx.getImageData(selArea.startLocation.x, selArea.startLocation.y, selArea.endLocation.x, selArea.endLocation.y);
		this.beginLayerEdit();
	}

	onMouseMove(mousePos, ctx, size, redraw) {
		redraw();
		ctx.clearRect(selArea.startLocation.x, selArea.startLocation.y, selArea.endLocation.x, selArea.endLocation.y);
		ctx.putImageData(imgData, mousePos.x, mousePos.y);
	}

	onMouseUp(mousePos, ctx) {
		let canvasEvent = new CanvasEvent(-1, 'translate', ctx.fillStyle, {selArea, imgData, mousePos});
		this.endLayerEdit();
		return canvasEvent;
	}
}