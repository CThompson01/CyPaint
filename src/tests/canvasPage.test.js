import { mount } from 'enzyme'
import App from '../App'

describe('Canvas Page', () => {
	it('displays main canvas', () => {
		const wrapper = mount(<App />)
		const createBlankCanvasButton = wrapper.find('#create-blank-canvas-button')
		createBlankCanvasButton.simulate('click')
		const mainCanvas = wrapper.find('#mainCanvas')
		expect(mainCanvas.length).toBeGreaterThanOrEqual(1) // Tool Panel visible on screen
	})
})