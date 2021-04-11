import smDot from './smDot.png'
import { Tool } from './tool'
import {CanvasEvent} from "./canvasEvent";

export class Small extends Tool {
    icon = smDot
    name = 'small'
    id = 'tool.small'

    onMouseDown(mousePos, ctx) {
        this.beginLayerEdit();
    }

    onMouseMove(mousePos, ctx) {
        return new CanvasEvent(-1, "small", {x: mousePos.x, y: mousePos.y, size: 3});
    }

    onMouseUp(mousePos, ctx) {
        this.endLayerEdit();
    }

    /**showOptions(ctx){
        function setSmall(ctx){
        ctx.lineWidth = 5;
    }
        function setMedium(ctx){
            ctx.lineWidth = 25;
        }
        function setLarge(ctx){
            ctx.lineWidth = 50;
        }
        return(
            <div>
                <table style={{border: "solid black", width: "100px", height: "100px"}}>
                    <tbody>
                    <tr>
                        <td id="small" style={{background: "#FF0000"}} onClick={setSmall()}></td>
                        <td id="medium" style={{background: "#0000ff"}} onClick={setMedium()}></td>
                        <td id="large" style={{background: "#ffff00"}}onClick={setLarge()}></td>

                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }*/
}