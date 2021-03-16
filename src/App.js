import './App.css';
import { useState } from 'react';
import { CanvasPage } from './CanvasPage';
import { HomePage } from './HomePage';

function App() {
	const [currentPage, setCurrentPage] = useState('home')

	return (
		<div className="App">
			{currentPage === 'canvas' ? (
				<CanvasPage />
			) : (
				<HomePage createBlankCanvas={() => setCurrentPage('canvas')} />
			)}
		</div>
	);
}

export default App;
