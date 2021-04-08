import './LayerPanel.css'
import { LayerRow } from './LayerRow'

/**
 * @param {Layer} props.layers the layers to display
 * @param {function} props.setActiveLayer callback fired with id
 * @param {function} props.createNewLayer callback fired when a new layer is requested
 */
export const LayerPanel = props => {
	return (
		<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} id='mainLayerPanel'>
			<div style={{height: 340, overflow: 'scroll'}}>
				{props.layers.map((layer, index) => (
					<LayerRow
						layer={layer}
						key={String(index)}
						selected={props.selected === layer.id}
						onSelect={() => props.setActiveLayer(layer.id)}
						up={() => props.up(index)}
						down={() => props.down(index)}
						delete={() => props.delete(index)} />
				))}
			</div>
			<div style={{border: '1px solid black'}}>
				<button onClick={props.createNewLayer}>Add</button>
			</div>
		</div>
	);
}
