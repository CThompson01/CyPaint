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
	 * Method fired when the mouse is released on the canvas
	 * @param {object} mousePos mouse position
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 */
	onMouseUp(mousePos, ctx) {

	}

	/**
	 * Method fired when the mouse is move while clicked down on the canvas
	 * @param {object} mousePos mouse position
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 */
	onMouseMove(mousePos, ctx) {
		
	}

	/**
	 * Method fired when the mouse is clicked down on the canvas
	 * @param {object} mousePos mouse position
	 * @param {CanvasRenderingContext2D} ctx canvas context
	 */
	onMouseDown(mousePos, ctx) {

	}
}
