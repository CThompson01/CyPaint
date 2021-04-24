import { CanvasEvent } from '../canvasEvent'
import eyedropper from '../icons/eyedropper.svg'
import { Tool } from '../tool'

export class ColorPickerTool extends Tool {
	icon = eyedropper
	name = 'EyeDropper Tool'
	id = 'tool.eyeDropper'

	onMouseDown(mousePos, ctx) {
        var p = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
        var r = p[0];
        var g = p[1];
        var b = p[2]; 
        if(r>255||g>255||b>255){
            console.log("invalid color");
        }else{
            var hex = "#" + ("000000" +  ((r << 16) | (g << 8) | b).toString(16)).slice(-6);
            //console.log(hex);
            ctx.fillStyle = hex;
        }
	}
}