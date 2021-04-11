import './ColorSelect.css'
import React from "react";

 export function ColorSelect(props){

        return (
            <div>
                <table style={{border: "solid black", width: "100px", height: "50px"}}>
                    <tbody>
                    <tr>
                        <td id="red" style={{background: "#FF0000"}} onClick={() => props.setColor("#FF0000")}></td>
                        <td id="blue" style={{background: "#0000ff"}} onClick={() => props.setColor("#0000ff")}></td>
                        <td id="yellow" style={{background: "#ffff00"}} onClick={() => props.setColor("#ffff00")}></td>
                        <td id="green" style={{background: "#00cc00"}} onClick={() => props.setColor("#00cc00")}></td>
                        <td id="orange" style={{background: "#ff9900"}} onClick={() => props.setColor("#FF9900")}></td>
                    </tr>
                    <tr>
                        <td id="purple" style={{background: "#990099"}} onClick={() => props.setColor("#990099")}></td>
                        <td id="brown" style={{background: "#996600"}} onClick={() => props.setColor("#996600")}></td>
                        <td id="white" style={{background: "#ffffff"}} onClick={() => props.setColor("#ffffff")}></td>
                        <td id="black" style={{background: "#000000"}} onClick={() => props.setColor("#000000")}></td>
                        <td id="grey" style={{background: "#999999"}} onClick={() => props.setColor("#999999")}></td>
                    </tr>
                    </tbody>
                </table>
            </div>

        );
}