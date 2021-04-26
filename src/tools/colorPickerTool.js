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
        var a = p[3]; 
        console.log(p);
        if(r>255||g>255||b>255){
            console.log("invalid color");
        }else{
            if(r==0 && g == 0 && b == 0 & a ==0){
                //have to do this otherwise when clicking on transparent area it 
                //returns transparant black which is unhelpful to draw with so set it to white, the color of the default background
                r = g = b = a = 255;
            }
            const rgba = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
            console.log(rgba);
            ctx.fillStyle = rgba;
        }
	}
}