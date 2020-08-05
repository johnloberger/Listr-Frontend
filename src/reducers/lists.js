export default function Lists(state=[], action) {
  switch(action.type) {
    case 'FETCH_LISTS_SUCCESS':
      return [...action.lists]
    case 'CREATE_LIST_SUCCESS':
      return [...state, action.newList]
    case 'DELETE_LIST_SUCCESS':
      return state.filter(list => list.id !== action.id)
    default: 
      return state
  }
}