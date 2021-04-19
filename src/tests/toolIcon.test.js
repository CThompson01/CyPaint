import { mount } from 'enzyme'
import { ToolIcon } from '../ToolIcon'
import { TriangleTool } from '../tools/triangleTool'

describe('Tool Icon', () => {
	it('fires callback when clicked', () => {
		const tool = new TriangleTool()
		const onClick = jest.fn()
		const wrapper = mount(<ToolIcon tool={tool} onClick={onClick} />)
		
		wrapper.find('div').prop('onClick')()
		expect(onClick).toHaveBeenCalledTimes(1)
	})
})