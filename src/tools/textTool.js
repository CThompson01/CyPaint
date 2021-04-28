import text from "../icons/text.svg";
import { CanvasEvent } from '../canvasEvent'
import { Tool } from "../tool";
var hasInput = false;
var font = "14px sans-serif";

export class TextTool extends Tool {
  icon = text;
  name = "Text Tool";
  id = "tool.text";

  onMouseDown(mousePos, ctx) {
    let text = prompt("Enter text: ");
    let canvasEvent = new CanvasEvent(-1, 'text', ctx.fillStyle,{font, value: text, x: mousePos.x, y: mousePos.y});
    return canvasEvent;
  }
}
