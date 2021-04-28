import { CanvasEvent } from '../canvasEvent';
import translate from '../icons/translate.png'
import { Tool } from '../tool'

var selArea = { startLocation: { x: -1, y: -1 }, width: -1, height: -1 };
var imgData;

export class TranslateTool extends Tool {
	icon = translate
	name = 'Translate Tool'
	id = 'tool.translate'

	onMouseDown(mousePos, ctx, size, redraw, selectedArea) {
		redraw();
		selArea = selectedArea;
		imgData = ctx.getImageData(selArea.startLocation.x, selArea.startLocation.y, selArea.width, selArea.height);
		this.beginLayerEdit();
	}

	onMouseMove(mousePos, ctx, size, redraw) {
		redraw();
		ctx.clearRect(selArea.startLocation.x, selArea.startLocation.y, selArea.width, selArea.height);
		ctx.putImageData(imgData, mousePos.x, mousePos.y);
	}

	onMouseUp(mousePos, ctx) {
		let canvasEvent = new CanvasEvent(-1, 'translate', ctx.fillStyle, {selArea, imgData, mousePos});
		this.endLayerEdit();
		return canvasEvent;
	}
}