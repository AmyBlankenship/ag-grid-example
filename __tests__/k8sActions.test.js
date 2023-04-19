import {selectK8sItem} from '../src/actions/k8sActions';

describe('kubernetes actions', () => {
  it ('should create an action to select a k8s item', () => {
    const expectedAction = {id: 'foo', type: 'K8S_SELECT_ITEM'}
    expect(selectK8sItem('foo')).toEqual(expectedAction)
  })
})