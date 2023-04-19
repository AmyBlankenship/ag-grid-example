export const k8sActionTypes = {
  K8S_SELECT_ITEM: "K8S_SELECT_ITEM"
};

export const selectK8sItem = id => ({
  type: k8sActionTypes.K8S_SELECT_ITEM,
  id
});
