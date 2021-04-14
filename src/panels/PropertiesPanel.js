import { useRef } from "react"

/**
 * @param {number} props.width the width of the canvas
 * @param {number} props.height the height of the canvas
 * @param {function} props.setDimensions callback fired when dimensions should be updated
 */
export const PropertiesPanel = props => {
	const widthInputRef = useRef()
	const heightInputRef = useRef()

	return (
		<div style={{border: '1px solid black', width: 300}}>
			<span style={{color: 'black'}}>Properties</span>
			<br />
			<span style={{color: 'black', fontSize: 20}}>Width: </span>
			<br />
			<input type='text' placeholder='Width' defaultValue={props.width} ref={widthInputRef} />
			<br />
			<span style={{color: 'black', fontSize: 20}}>Height: </span>
			<br />
			<input type='text' placeholder='Height' defaultValue={props.height} ref={heightInputRef} />
			<br />
			<button onClick={() => props.setDimensions(Number(widthInputRef.current.value), Number(heightInputRef.current.value))}>
				Set Dimensions
			</button>
		</div>
	)
}