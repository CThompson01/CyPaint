import './CanvasPage.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ToolPanel } from './panels/ToolPanel';
import { PencilTool } from './tools/pencilTool';
import { EraserTool } from './tools/eraserTool';
import { SquareTool } from './tools/squareTool';
import { CircleTool } from './tools/circleTool';
import { TriangleTool } from './tools/triangleTool';
import { SelectTool } from './tools/selectTool';
import { TranslateTool } from './tools/translateTool';
import { TextTool } from './tools/textTool';
import { LayerPanel } from './panels/LayerPanel';
import { Layer } from './layer';
import { UndoPanel } from './panels/UndoPanel';
import { CanvasEvent } from './canvasEvent';
import { ColorPanel } from './panels/ColorPanel';
import { SizePanel } from './panels/SizePanel';
import { PropertiesPanel } from './panels/PropertiesPanel';

/**
 * An instance of each tool
 */
export const tools = [
	new PencilTool(),
	new EraserTool(),
	new SquareTool(),
	new CircleTool(),
	new TriangleTool(),
	new TextTool(),
	new SelectTool(),
	new TranslateTool()
]

let CANVAS_WIDTH = 600;
let CANVAS_HEIGHT = 400;
let CANVAS_OFFSET = 205;

/**
 * React Hook to provide way for Functional Component to rerender
 * @returns function that rerenders FC when called
 */
const useForceUpdate = () => {
	const [, setValue] = useState(0)
	return useCallback(() => setValue(value => value + 1), [])
}

/**
 * Canvas Page
 */
