import { mount } from 'enzyme'
import { CanvasPage } from '../CanvasPage'
import { LayerRow } from '../LayerRow'

describe('Layers', () => {
	it('moves layer up', () => {
		const wrapper = mount(<CanvasPage />)

		// Press the up button on the second layer
		wrapper.find(LayerRow).at(1).find('button').at(0).simulate('click')

		// Expect it to now be the first row
		expect(wrapper.find(LayerRow).first().find('p').first().text()).toBe('Second')
	})

	it('moves layer down', () => {
		const wrapper = mount(<CanvasPage />)

		// Press the down button on the second layer
		wrapper.find(LayerRow).first().find('button').at(1).simulate('click')

		// Expect it to now be the second row
		expect(wrapper.find(LayerRow).at(1).find('p').first().text()).toBe('First')
	})

	it('deletes a layer', () => {
		const wrapper = mount(<CanvasPage />)

		// Press the delete button on the first layer
		wrapper.find(LayerRow).first().find('button').at(2).simulate('click')

		// Expect there to be one layer and for it to be the 'Second' layer
		expect(wrapper.find(LayerRow).length).toBe(1)
		expect(wrapper.find(LayerRow).first().find('p').first().text()).toBe('Second')
	})
})