import { mount } from 'enzyme'
import { Layer } from '../layer'
import { LayerPanel } from '../panels/LayerPanel'
import { LayerRow } from '../LayerRow'

let layerList = [new Layer('First'), new Layer('Second')]

describe('Layers', () => {
	beforeEach(() => {
		layerList = [new Layer('First'), new Layer('Second')]	
	})

	it('displays layers', () => {
		const wrapper = mount(<LayerPanel layers={layerList} />)

		expect(wrapper.find(LayerRow).first().find('input').first().props().value).toBe('First')
		expect(wrapper.find(LayerRow).at(1).find('input').first().props().value).toBe('Second')
	})

	it('up callback fired', () => {
		const up = jest.fn();
		const wrapper = mount(<LayerPanel layers={layerList} up={up} />)

		wrapper.find(LayerRow).at(1).find('button').at(3).simulate('click')

		expect(up).toBeCalledTimes(1);
	})

	it('down callback fired', () => {
		const down = jest.fn();
		const wrapper = mount(<LayerPanel layers={layerList} down={down} />)

		wrapper.find(LayerRow).at(1).find('button').at(4).simulate('click')

		expect(down).toBeCalledTimes(1);
	})

	it('delete callback fired', () => {
		const deleteFunc = jest.fn();
		const wrapper = mount(<LayerPanel layers={layerList} delete={deleteFunc} />)

		wrapper.find(LayerRow).at(1).find('button').at(5).simulate('click')

		expect(deleteFunc).toBeCalledTimes(1);
	})

	it('invisible layer displays Show button', () => {
		layerList[0].visible = false;
		const wrapper = mount(<LayerPanel layers={layerList} />)

		expect(wrapper.find(LayerRow).at(0).find('button').at(1).text()).toBe('Show')
	})

	it('locked layer displays Unlock button', () => {
		layerList[0].locked = true;
		const wrapper = mount(<LayerPanel layers={layerList} />)

		expect(wrapper.find(LayerRow).at(0).find('button').at(0).text()).toBe('Unlock')
	})
})