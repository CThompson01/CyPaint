import { ToolIcon } from './ToolIcon';
import './ToolPanel.css';

/**
 * Tool Panel
 * @param {Tool} props.currentTool Current tool
 * @param {Tool[]} props.toolList List of all tools
 * @param {function} props.setCurrentTool Set current tool
 * @returns 
 */
export function ToolPanel(props) {
	/**
	 * Callback fired when a tool is clicked
	 * @param {Tool} tool the tool that was pressed
	 */
	function onToolClick(tool) {
		props.setCurrentTool(tool);
	}

	return (
		<div id="mainToolPanel">
			{props.toolList.map(tool => <ToolIcon tool={tool} onClick={() => onToolClick(tool)} />)}
		</div>
	)
}