export class CanvasEvent {
	/** The point at which the event occurred */
	eventId

	/** The type of event that is occurring (e.g. drawTriangle, drawLine, eraser) */
	eventType

	/** The color that the event should be */
	color

    /** The data containing where an event happened and the size of the event */
    positionData
		
		/**
		 * @type number
		 * Which interaction this event is a part of
		 */
		interactionNumber

		/**
		 * @type string
		 * The ID of the layer this modification was applied on
		 */
		layerId

	constructor(id, type, color, posData) {
		this.eventId = id;
		this.eventType = type;
		this.color = color;
		this.positionData = posData;
	}

	updateEventId(id) {
		this.eventId = id;
	}

	drawEvent(ctx) {
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		switch (this.eventType) {
			case 'pencil':
				ctx.lineWidth = this.positionData.size;
				ctx.strokeStyle = ctx.fillStyle;
				ctx.beginPath();
				ctx.moveTo(this.positionData.startX, this.positionData.startY);
				ctx.lineTo(this.positionData.endX, this.positionData.endY);
				ctx.stroke();
				break;
			case 'eraser':
				ctx.clearRect(this.positionData.x, this.positionData.y, this.positionData.size, this.positionData.size);
				break;
			case 'square':
				ctx.fillRect(this.positionData.x, this.positionData.y, this.positionData.width, this.positionData.height);
				break;
			case 'circle':
				ctx.beginPath();
				ctx.arc(this.positionData.x, this.positionData.y, this.positionData.size, 0, 2 * Math.PI);
				ctx.fill();
				break;
			case 'triangle':
				ctx.beginPath();
				ctx.moveTo(this.positionData.startX, this.positionData.top);
				ctx.lineTo(this.positionData.startX, this.positionData.bottom);
				ctx.lineTo(this.positionData.endX, this.positionData.bottom);
				ctx.fill();
				break;
			case 'translate':
				ctx.clearRect(this.positionData.selArea.startLocation.x, this.positionData.selArea.startLocation.y, 
					this.positionData.selArea.width, this.positionData.selArea.height);
				ctx.putImageData(this.positionData.imgData, this.positionData.mousePos.x, this.positionData.mousePos.y);
				break;
			case 'text':
				ctx.textBaseline = "top";
				ctx.textAlign = "left";
				ctx.font = this.positionData.font;
				ctx.fillText(this.positionData.value, this.positionData.x, this.positionData.y);
				break;
		}
	}
}
