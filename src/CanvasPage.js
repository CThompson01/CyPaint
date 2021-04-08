import './CanvasPage.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ToolPanel } from './ToolPanel';
import { PencilTool } from './pencilTool';
import { EraserTool } from './eraserTool';
import { SquareTool } from './squareTool';
import { CircleTool } from './circleTool';
import { TriangleTool } from './triangleTool';
import { LayerPanel } from './LayerPanel';
import { Layer } from './layer';

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
	const [layerList, setLayerList] = useState([new Layer('First'), new Layer('Second')]);
	const [activeLayerId, setActiveLayerId] = useState(layerList[0].id)
  const canvasRef = useRef();
  const ctx = canvasRef.current?.getContext("2d");

	useEffect(() => {
		if (!!ctx) {
			ctx.fillStyle = color;
		}
	}, [ctx, color]);

	useEffect(() => {
		if (!ctx) return;

		const activeLayer = layerList.find(layer => layer.id === activeLayerId);

		// Subscribe to tool's layer edit callback
		return currentTool.subscribeToLayerEdits(() => {
			// Only show active layer
			ctx.putImageData(activeLayer.imageData, 0, 0);
		}, () => {
			// Load current ctx image data into active layer
			activeLayer.imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

			// Show all layers
			const blank = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
			for (let i = layerList.length-1; i >= 0; i--) {
				// Copy data from this layer to `blank`
				for (let x = 0; x < CANVAS_WIDTH; x++) {
					for (let y = 0; y < CANVAS_HEIGHT; y++) {
						let pos = ((y * CANVAS_WIDTH) + x) * 4;
						if (layerList[i].imageData.data[pos+3] > 0) { // If not alpha
							blank.data[pos] = layerList[i].imageData.data[pos++];
							blank.data[pos] = layerList[i].imageData.data[pos++];
							blank.data[pos] = layerList[i].imageData.data[pos++];
							blank.data[pos] = layerList[i].imageData.data[pos];
						}
					}
				}
			}

			ctx.putImageData(blank, 0, 0);
		})
	}, [ctx, currentTool, activeLayerId])

	useEffect(() => {
		if (!!ctx) {
			// Context loaded for first time. Load empty image data into all layers
			ctx.putImageData(ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT), 0, 0);
			layerList.forEach(layer => layer.imageData = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT));
		}
	}, [ctx])

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

	useEffect(() => {
		if (!ctx) return;

		// Show all layers
		const blank = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
		for (let i = layerList.length-1; i >= 0; i--) {
			// Copy data from this layer to `blank`
			for (let x = 0; x < CANVAS_WIDTH; x++) {
				for (let y = 0; y < CANVAS_HEIGHT; y++) {
					let pos = ((y * CANVAS_WIDTH) + x) * 4;
					if (layerList[i].imageData.data[pos+3] > 0) { // If not alpha
						blank.data[pos] = layerList[i].imageData.data[pos++];
						blank.data[pos] = layerList[i].imageData.data[pos++];
						blank.data[pos] = layerList[i].imageData.data[pos++];
						blank.data[pos] = layerList[i].imageData.data[pos];
					}
				}
			}
		}

		ctx.putImageData(blank, 0, 0);
	}, [layerList])

	function layerUp(index) {
		if (index === 0) return
		setLayerList(oldLayerList => {
			const newLayerList = [...oldLayerList];

			// Swap layer[index] and layer[index-1]
			const tmp = newLayerList[index-1];
			newLayerList[index-1] = newLayerList[index];
			newLayerList[index] = tmp;

			return newLayerList;
		})
	}

	function layerDown(index) {
		if (index === layerList.length - 1) return
		setLayerList(oldLayerList => {
			const newLayerList = [...oldLayerList];

			// Swap layer[index] and layer[index+1]
			const tmp = newLayerList[index+1];
			newLayerList[index+1] = newLayerList[index];
			newLayerList[index] = tmp;

			return newLayerList;
		})
	}

	function layerDelete(index) {
		setLayerList(oldLayerList => {
			const newLayerList = [...oldLayerList];

			if (oldLayerList.length === 1) {
				return oldLayerList;
			}

			newLayerList.splice(index, 1);
			if (oldLayerList[index].id === activeLayerId) {
				// Update selected layer
				setActiveLayerId(newLayerList[0].id)
			}

			return newLayerList;
		})
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

	const updateCurrentTool = useCallback(tool => {
		setCurrentTool(oldTool => {
			// Clear old tool
			oldTool.deactivate();

			return tool;
		});
	}, [setCurrentTool])

	const createNewLayer = useCallback(() => {
		setLayerList(oldLayerList => {
			if (!ctx) {
				alert('Please draw on canvas at least once before creating a new layer');
				return oldLayerList;
			}

			const newLayerList = [...oldLayerList];
			newLayerList.push(new Layer(`${Math.floor(Math.random() * 100000)}`));
			newLayerList[newLayerList.length-1].imageData = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);

			return newLayerList;
		})
	}, [ctx, setLayerList])

	const editLayerName = useCallback(newName => {
		setLayerList(oldLayerList => {
			const newLayerList = [...oldLayerList];

			newLayerList.forEach(layer => {
				if (layer.id === activeLayerId) {
					layer.name = newName;
				}
			})

			return newLayerList;
		})
	}, [activeLayerId])

  return (
		<div>
			<div id="canvasPageContainer">
				<ToolPanel
					currentTool={currentTool}
					toolList={tools}
					setCurrentTool={updateCurrentTool}
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
			<LayerPanel
				layers={layerList}
				selected={activeLayerId}
				setActiveLayer={setActiveLayerId}
				createNewLayer={createNewLayer}
				editLayerName={editLayerName}
				up={layerUp}
				down={layerDown}
				delete={layerDelete} />
		</div>
  );
}
