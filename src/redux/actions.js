export const AddProject = (projectName, id) => ({
  type: "ADD_PROJECT",
  projectName, id
})

export const AddTask = (taskName, taskDesc, project, taskId) => ({
  type: "ADD_TASK",
  taskName, taskDesc, project, taskId
})

export const ChangeCompleted = (taskId) => ({
  type: "CHANGE_COMPLETED",
  taskId
})

export const SetProjects = (projects) => ({
  type: "SET_PROJECTS",
  projects
})

export const setTasks = (projectId, tasks) => ({
  type: "SET_TASKS",
  projectId, tasks
})
