import './CanvasPage.css';
import { useEffect, useRef, useState } from 'react';
import { ToolPanel } from './ToolPanel';
import { PencilTool } from './pencilTool';
import { EraserTool } from './eraserTool';
import { SquareTool } from './squareTool';
import { CircleTool } from './circleTool';
import { TriangleTool } from './triangleTool';
import { LayerPanel } from './LayerPanel';

/**
 * An instance of each tool
 */
export const tools = [
	new PencilTool(),
	new EraserTool(),
	new SquareTool(),
	new CircleTool(),
	new TriangleTool()
]

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

/**
 * Canvas Page
 */
export function CanvasPage() {
  const [currentTool, setCurrentTool] = useState(tools[0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [color] = useState("black");
  const canvasRef = useRef();
  const ctx = canvasRef.current?.getContext("2d");

	useEffect(() => {
		if (!!ctx) {
			ctx.fillStyle = color;
		}
	}, [ctx, color]);

  function onMouseUp(e) {
    setMouseDown(false);
    currentTool.onMouseUp({ x: e.pageX - 200, y: e.pageY }, ctx);
  }

  function onMouseDown(e) {
    setMouseDown(true);
    currentTool.onMouseDown({ x: e.pageX - 200, y: e.pageY }, ctx);
  }

  function onMouseMove(e) {
    if (mouseDown) {
      currentTool.onMouseMove({ x: e.pageX - 200, y: e.pageY }, ctx);
    }
  }
  function handleImage(e) {
    var img = new Image();
    img.onload = draw;
    img.src = URL.createObjectURL(e.target.files[0]);
  }
  function draw() {
    var ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(this, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  function download(){
	var canvas = document.getElementById('mainCanvas');
	const image = canvas.toDataURL();
	const link = document.createElement('a');
	link.href = image;
	link.download = 'image.png';
	link.click();
  }


  return (
		<div>
			<div id="canvasPageContainer">
				<ToolPanel
					currentTool={currentTool}
					toolList={tools}
					setCurrentTool={setCurrentTool}
				/>
				<canvas
					id="mainCanvas"
					ref={canvasRef}
					width={CANVAS_WIDTH}
					height={CANVAS_HEIGHT}
					onMouseUp={onMouseUp}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
				/>
				<div>
					<input
						type="file"
						id="file"
						accept="image/*"
						onChange={handleImage}
					></input>
			<button onClick = {download}>Download</button>
				</div>
			</div>
			<LayerPanel />
		</div>
  );
}
