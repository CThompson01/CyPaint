export class CanvasEvent {
    /** The point at which the event occurred */
	eventId

    /** The type of event that is occurring (e.g. drawTriangle, drawLine, eraser) */
    eventType

    positionData

	constructor(id, type, posData) {
		this.eventId = id;
        this.eventType = type;
        this.positionData = posData;
	}

    updateEventId(id) {
        this.eventId = id;
    }

    drawEvent(ctx) {
        switch (this.eventType) {
            case 'pencil':
                ctx.fillRect(this.positionData.x, this.positionData.y, this.positionData.size, this.positionData.size);
                break;
            case 'eraser':
                ctx.clearRect(this.positionData.x, this.positionData.y, this.positionData.size, this.positionData.size);
                break;
            case 'square':
                ctx.fillRect(this.positionData.x, this.positionData.y, this.positionData.width, this.positionData.height);
                break;
            case 'circle':
                ctx.beginPath();
			    ctx.arc(this.positionData.x, this.positionData.y, this.positionData.size, 0, 2*Math.PI);
			    ctx.fill();
                break;
            case 'triangle':
                ctx.beginPath();
			    ctx.moveTo(this.positionData.startX, this.positionData.top);
			    ctx.lineTo(this.positionData.startX, this.positionData.bottom);
			    ctx.lineTo(this.positionData.endX, this.positionData.bottom);
			    ctx.fill();
                break;
        }
    }
}
