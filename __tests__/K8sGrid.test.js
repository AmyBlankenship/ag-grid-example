import React from 'react';
import K8sGrid from '../src/components/K8sGrid';
import {waitForAgGridReady} from '../testUtil'
import {find} from 'lodash';
//setupTests.js not working
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Kubernetes Grid', () => {
  let k8sGrid
  const props = {
    items: [
      {
        "level": 0,
        "parentId": null,
        "name": "All Clusters",
        "id": "top-1",
        "charts": [
          "#3e1d11",
          "#05387f",
          "#6a401d",
          "#0d3031",
          "#7a4f06",
          "#674c1a",
          "#3a3050",
          "#7e495f"
        ],
        "cpu_util": 94,
        "cpu_sat": 7,
        "mem_util": 63,
        "mem_sat": 64,
        "disk_util": 19,
        "disk_sat": 83,
        "nw_util": 51,
        "nw_sat": 92
      },
      {
        "level": 1,
        "parentId": "top-1",
        "name": "dolorem occaecati delectus",
        "id": "cluster-2",
        "charts": [
          "#14493a",
          "#42362c",
          "#7c7841",
          "#771762",
          "#5d320f",
          "#0a750a",
          "#6e314d",
          "#5d7038"
        ],
        "cpu_util": 2,
        "cpu_sat": 76,
        "mem_util": 88,
        "mem_sat": 82,
        "disk_util": 97,
        "disk_sat": 90,
        "nw_util": 28,
        "nw_sat": 83
      },
    ],
    onItemSelect: jest.fn(),
  }
  beforeEach((done) => {
    k8sGrid = mount(<K8sGrid {...props} />)
    waitForAgGridReady(k8sGrid, done)
  })
  afterEach(() => {
    k8sGrid.unmount()
  })
  it('should have an "All Clusters" cell', () => {
    //for some reason, react-wrapper filtering can't find the cells, so we wind up in cheerio wrapper land
    const gridCells = k8sGrid.render().find('.ag-cell-value')
    //using lodash because we can filter objects of type we don't know much about based on what we see in the console
    const acCell = find(gridCells, ['children.[0].data', 'All Clusters'])
    expect(acCell).toBeTruthy()
  })
  
  it('should select "All Clusters"', () => {
    const event = {column: {id:0}, value: props.items[0], event: {preventDefault: jest.fn()}}
    //internal parts of ag grid are not avaailable as react wrappers, so can't simulate()
    k8sGrid.instance().handleNameClicked(event)
    
    expect(props.onItemSelect).toHaveBeenCalledWith('top-1')
  })
})