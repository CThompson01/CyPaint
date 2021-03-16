import './CanvasPage.css';
import { ToolPanel } from './ToolPanel'

/**
 * Canvas Page
 */
export function CanvasPage() {
	return (
		<div id="canvasPageContainer">
			<ToolPanel />
			<canvas id="mainCanvas" />
		</div>
	)
}