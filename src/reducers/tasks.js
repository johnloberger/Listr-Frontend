export default function Tasks(state=[], action) {
  switch(action.type) {
    case 'FETCH_TASKS_SUCCESS':
      return [...action.tasks]
    case 'CREATE_TASK_SUCCESS':
      return [...state, action.newTask]
    case 'DELETE_TASK_SUCCESS':
      return state.filter(task => task.id !== action.id)
    case 'UPDATE_TASK_ARRAY':
      return [...action.tasks]
    default: 
      return state
  }
}