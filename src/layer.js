export class Layer {
	name
	visible
	id = Math.random().toString(20).substr(2, 10)

	constructor(name) {
		this.name = name
		this.visible = true
	}
}
