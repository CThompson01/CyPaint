import { mount } from 'enzyme'
import { CanvasPage } from '../CanvasPage'
import { ToolIcon } from '../ToolIcon'
import { ToolPanel } from '../ToolPanel'

describe('Tool Panel', () => {
	it('displays on screen', () => {
		const wrapper = mount(<CanvasPage />)
		const toolPanel = wrapper.find(ToolPanel)
		expect(toolPanel.length).toBeGreaterThanOrEqual(1) // Tool Panel visible on screen
	})

	it('switches active tool', () => {
		const wrapper = mount(<CanvasPage />)
		const toolPanel = wrapper.find(ToolPanel)
		const pencilTool = toolPanel.find(ToolIcon).first()
		pencilTool.simulate('click')
		expect(toolPanel.prop('currentTool').id).toBe('tool.pencil')
	})

	it('switches active tool', () => {
		const wrapper = mount(<CanvasPage />)
		const toolPanel = wrapper.find(ToolPanel)
		const squareTool = toolPanel.find(ToolIcon)[2]
		squareTool.simulate('click')
		expect(toolPanel.prop('currentTool').id).toBe('tool.square')
	})

	it('switches active tool', () => {
		const wrapper = mount(<CanvasPage />)
		const toolPanel = wrapper.find(ToolPanel)
		const circleTool = toolPanel.find(ToolIcon)[3]
		circleTool.simulate('click')
		expect(toolPanel.prop('currentTool').id).toBe('tool.circle')
	})

	it('switches active tool', () => {
		const wrapper = mount(<CanvasPage />)
		const toolPanel = wrapper.find(ToolPanel)
		const triangleTool = toolPanel.find(ToolIcon)[4]
		triangleTool.simulate('click')
		expect(toolPanel.prop('currentTool').id).toBe('tool.triangle')
	})
})