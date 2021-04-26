import './CanvasPage.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ToolPanel } from './panels/ToolPanel';
import { PencilTool } from './tools/pencilTool';
import { EraserTool } from './tools/eraserTool';
import { SquareTool } from './tools/squareTool';
import { CircleTool } from './tools/circleTool';
import { TriangleTool } from './tools/triangleTool';
import { TextTool } from './tools/textTool';
import { LayerPanel } from './panels/LayerPanel';
import { Layer } from './layer';
import { UndoPanel } from './panels/UndoPanel';
import { CanvasEvent } from './canvasEvent';
import { ColorPanel } from './panels/ColorPanel';
import { SizePanel } from './panels/SizePanel';
import { PropertiesPanel } from './panels/PropertiesPanel';
import _ from 'lodash';

/**
 * An instance of each tool
 */
export const tools = [
	new PencilTool(),
	new EraserTool(),
	new SquareTool(),
	new CircleTool(),
	new TriangleTool(),
	new TextTool()
]

let CANVAS_WIDTH = 600;
let CANVAS_HEIGHT = 400;

/**
 * React Hook to provide way for Functional Component to rerender
 * @returns function that rerenders FC when called
 */
const useForceUpdate = () => {
	const [,setValue] = useState(0)
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
	const [canvasEvents, setCanvasEvents] = useState([]);
	const [undoneEvents, setUndoneEvents] = useState([]);
	const [activeLayerId, setActiveLayerId] = useState(layerList[0].id)
	const [interactionCounter, setInteractionCounter] = useState(0)
	const canvasRef = useRef();
	/** @type CanvasRenderingContext2D */
	const ctx = canvasRef.current?.getContext('2d');
	const forceUpdate = useForceUpdate()

	/** Draw all layers */
	const drawAllLayers = () => {
		const canvasMap = {};

		/**
		 * @param {number} layerId layer id
		 * @returns {HTMLCanvasElement} the canvas for this layer
		 */
		const getCanvas = layerId => canvasMap[layerId];

		// Loop through all canvas events, drawing each layer, then combining the result
		canvasEvents.forEach(thisCanvasEvent => {
			const thisLayer = layerList.find(layer => layer.id === thisCanvasEvent.layerId);
			if (!thisLayer.visible) return;

			// Get canvas for this layer
			let thisCanvas = getCanvas(thisLayer.id);
			if (!thisCanvas) {
				// Make canvas
				const newCanvas = document.createElement('canvas');
				newCanvas.width = CANVAS_WIDTH;
				newCanvas.height = CANVAS_HEIGHT;
				canvasMap[thisLayer.id] = newCanvas;
				thisCanvas = newCanvas;
			}

			// Draw this event onto canvas for this layer
			thisCanvasEvent.drawEvent(getCanvas(thisLayer.id).getContext('2d'));
		})

		// Combine the result
		const blank = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
		for (let i = layerList.length - 1; i >= 0; i--) {
			const layer = layerList[i];
			if (!layer.visible) continue;
			const thisLayerCanvas = getCanvas(layer.id);
			if (!thisLayerCanvas) continue;

			const thisLayerImageData = thisLayerCanvas.getContext('2d').getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

			for (let x = 0; x < CANVAS_WIDTH; x++) {
				for (let y = 0; y < CANVAS_HEIGHT; y++) {
					let pos = ((y * CANVAS_WIDTH) + x) * 4;
					if (thisLayerImageData.data[pos + 3] > 0) { // If not alpha
						blank.data[pos] = thisLayerImageData.data[pos++];
						blank.data[pos] = thisLayerImageData.data[pos++];
						blank.data[pos] = thisLayerImageData.data[pos++];
						blank.data[pos] = thisLayerImageData.data[pos];
					}
				}
			}
		}

		ctx.putImageData(blank, 0, 0);

		// Clear layer canvas map
		for (const [, value] of Object.entries(canvasMap)) {
			value.remove();
		}
	}

	useEffect(() => {
		if (!ctx) return;

		// Subscribe to tool's layer edit callback
		console.log(`Subscribing to tool ${currentTool.id}`)
		return currentTool.subscribeToLayerEdits(() => {
			// TODO - remove?
		}, () => {
			// Update interaction counter
			setInteractionCounter(prev => prev + 1)
		})
	}, [ctx, currentTool, activeLayerId, setInteractionCounter])

	useEffect(() => {
		if (!!ctx) {
			drawAllLayers();
		}
	}, [ctx, canvasEvents, layerList])

	function onMouseUp(e) {
		if (layerList.find(layer => layer.id === activeLayerId).locked) return;

		setMouseDown(false);
		var canvasEvent = currentTool.onMouseUp({ x: e.pageX - 200, y: e.pageY }, ctx, size);
		if (canvasEvent !== -1 && canvasEvent !== null && canvasEvent !== undefined) {
			addCanvasEvent(canvasEvent);
		}
	}

	function onMouseDown(e) {
		if (layerList.find(layer => layer.id === activeLayerId).locked) return;

		setMouseDown(true);
		var canvasEvent = currentTool.onMouseDown({ x: e.pageX - 200, y: e.pageY }, ctx, size);
		if (canvasEvent !== -1 && canvasEvent !== null && canvasEvent !== undefined) {
			addCanvasEvent(canvasEvent);
		}
	}

	function onMouseMove(e) {
		if (layerList.find(layer => layer.id === activeLayerId).locked) return;

		if (mouseDown) {
			var canvasEvent = currentTool.onMouseMove({ x: e.pageX - 200, y: e.pageY }, ctx, size);
			if (canvasEvent !== -1 && canvasEvent !== null && canvasEvent !== undefined) {
				addCanvasEvent(canvasEvent);
			}
		}
	}

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

	const layerDelete = index => {
		const layerId = layerList[index].id;

		if (layerList.length === 1) return;
	
		// Remove from layer list
		setLayerList(oldLayerList => {
			const newLayerList = [...oldLayerList];
			newLayerList.splice(index, 1);

			if (oldLayerList[index].id === activeLayerId || newLayerList.length === 1) {
				// Update selected layer
				console.log('Setting active layer to', newLayerList[0].id)
				setActiveLayerId(newLayerList[0].id)
			}

			return newLayerList;
		});

		// Remove from canvas events
		setCanvasEvents(oldEvents => oldEvents.filter(canvasEvent => canvasEvent.layerId !== layerId))

		// Remove from undo canvas events
		setUndoneEvents(oldEvents => oldEvents.filter(canvasEvent => canvasEvent.layerId !== layerId))
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

	/**
	 * Adds a canvas event to a list
	 * @param {CanvasEvent} canvasEvent the canvas event
	 */
	function addCanvasEvent(canvasEvent) {
		setCanvasEvents(oldCanvasEvents => {
			canvasEvent.updateEventId(oldCanvasEvents.length);
			canvasEvent.interactionNumber = interactionCounter;
			canvasEvent.layerId = activeLayerId;
			return [...oldCanvasEvents, canvasEvent];
		});

		setUndoneEvents([]);
	}

	function undoEvent() {
		if (canvasEvents.length <= 0) {
			return;
		}

		let undoneEvents = [];

		// Remove all events of the last interaction number
		setCanvasEvents(oldCanvasEvents => {
			const interactionToRemove = oldCanvasEvents[oldCanvasEvents.length-1].interactionNumber;
			const [newCanvasEvents, eventsToUndo] = _.partition(oldCanvasEvents, event => event.interactionNumber !== interactionToRemove)
			undoneEvents = eventsToUndo;
			return newCanvasEvents;
		});

		// Add the undone event to the list of undoneEvents
		setUndoneEvents(oldUndoneEvents => {
			const newUndoneEvents = [...oldUndoneEvents];
			return newUndoneEvents.concat(undoneEvents)
		});
	}

	function redoEvent() {
		if (undoneEvents.length <= 0) {
			return;
		}

		let redoEvents = [];

		// Remove the most recent undone event from the list of undoneEvents
		setUndoneEvents(oldUndoneEvents => {
			const interactionToRedo = oldUndoneEvents[oldUndoneEvents.length-1].interactionNumber;
			const [newUndoneEvents, eventsToRedo] = _.partition(oldUndoneEvents, event => event.interactionNumber !== interactionToRedo);
			redoEvents = eventsToRedo;
			return newUndoneEvents;
		});

		// Add the redone event to the list of canvasEvents
		setCanvasEvents(oldCanvasEvents => {
			return oldCanvasEvents.concat(redoEvents);
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
					style={{width: CANVAS_WIDTH, height: CANVAS_HEIGHT}}
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
			<div style={{display: 'flex', flexDirection: 'row'}}>
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
