export class Layer {
	name
	visible

	/** Unique identifier of this layer */
	id
	imageData

	constructor(name) {
		this.name = name
		this.visible = true
		this.id = Math.random().toString(20).substr(2, 10)
	}
}
