import pen from './pen.svg'
import { Tool } from './tool'

export class BrushSize extends Tool {
    icon = pen
    name = 'Brush Size'
    id = 'tool.brushSize'



    showOptions(ctx){
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
    }
}