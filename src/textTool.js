import text from "./text.svg";
import { Tool } from "./tool";
var hasInput = false;
var font = "14px sans-serif";

export class TextTool extends Tool {
  icon = text;
  name = "Text Tool";
  id = "tool.text";

  onMouseDown(mousePos, ctx) {
    if (hasInput) return;
    ctx.font = font;
    var input = document.createElement("input");

    input.type = "text";
    input.style.position = "fixed";
    input.style.left = mousePos.x + 200 + "px";
    input.style.top = mousePos.y + "px";

    input.onkeydown = (e) => {
      var key = e.key;
      if (key === "Enter") {
        {
          ctx.textBaseline = "top";
          ctx.textAlign = "left";
          ctx.font = font;
          ctx.fillText(input.value, mousePos.x, mousePos.y);
        }
        document.body.removeChild(input);
        hasInput = false;
      }
    };

    document.body.appendChild(input);

    input.focus();

    hasInput = true;
  }
}
