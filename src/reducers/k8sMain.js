import { k8sActionTypes } from "../actions/k8sActions";
import { find, filter } from "lodash";

const k8sMainReducer = (state = {}, action) => {
  switch (action.type) {
    case k8sActionTypes.K8S_SELECT_ITEM:
      const id = action.id;
      const selectedItem = find(state.items, { id: id })
      if (!selectedItem) return state
      const childItems = filter(state.items, { parentId: id });
      let breadcrumbItems = [];
      let childItem = selectedItem;
      do {
        breadcrumbItems.unshift(childItem);
        childItem = find(state.items, { id: childItem.parentId });
      } while (childItem);
      return {
        ...state,
        selectedItem,
        childItems,
        breadcrumbItems
      };
    default:
      return state;
  }
};

export default k8sMainReducer;
