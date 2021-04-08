/**
 * 
 * @param {Layer} props.layer the layer this row is displaying
 * @param {function} props.up callback fired when this row wants to move up
 * @param {function} props.down callback fired when this row wants to move down
 * @param {function} props.delete callback fired when this row wants to be removed
 * @param {boolean} props.selected whether this layer is the selected one
 * @param {function} props.onSelect callback fired when this row is pressed
 */
export const LayerRow = props => (
	<div
		style={{display: 'flex', flexDirection: 'row', backgroundColor: props.selected ? 'gray' : 'white'}}
		onClick={props.onSelect}>
		<p style={{flex: 1, color: 'black', fontSize: 20}}>{props.layer.name}</p>
		<button onClick={props.up}>Up</button>
		<button onClick={props.down}>Down</button>
		<button onClick={props.delete}>Del</button>
	</div>
)
