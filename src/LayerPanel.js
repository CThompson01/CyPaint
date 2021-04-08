import './LayerPanel.css'
import { LayerRow } from './LayerRow'

/**
 * @param {Layer} props.layers the layers to display
 * @param {function} props.setActiveLayer callback fired with id
 */
export const LayerPanel = props => {
	return (
		<div id='mainLayerPanel'>
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
	);
}
