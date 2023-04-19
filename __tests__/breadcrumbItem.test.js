import React from 'react';
import {shallow} from 'enzyme';
import BreadcrumbItem from '../src/components/BreadcrumbItem'
//setupTests.js not working
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('breadcrumb item', () => {
  const callback = jest.fn()
  const props = {
    item: {id:'foo', name:'foo cluster'},
    onClick: callback
  }
  let bci
  beforeEach(() => {
    bci = shallow(<BreadcrumbItem {...props} />)
  })
  it('should have the item text', () => {
    expect(bci.text()).toEqual('foo cluster')
  })
  it('should call the callback', () => {
    const li = bci.find('li')
    li && li.simulate('click')
    expect(callback).toHaveBeenCalledWith('foo')
  })
})