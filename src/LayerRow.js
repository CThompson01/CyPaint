/**
 * 
 * @param {Layer} props.layer the layer this row is displaying
 * @param {function} props.toggleVisbility callback fired when this row wants to toggle visibility
 * @param {function} props.up callback fired when this row wants to move up
 * @param {function} props.down callback fired when this row wants to move down
 * @param {function} props.delete callback fired when this row wants to be removed
 */
export const LayerRow = props => (
	<div style={{display: 'flex', flexDirection: 'row'}}>
		<p style={{flex: 1, color: 'black', fontSize: 20}}>{props.layer.name}</p>
		<button onClick={props.toggleVisbility}>Vis</button>
		<button onClick={props.up}>Up</button>
		<button onClick={props.down}>Down</button>
		<button onClick={props.delete}>Del</button>
	</div>
)
