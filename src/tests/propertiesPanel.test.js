import { mount } from "enzyme";
import { PropertiesPanel } from "../panels/PropertiesPanel";

describe('Properties Panel', () => {
	it('displays initial width', () => {
		const wrapper = mount(<PropertiesPanel width={852} />)
		expect(wrapper.find('input').at(0).props().defaultValue).toBe(852)
	})

	it('displays initial height', () => {
		const wrapper = mount(<PropertiesPanel height={1251} />)
		expect(wrapper.find('input').at(1).props().defaultValue).toBe(1251)
	})

	it('fires with updated width', () => {
		const setDimensions = jest.fn();
		const wrapper = mount(<PropertiesPanel setDimensions={setDimensions} width={400} height={400} />)
		wrapper.find('input').at(0).instance().value = '100'
		wrapper.find('button').first().props().onClick();
		expect(setDimensions).toHaveBeenCalledWith(100, 400)
	})

	it('fires with updated height', () => {
		const setDimensions = jest.fn();
		const wrapper = mount(<PropertiesPanel setDimensions={setDimensions} width={400} height={400} />)
		wrapper.find('input').at(1).instance().value = '123'
		wrapper.find('button').first().props().onClick();
		expect(setDimensions).toHaveBeenCalledWith(400, 123)
	})
})