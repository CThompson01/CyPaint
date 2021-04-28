export class Tool {
	/**
	 * The icon to display for this tool
	 */
	icon

	/**
	 * The name of this tool
	 */
	name

	/**
	 * Unique id of tool
	 */
	id

	/**
	 * Listener to layer modification beginning
	 */
	begin

	/**
	 * Listener to layer modification ending
	 */
	end

	/**
	 * Register functions to receive layer updates from this tool
	 * @param {function} begin callback fired when this tool begins to edit the canvas
	 * @param {function} end callback fired when this tool ends edits to the canvas
	 * @returns {function} callback to unsubscribe as a listener
	 */
	subscribeToLayerEdits(begin, end) {
		this.begin = begin
		this.end = end

		return () => {
			this.begin = undefined
			this.end = undefined
		}
	}

	/**
	 * Called when the tool begins performing a modification to the layer.
	 */
	beginLayerEdit() {
		if (this.begin) {
			this.begin();
		} else {
			console.warn('Editing layer with no `begin` listener');
		}
	}

	/**
	 * Called when the tool is done performing a modification to the layer
	 * and the edits can be flushed.
	 */
	endLayerEdit() {
		if (this.end) {
			this.end();
		} else {
			console.warn('Editing layer with no `end` listener');
		}
	}

	/**
	 * Called by canvas when this tool is being switched away from
	 */
	deactivate() {
		this.endLayerEdit();
	}

	/**
	 * Method fired when the mouse is released on the canvas
	 * @param {object} mousePos mouse position
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {number} size the size of the brush
	 */
	onMouseUp(mousePos, ctx, size) {

	}

	/**
	 * Method fired when the mouse is move while clicked down on the canvas
	 * @param {object} mousePos mouse position
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {number} size the size of the brush
	 */
	onMouseMove(mousePos, ctx, size, redraw) {
		
	}

	/**
	 * Method fired when the mouse is clicked down on the canvas
	 * @param {object} mousePos mouse position
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 * @param {number} size the size of the brush
	 * @param {{number, number}} selectedArea
	 */
	onMouseDown(mousePos, ctx, size, selectedArea) {

	}
}
