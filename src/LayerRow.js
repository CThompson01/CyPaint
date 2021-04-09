/**
 * 
 * @param {Layer} props.layer the layer this row is displaying
 * @param {function} props.up callback fired when this row wants to move up
 * @param {function} props.down callback fired when this row wants to move down
 * @param {function} props.delete callback fired when this row wants to be removed
 * @param {boolean} props.selected whether this layer is the selected one
 * @param {function} props.onSelect callback fired when this row is pressed
 * @param {function} props.editLayerName callback fired with string of new layer name
 * @param {function} props.toggleLayerVisibility callback fired when hide/show is clicked
 * @param {function} props.toggleLayerLocked callback fired when lock/unlock is clicked
 */
export const LayerRow = props => {
	const backgroundColor = props.selected ? 'gray' : 'white';
	const updateName = e => props.editLayerName(e.target.value);

	return (
		<div
			style={{display: 'flex', flexDirection: 'row', backgroundColor}}>
			<div style={{display: 'flex', flex: 1}} onClick={props.onSelect}>
				<input onChange={updateName} style={{width: 120, color: 'black', fontSize: 20, backgroundColor, border: '0px'}} type='text' value={props.layer.name} />
			</div>
			<button onClick={props.toggleLayerLocked}>{props.layer.locked ? 'Unlock' : 'Lock'}</button>
			<button onClick={props.toggleLayerVisibility}>{props.layer.visible ? 'Hide' : 'Show'}</button>
			<button onClick={props.up}>Up</button>
			<button onClick={props.down}>Down</button>
			<button onClick={props.delete}>Del</button>
		</div>
	)
}
