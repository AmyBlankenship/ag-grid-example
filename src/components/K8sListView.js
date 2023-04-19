import { connect } from "react-redux";
import { selectK8sItem } from "../actions/k8sActions";
import K8sList from "./K8sList";

const mapStateToProps = ({ selectedItem, breadcrumbItems, childItems }) => ({
  selectedItem,
  breadcrumbItems,
  childItems
});
const mapDispatchToProps = dispatch => ({
  selectItem: id => {
    dispatch(selectK8sItem(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(K8sList);
