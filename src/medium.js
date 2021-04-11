import mdDot from './mdDot.png'
import { Tool } from './tool'
import {CanvasEvent} from "./canvasEvent";

export class Medium extends Tool {
    icon = mdDot
    name = 'medium'
    id = 'tool.small'

    onMouseDown(mousePos, ctx) {
        this.beginLayerEdit();
    }

    onMouseMove(mousePos, ctx) {
        return new CanvasEvent(-1, "medium", ctx.fillStyle, {x: mousePos.x, y: mousePos.y, size: 9});
    }

    onMouseUp(mousePos, ctx) {
        this.endLayerEdit();
    }

}