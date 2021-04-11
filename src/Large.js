import LrgDot from './LrgDot.png'
import { Tool } from './tool'
import {CanvasEvent} from "./canvasEvent";

export class Large extends Tool {
    icon = LrgDot
    name = 'large'
    id = 'tool.large'

    onMouseDown(mousePos, ctx) {
        this.beginLayerEdit();
    }

    onMouseMove(mousePos, ctx) {
        return new CanvasEvent(-1, "large", {x: mousePos.x, y: mousePos.y, size: 15});
    }

    onMouseUp(mousePos, ctx) {
        this.endLayerEdit();
    }
}