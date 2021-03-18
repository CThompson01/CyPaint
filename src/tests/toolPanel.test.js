import { mount } from 'enzyme'
import App from '../App'

describe('Tool Panel', () => {
	it('displays on screen', () => {
		const wrapper = mount(<App />)
		const createBlankCanvasButton = wrapper.find('#create-blank-canvas-button')
		createBlankCanvasButton.simulate('click')
		const toolPanel = wrapper.find('#mainToolPanel')
		expect(toolPanel.length).toBeGreaterThanOrEqual(1) // Tool Panel visible on screen
	})
})