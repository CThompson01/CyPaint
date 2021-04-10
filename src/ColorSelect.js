import './ColorSelect.css'
import {CanvasPage} from "./CanvasPage";

 export function ColorSelect() {

    //name = 'Color Select'
    //id = 'tool.Color Select'
    let [color] = "black";


    function changeColor(ctx){
        //ctx.fillStyle ="#FF0000";
    [color] = "blue";
    }


    return (
        <div>
            <table style={{border: "solid black", width: "100px", height: "50px"}}>
                <tbody>
                <tr>
                    <td id="red" style={{background: "#FF0000"}} onClick={changeColor()}></td>
                    <td id="blue" style={{background: "#0000ff"}}></td>
                    <td id="yellow" style={{background: "#ffff00"}}></td>
                    <td id="green" style={{background: "#00cc00"}}></td>
                    <td id="orange" style={{background: "#ff9900"}}></td>
                </tr>
                <tr>
                    <td id="purple" style={{background: "#990099"}}></td>
                    <td id="brown" style={{background: "#996600"}}></td>
                    <td id="white" style={{background: "#ffffff"}}></td>
                    <td id="black" style={{background: "#000000"}}></td>
                    <td id="grey" style={{background: "#999999"}}></td>
                </tr>
                </tbody>
            </table>

        </div>

    );
}