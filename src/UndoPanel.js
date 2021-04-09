/**
 * @param {Layer} props.layers the layers to display
 * @param {function} props.setActiveLayer callback fired with id
 * @param {function} props.createNewLayer callback fired when a new layer is requested
 * @param {function} props.editLayerName callback fired when a layer wants a new name
 * @param {function} props.toggleLayerVisibility callback fired with layer id when visibility is toggled
 * @param {function} props.toggleLayerLocked callback fired with layer id when locked is toggled
 */
export const UndoPanel = props => (
	<div style={{ paddingLeft: 32, flexDirection: 'row' }} id='undoPanel'>
        <div style={{ paddingLeft: 16, paddingRight: 16 }}>
            <button onClick={props.undo}>Undo</button>
        </div>
		<div style={{ paddingLeft: 16, paddingRight: 16 }}>
            <button onClick={props.redo}>Redo</button>
        </div>
	</div>
)
