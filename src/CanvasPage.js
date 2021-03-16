import './CanvasPage.css';
import { useState } from 'react';
import { ToolPanel } from './ToolPanel';
import { PencilTool } from './pencilTool';

/**
 * An instance of each tool
 */
 const tools = [
	new PencilTool()
]

/**
 * Canvas Page
 */
export function CanvasPage() {
	const [currentTool, setCurrentTool] = useState(tools[0])

	return (
		<div id="canvasPageContainer">
			<ToolPanel
				currentTool={currentTool}
				toolList={tools}
				setCurrentTool={setCurrentTool} />
			<canvas id="mainCanvas" />
		</div>
	)
}