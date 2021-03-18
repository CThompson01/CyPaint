import './HomePage.css';

/**
 * Home Page
 * @param {function} props.createBlankCanvas callback fired when user wants to create blank canvas
 */
export function HomePage(props) {
	return (
		<div id="homePageContainer">
			<span>CyPaint</span>
			<br />
			<button id="create-blank-canvas-button" onClick={props.createBlankCanvas}>Create Blank Canvas</button>
		</div>
	)
}
