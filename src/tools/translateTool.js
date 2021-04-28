import translate from '../icons/translate.png'
import { Tool } from '../tool'

var startLocation = {x: -1, y: -1};

export class TranslateTool extends Tool {
	icon = translate
	name = 'Translate Tool'
	id = 'tool.translate'

	onMouseDown(mousePos, ctx) {
		startLocation = {x: mousePos.x, y: mousePos.y};
		this.beginLayerEdit();
	}

	onMouseMove(mousePos, ctx, size, redraw) {
		redraw();
		ctx.beginPath();
		ctx.rect(startLocation.x, startLocation.y, mousePos.x - startLocation.x, mousePos.y - startLocation.y);
		ctx.stroke();
	}

	onMouseUp(mousePos, ctx) {
		startLocation = {x: -1, y: -1};
		this.endLayerEdit();
	}
}