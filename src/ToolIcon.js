import './ToolIcon.css';

/**
 * Tool Icon
 * @param {Tool} props.tool the tool this icon uses
 * @param {function} props.onClick callback fired when this tool is clicked
 */
export function ToolIcon(props) {
	return (
		<div className="ToolIcon" onClick={props.onClick}>
			<img src={props.tool.icon} width="20" height="20" />
		</div>
	)
}