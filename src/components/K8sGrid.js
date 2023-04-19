import React from "react";
import PropTypes from "prop-types";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { PureComponent } from "react";
import {get} from 'lodash';

class K8sGrid extends PureComponent {
  constructor (props) {
    super(props)
    this.onGridReady = this.onGridReady.bind(this);
    this.handleNameClicked = this.handleNameClicked.bind(this);
  }
  onGridReady (params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
    const selection = this.api.getRowNode('dolorem nam quis')
    console.log(!!selection)
    if (selection) {
      selection.setSelected(true)
      setTimeout(()=>this.api.ensureNodeVisible(selection), 2000)
    }
  }
  nameFormatter(data) {
    return data.data.name;
  }
  nameGetter(row) {
    return row.data;
  }
  handleNameClicked(event) {
    const {column, value} = event
    event.event.preventDefault()
    if (column.id > 0 || value.level>2) return;
    this.props.onItemSelect(value.id)
    this.api.setFocusedCell(-1, -1, null)
  }
  sortNames(value1, value2) {
    const name1 = get(value1, 'name', '')  
    return name1.localeCompare(get(value2, 'name', ''))
  }
  handleSort() {
    console.log('hiii')
  }

  render() {
    const { items } = this.props;
    const defaultColDef = {resizable: true}
    const colDefs = [
      {headerName: "Name", valueGetter: this.nameGetter, valueFormatter: this.nameFormatter, comparator: this.sortNames, minWidth: 200},
      {headerName: "CPU Utilization", field: "cpu_util", type: "numericColumn", },
      {headerName: "CPU Saturation", field: "cpu_sat", type: "numericColumn"},
      {headerName: "Memory Utilization", field: "mem_util", type: "numericColumn"},
      {headerName: "Memory Saturation", field: "mem_sat",type: "numericColumn"},
      {headerName: "Disk Utilization", field: "disk_util", type: "numericColumn"},
      {headerName: "Disk Saturation", field: "disk_sat",type: "numericColumn"}
    ];
    return (
      <div className='k8s-item-list ag-theme-balham'>
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={colDefs}
          rowData={items}
          onGridReady={this.onGridReady}
          onCellClicked={this.handleNameClicked}
          suppressCellSelection={true}
          enableSorting={true}
          sortChanged={this.handleSort}
          rowSelection={'single'}
          getRowNodeId={data => data.name}
        ></AgGridReact>
      </div>
    )
  }
}
//TODO: repeated code
const itemShape = PropTypes.shape({
  level: PropTypes.number.isRequired,
  parentId: PropTypes.string,
  name: PropTypes.string.isRequired,
  charts: PropTypes.arrayOf(PropTypes.string),
  cpu_util: PropTypes.number,
  cpu_sat: PropTypes.number,
  mem_util: PropTypes.number,
  mem_sat: PropTypes.number,
  disk_util: PropTypes.number,
  disk_sat: PropTypes.number
});

K8sGrid.propTypes = {
  onItemSelect: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(itemShape).isRequired,
}

export default K8sGrid;
