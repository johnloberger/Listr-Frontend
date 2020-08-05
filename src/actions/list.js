export const fetchListsSuccess = (lists) => {
  return {
    type: 'FETCH_LISTS_SUCCESS',
    lists
  }

}
export const createListSuccess = (newList) => {
  return {
    type: 'CREATE_LIST_SUCCESS',
    newList
  }
}

export const deleteListSuccess = (id) => {
  return {
    type: 'DELETE_LIST_SUCCESS',
    id
  }
}