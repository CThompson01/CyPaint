import { mount } from 'enzyme'
import App from '../App'

describe('Home Page', () => {
	it('create blank canvas button opens canvas page', () => {
		const wrapper = mount(<App />)
		const createBlankCanvasButton = wrapper.find('#create-blank-canvas-button')
		createBlankCanvasButton.simulate('click')
		const canvasContainer = wrapper.find('#canvasPageContainer')
		expect(canvasContainer.length).toBeGreaterThanOrEqual(1) // Canvas visible on screen
	})
})
