// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import enzyme from 'enzyme'

enzyme.configure({ adapter: new Adapter() })

// Mock ctx.getContext
HTMLCanvasElement.prototype.getContext = () => ({
	fillRect: function() {},
	clearRect: function(){},
	getImageData: function(x, y, w, h) {
		return {
			data: new Array(w*h*4)
		};
	},
	putImageData: function() {},
	createImageData: function(w, h) { return {data: []} },
	setTransform: function(){},
	drawImage: function(){},
	save: function(){},
	fillText: function(){},
	restore: function(){},
	beginPath: function(){},
	moveTo: function(){},
	lineTo: function(){},
	closePath: function(){},
	stroke: function(){},
	translate: function(){},
	scale: function(){},
	rotate: function(){},
	arc: function(){},
	fill: function(){},
	measureText: function(){
		return { width: 0 };
	},
	transform: function(){},
	rect: function(){},
	clip: function(){},
});
