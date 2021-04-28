import { mount } from 'enzyme'
import { CanvasPage } from '../CanvasPage'
import { ToolIcon } from '../ToolIcon'
import { ToolPanel } from '../panels/ToolPanel'
import { tools } from '../CanvasPage'

describe('Tool Panel', () => {
	it('displays on screen', () => {
		const wrapper = mount(<CanvasPage />)
		const toolPanel = wrapper.find(ToolPanel)
		expect(toolPanel.length).toBeGreaterThanOrEqual(1) // Tool Panel visible on screen
	})

	it('sets pencil to active tool', () => {
		const wrapper = mount(<CanvasPage />)
		const toolPanel = wrapper.find(ToolPanel)
		const pencilTool = toolPanel.find(ToolIcon).first()
		pencilTool.simulate('click')
		expect(toolPanel.prop('currentTool').id).toBe('tool.pencil')
	})

	it('sets square to active tool', () => {
		const setCurrentTool = jest.fn()
		const wrapper = mount(<ToolPanel currentTool={tools[0]} toolList={tools} setCurrentTool={setCurrentTool} />)
		
		wrapper.find(ToolIcon).at(2).find('div').prop('onClick')()

		expect(setCurrentTool).toHaveBeenCalledWith({"icon": "square.svg", "id": "tool.square", "name": "Square Tool"})
	})

	it('sets circle to active tool', () => {
		const setCurrentTool = jest.fn()
		const wrapper = mount(<ToolPanel currentTool={tools[0]} toolList={tools} setCurrentTool={setCurrentTool} />)
		
		wrapper.find(ToolIcon).at(3).find('div').prop('onClick')()

		expect(setCurrentTool).toHaveBeenCalledWith({"icon": "circle.svg", "id": "tool.circle", "name": "Circle Tool"})
	})

	it('sets triangle to active tool', () => {
		const setCurrentTool = jest.fn()
		const wrapper = mount(<ToolPanel currentTool={tools[0]} toolList={tools} setCurrentTool={setCurrentTool} />)
		
		wrapper.find(ToolIcon).at(4).find('div').prop('onClick')()

		expect(setCurrentTool).toHaveBeenCalledWith({"icon": "triangle.svg", "id": "tool.triangle", "name": "Triangle Tool"})
	})

	it('sets triangle to active tool', () => {
		const setCurrentTool = jest.fn()
		const wrapper = mount(<ToolPanel currentTool={tools[0]} toolList={tools} setCurrentTool={setCurrentTool} />)
		
		wrapper.find(ToolIcon).at(5).find('div').prop('onClick')()

		expect(setCurrentTool).toHaveBeenCalledWith({"icon": "text.svg", "id": "tool.text", "name": "Text Tool"})
	})

	it ('sets select to active tool', () => {
		const setCurrentTool = jest.fn()
		const wrapper = mount(<ToolPanel currentTool={tools[0]} toolList={tools} setCurrentTool={setCurrentTool} />)
		
		wrapper.find(ToolIcon).at(6).find('div').prop('onClick')()

		expect(setCurrentTool).toHaveBeenCalledWith({"icon": "select.png", "id": "tool.select", "name": "Select Tool"})
	})

	it ('sets translate to active tool', () => {
		const setCurrentTool = jest.fn()
		const wrapper = mount(<ToolPanel currentTool={tools[0]} toolList={tools} setCurrentTool={setCurrentTool} />)
		
		wrapper.find(ToolIcon).at(7).find('div').prop('onClick')()

		expect(setCurrentTool).toHaveBeenCalledWith({"icon": "translate.png", "id": "tool.translate", "name": "Translate Tool"})
	})

	it('sets triangle to active tool', () => {
		const setCurrentTool = jest.fn()
		const wrapper = mount(<ToolPanel currentTool={tools[0]} toolList={tools} setCurrentTool={setCurrentTool} />)
		
		wrapper.find(ToolIcon).at(8).find('div').prop('onClick')()

		expect(setCurrentTool).toHaveBeenCalledWith({"icon": "eyedropper.svg", "id": "tool.eyeDropper", "name": "EyeDropper Tool"})
	})
})