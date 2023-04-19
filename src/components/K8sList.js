import React from "react";
import PropTypes from "prop-types";
import BreadcrumbItem from "./BreadcrumbItem";
import K8sGrid from "./K8sGrid";
import "./K8sList.css";

const K8sList = ({ selectedItem, breadcrumbItems, childItems, selectItem }) => (
  <React.Fragment>
    <ul className="breadcrumbs">
      {breadcrumbItems.map(item => (
        <BreadcrumbItem key={item.id} item={item} onClick={selectItem} />
      ))}
    </ul>
    <h2>{selectedItem.name}</h2>
    <K8sGrid items={childItems} onItemSelect={selectItem} />
  </React.Fragment>
);

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

K8sList.propTypes = {
  selectedItem: PropTypes.object.isRequired,
  breadcrumbItems: PropTypes.arrayOf(itemShape).isRequired,
  childItems: PropTypes.arrayOf(itemShape).isRequired,
  selectItem: PropTypes.func.isRequired
};

export default K8sList;
