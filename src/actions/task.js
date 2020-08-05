export const fetchTasksSuccess = (tasks) => {
  return {
    type: 'FETCH_TASKS_SUCCESS',
    tasks
  }

}
export const createTaskSuccess = (newTask) => {
  return {
    type: 'CREATE_TASK_SUCCESS',
    newTask
  }
}

export const updateTaskArray = (tasks) => {
  return {
    type: 'UPDATE_TASK_ARRAY',
    tasks
  }
}

export const deleteTaskSuccess = (id) => {
  return {
    type: 'DELETE_TASK_SUCCESS',
    id
  }
}