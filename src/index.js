import { createStore } from "redux";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { filter, find } from "lodash";
import loadItems from "./data/loadItems";
import k8sMainReducer from "./reducers/k8sMain";
import K8sListView from "./components/K8sListView";
const items = loadItems();
const selectedItem = items[0];
//TODO: this is a repeat of the code in the reducer
const childItems = filter(items, { parentId: selectedItem.id });
let breadcrumbItems = [];
let childItem = selectedItem;
do {
  breadcrumbItems.unshift(childItem);
  childItem = find(items, { id: childItem.parentId });
} while (childItem);

const initialState = {
  items,
  selectedItem,
  childItems,
  breadcrumbItems
};

const store = createStore(k8sMainReducer, initialState);

render(
  <Provider store={store}>
    <K8sListView />
  </Provider>,
  document.getElementById("react-root")
);
