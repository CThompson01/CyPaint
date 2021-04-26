export class Layer {
	/**
	 * @type {string}
	 */
	name
	visible

	/** Whether this layer can be modified */
	locked

	/** Unique identifier of this layer */
	id

	/**
	 * Constructs a new Layer.
	 * @param {string} name the display name of this layer
	 */
	constructor(name) {
		this.name = name;
		this.visible = true;
		this.locked = false;
		this.id = Math.random().toString(20).substr(2, 10);
	}
}
