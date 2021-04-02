import './LayerPanel.css'
import { LayerRow } from './LayerRow'

/**
 * @param {Layer} props.layers the layers to display
 */
export const LayerPanel = props => {
	return (
		<div id='mainLayerPanel'>
			{props.layers.map((layer, index) => (
				<LayerRow
					layer={layer}
					key={String(index)}
					up={() => props.up(index)}
					down={() => props.down(index)}
					delete={() => props.delete(index)} />
			))}
		</div>
	);
}
