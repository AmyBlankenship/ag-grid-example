import mainReducer from '../src/reducers/k8sMain';
import { k8sActionTypes } from "../src/actions/k8sActions";
 
describe('main reducer', ()=> {
  const items = [
    {id:'root', parentId: null},
    //cluster
    {id:'l-0-1', parentId: 'root'},
    {id:'l-0-2', parentId: 'root'},
    {id:'l-0-3', parentId: 'root'},
    //namespace
    {id:'l-1-1', parentId: 'l-0-1'},
    {id:'l-1-2', parentId: 'l-0-1'},
    {id:'l-1-3', parentId: 'l-0-1'},
    //pod
    {id:'l-2-1', parentId: 'l-1-1'},
    {id:'l-2-2', parentId: 'l-1-1'},
    //container
    {id:'l-3-1', parentId: 'l-2-1'},
    {id:'l-3-2', parentId: 'l-2-1'},
  ]

  
  it('should not do anything without a selection', () => {
    const initialState = {
      items
    }
    
    expect(mainReducer(initialState, {type: k8sActionTypes.K8S_SELECT_ITEM, id:'notfound'})).toEqual(initialState)
  })
  
  it('should select a root item', () => {
    const initialState = {
      items
    }
    const expectedState = {
      ...initialState,
      breadcrumbItems: [items[0]],
      childItems:items.slice(1, 4),
      selectedItem: items[0]
    }
    
    expect(mainReducer(initialState, {type: k8sActionTypes.K8S_SELECT_ITEM, id:'root'})).toEqual(expectedState)
  })
  
  it('should select a pod', () => {
    const initialState = {
      items
    }
    const expectedState = {
      ...initialState,
      breadcrumbItems: expect.any(Array),
      childItems:items.slice(9),
      selectedItem: items[7]
    }

    const result = mainReducer(initialState, {type: k8sActionTypes.K8S_SELECT_ITEM, id:'l-2-1'})
    
    expect(result).toEqual(expectedState)
    expect(result.breadcrumbItems.length).toEqual(4)
  })
})