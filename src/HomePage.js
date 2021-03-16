import './HomePage.css';

export function HomePage(props) {
	return (
		<div id="homePageContainer">
			<span>CyPaint</span>
			<br />
			<button onClick={props.createBlankCanvas}>Create Blank Canvas</button>
		</div>
	)
}
