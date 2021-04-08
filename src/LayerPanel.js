import './LayerPanel.css'
import { LayerRow } from './LayerRow'

/**
 * @param {Layer} props.layers the layers to display
 * @param {function} props.setActiveLayer callback fired with index
 */
export const LayerPanel = props => {
	return (
		<div id='mainLayerPanel'>
			{props.layers.map((layer, index) => (
				<LayerRow
					layer={layer}
					key={String(index)}
					selected={props.selected === index}
					onSelect={() => props.setActiveLayer(index)}
					up={() => props.up(index)}
					down={() => props.down(index)}
					delete={() => props.delete(index)} />
			))}
		</div>
	);
}
