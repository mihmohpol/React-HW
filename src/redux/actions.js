export const AddProject = (projectName) => ({
  type: "ADD_PROJECT",
  projectName
})

export const AddTask = (taskName, taskDesc, project) => ({
  type: "ADD_TASK",
  taskName, taskDesc, project,
})

export const ChangeCompleted = (taskId) => ({
  type: "CHANGE_COMPLETED",
  taskId
})