export function CanvasPage() {
	const [currentTool, setCurrentTool] = useState(tools[0]);
	const [mouseDown, setMouseDown] = useState(false);
	const [size, setSize] = useState(3);
	const [layerList, setLayerList] = useState([new Layer('First'), new Layer('Second')]);
	const [canvasEvents, setCanvasEvents] = useState([new CanvasEvent(0, 'square', 'black', { x: 0, y: 0, width: -10, height: -10 })]);
	const [undoneEvents, setUndoneEvents] = useState([]);
	const [activeLayerId, setActiveLayerId] = useState(layerList[0].id)
	const canvasRef = useRef();
	/** @type {CanvasRenderingContext2D} */
	const ctx = canvasRef.current?.getContext('2d');
	const forceUpdate = useForceUpdate()

	/** Draw all layers */
	const drawAllLayers = () => {
		const blank = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
		for (let i = layerList.length - 1; i >= 0; i--) {
			if (!layerList[i].visible) continue;

			// Copy data from this layer to `blank`
			for (let x = 0; x < CANVAS_WIDTH; x++) {
				for (let y = 0; y < CANVAS_HEIGHT; y++) {
					let pos = ((y * CANVAS_WIDTH) + x) * 4;
					if (layerList[i].imageData.data[pos + 3] > 0) { // If not alpha
						blank.data[pos] = layerList[i].imageData.data[pos++];
						blank.data[pos] = layerList[i].imageData.data[pos++];
						blank.data[pos] = layerList[i].imageData.data[pos++];
						blank.data[pos] = layerList[i].imageData.data[pos];
					}
				}
			}
		}

		console.log('Drawing all layers')
		ctx.putImageData(blank, 0, 0);
	}

	useEffect(() => {
		if (!ctx) return;

		const activeLayer = layerList.find(layer => layer.id === activeLayerId);

		// Subscribe to tool's layer edit callback
		console.log(`Subscribing to tool ${currentTool.id}`)
		return currentTool.subscribeToLayerEdits(() => {
			// Only show active layer
			ctx.putImageData(activeLayer.imageData, 0, 0);
		}, () => {
			// Load current ctx image data into active layer
			activeLayer.imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

			// Show all layers
			drawAllLayers();
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
		if (layerList.find(layer => layer.id === activeLayerId).locked) return;

		setMouseDown(false);
		var canvasEvent = currentTool.onMouseUp({ x: e.pageX - CANVAS_OFFSET, y: e.pageY }, ctx, size);
		if (canvasEvent !== -1 && canvasEvent !== null && canvasEvent !== undefined) {
			addCanvasEvent(canvasEvent);
		}
	}

	function onMouseDown(e) {
		if (layerList.find(layer => layer.id === activeLayerId).locked) return;

		setMouseDown(true);
		var canvasEvent = currentTool.onMouseDown({ x: e.pageX - CANVAS_OFFSET, y: e.pageY }, ctx, size);
		if (canvasEvent !== -1 && canvasEvent !== null && canvasEvent !== undefined) {
			addCanvasEvent(canvasEvent);
		}
	}

	function onMouseMove(e) {
		if (layerList.find(layer => layer.id === activeLayerId).locked) return;

		if (mouseDown) {
			var canvasEvent = currentTool.onMouseMove({ x: e.pageX - CANVAS_OFFSET, y: e.pageY }, ctx, size, redrawEvents);
			if (canvasEvent !== -1 && canvasEvent !== null && canvasEvent !== undefined) {
				addCanvasEvent(canvasEvent);
			}
		}
	}

	useEffect(() => {
		if (!ctx) return;

		// Show all layers
		drawAllLayers();
	}, [layerList])

	function layerUp(index) {
		if (index === 0) return
		setLayerList(oldLayerList => {
			const newLayerList = [...oldLayerList];

			// Swap layer[index] and layer[index-1]
			const tmp = newLayerList[index - 1];
			newLayerList[index - 1] = newLayerList[index];
			newLayerList[index] = tmp;

			return newLayerList;
		})
	}

	function layerDown(index) {
		if (index === layerList.length - 1) return
		setLayerList(oldLayerList => {
			const newLayerList = [...oldLayerList];

			// Swap layer[index] and layer[index+1]
			const tmp = newLayerList[index + 1];
			newLayerList[index + 1] = newLayerList[index];
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

			if (oldLayerList[index].id === activeLayerId || newLayerList.length === 1) {
				// Update selected layer
				console.log('Setting active layer to', newLayerList[0].id)
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

	function download() {
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
			newLayerList[newLayerList.length - 1].imageData = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);

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

	const toggleLayerVisibility = useCallback(id => {
		const l = layerList.find(layer => layer.id === id);
		l.visible = !l.visible;
		setLayerList(oldLayerList => [...oldLayerList])
	}, [layerList, setLayerList])

	const toggleLayerLocked = useCallback(id => {
		const l = layerList.find(layer => layer.id === id);
		l.locked = !l.locked;
		setLayerList(oldLayerList => [...oldLayerList])
	}, [layerList, setLayerList])

	const mergeWithLayerAbove = useCallback(id => {
		const removingIdx = layerList.findIndex(layer => layer.id === id);
		if (removingIdx === 0) return;

		// Copy data from removing layer to previous layer
		for (let x = 0; x < CANVAS_WIDTH; x++) {
			for (let y = 0; y < CANVAS_HEIGHT; y++) {
				let pos = ((y * CANVAS_WIDTH) + x) * 4;
				if (layerList[removingIdx].imageData.data[pos + 3] > 0) { // If not alpha
					layerList[removingIdx - 1].imageData.data[pos] = layerList[removingIdx].imageData.data[pos++];
					layerList[removingIdx - 1].imageData.data[pos] = layerList[removingIdx].imageData.data[pos++];
					layerList[removingIdx - 1].imageData.data[pos] = layerList[removingIdx].imageData.data[pos++];
					layerList[removingIdx - 1].imageData.data[pos] = layerList[removingIdx].imageData.data[pos];
				}
			}
		}

		layerDelete(removingIdx)
	}, [layerList, setLayerList])

	useEffect(() => {
		if (ctx !== undefined) {
			ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			canvasEvents.forEach(cEvent => cEvent.drawEvent(ctx));
		}
	}, [ctx, canvasEvents])

	function redrawEvents() {
		if (ctx !== undefined) {
			ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			canvasEvents.forEach(cEvent => cEvent.drawEvent(ctx));
		}
	}

	function addCanvasEvent(canvasEvent) {
		setCanvasEvents(oldCanvasEvents => {
			const newCanvasEvents = [...oldCanvasEvents];
			canvasEvent.updateEventId(oldCanvasEvents.length);
			newCanvasEvents.push(canvasEvent);
			return newCanvasEvents;
		});

		setUndoneEvents(oldUndoneEvents => { return [] });
	}

	function undoEvent() {
		if (canvasEvents.length <= 0) {
			return;
		}

		var undoneEvent;

		// Remove the most recent event from the list of canvasEvents
		setCanvasEvents(oldCanvasEvents => {
			const newCanvasEvents = [...oldCanvasEvents];
			undoneEvent = newCanvasEvents.pop();
			return newCanvasEvents;
		});

		// Add the undone event to the list of undoneEvents
		setUndoneEvents(oldUndoneEvents => {
			const newUndoneEvents = [...oldUndoneEvents];
			newUndoneEvents.push(undoneEvent);
			return newUndoneEvents;
		});
	}

	function redoEvent() {
		if (undoneEvents.length <= 0) {
			return;
		}

		var redoEvent;

		// Remove the most recent undone event from the list of undoneEvents
		setUndoneEvents(oldUndoneEvents => {
			const newUndoneEvents = [...oldUndoneEvents];
			redoEvent = newUndoneEvents.pop();
			return newUndoneEvents;
		});

		// Add the redone event to the list of canvasEvents
		setCanvasEvents(oldCanvasEvents => {
			const newCanvasEvents = [...oldCanvasEvents];
			newCanvasEvents.push(redoEvent);
			return newCanvasEvents;
		});
	}

	/**
	 * Resize a layer
	 * @param {Layer} layer the layer to resize
	 */
	const resizeLayer = layer => {
		const newImageData = new ImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
		let newDataIdx = 0;
		for (let y = 0; y < CANVAS_HEIGHT; y++) {
			for (let x = 0; x < CANVAS_WIDTH; x++) {
				if (y >= layer.imageData.height || x >= layer.imageData.width) {
					// New
					newImageData.data[newDataIdx++] = 0;
					newImageData.data[newDataIdx++] = 0;
					newImageData.data[newDataIdx++] = 0;
					newImageData.data[newDataIdx++] = 0;
				} else {
					// Copy
					let oldDataIdx = ((y * layer.imageData.width) + x) * 4;
					newImageData.data[newDataIdx++] = layer.imageData.data[oldDataIdx++];
					newImageData.data[newDataIdx++] = layer.imageData.data[oldDataIdx++];
					newImageData.data[newDataIdx++] = layer.imageData.data[oldDataIdx++];
					newImageData.data[newDataIdx++] = layer.imageData.data[oldDataIdx];
				}
			}
		}

		layer.imageData = newImageData;
	}

	const updateWidthHeight = useCallback((width, height) => {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		CANVAS_WIDTH = width;
		CANVAS_HEIGHT = height;

		setLayerList(oldLayerList => {
			oldLayerList.forEach(resizeLayer)
			return [...oldLayerList]
		})

		console.log(`Canvas resized to ${CANVAS_WIDTH}x${CANVAS_HEIGHT}`)
		forceUpdate()
	}, [ctx, forceUpdate])

	return (
		<div>
			<div id="canvasPageContainer">
				<ToolPanel
					currentTool={currentTool}
					toolList={tools}
					setCurrentTool={updateCurrentTool} />

				<canvas
					id="mainCanvas"
					ref={canvasRef}
					style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
					width={CANVAS_WIDTH}
					height={CANVAS_HEIGHT}
					onMouseUp={onMouseUp}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove} />

				<div>
					<input
						type="file"
						id="file"
						accept="image/*"
						onChange={handleImage}
					></input>
					<button onClick={download}>Download</button>
					<UndoPanel
						undo={undoEvent}
						redo={redoEvent}
						canvasEventsList={`canvasEvents`} />
				</div>
			</div>
			<ColorPanel setColor={(color) => { ctx.fillStyle = color }} />
			<SizePanel setSize={setSize} />
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<LayerPanel
					layers={layerList}
					selected={activeLayerId}
					setActiveLayer={setActiveLayerId}
					createNewLayer={createNewLayer}
					editLayerName={editLayerName}
					toggleLayerVisibility={toggleLayerVisibility}
					toggleLayerLocked={toggleLayerLocked}
					merge={mergeWithLayerAbove}
					up={layerUp}
					down={layerDown}
					delete={layerDelete} />
				<PropertiesPanel
					width={CANVAS_WIDTH}
					height={CANVAS_HEIGHT}
					setDimensions={updateWidthHeight} />
			</div>
		</div>
	);
}
