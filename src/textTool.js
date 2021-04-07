import text from "./text.svg";
import { Tool } from "./tool";
import React from 'react'

var originPoint = [-1, -1];
var x = 0;
var count = 0;
var words = [];
const  f = function textW(e,ctx){
    ctx.font = "16px Arial"

    if(e.key == "Backspace"){
        var tmp = words.pop();
        if(originPoint[0]>ctx.measureText(tmp).width){
            originPoint[0] -= ctx.measureText(tmp).width;
            console.log( ctx.measureText(tmp).width);
        }else{
            originPoint[0] = 0;
        }
        if(count>0){
            count--;
        }
        console.log(count);
    }
    else if(e.key == "Enter"){
        originPoint[0] = x;
        originPoint[1] += 20;
    }else{
        words.push(e.key);
        ctx.fillText(e.key,originPoint[0], originPoint[1])
        originPoint[0] += ctx.measureText(e.key).width;
        console.log(e.key);
    }
  };


export class TextTool extends Tool {
  icon = text;
  name = "Text Tool";
  id = "tool.text";

  onMouseDown(mousePos, ctx) {
    originPoint = [mousePos.x, mousePos.y];
    x = originPoint[0];
    words = [];
    console.log(document.removeEventListener("keydown",(e) =>f(e,ctx),false));
    document.addEventListener("keydown",(e) =>f(e,ctx), true);
    document.removeEventListener("keydown",f, true);
    
  }
}
