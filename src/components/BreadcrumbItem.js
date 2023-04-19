import React from "react";
import PropTypes from "prop-types";

const BreadcrumbItem = ({ onClick, item }) => (
  <li onClick={() => onClick(item.id)}>{item.name}</li>
);

BreadcrumbItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

export default BreadcrumbItem;
