const normalizeState = (projectArray) => {
  let normalizedState = {
    projectsById: {},
    tasksById: {},
  };

  projectArray.forEach((project) => {
    normalizedState.projectsById[project.id] = {
      id: project.id,
      name: project.name,
      tasksIds: project.tasks.map(task => {
        normalizedState.tasksById[task.id] = task
        return task.id
      })
    }
  })

  return normalizedState;
}
let initialState = {
  theme: 'light',
  ...normalizeState([
    {
      id: 1,
      name: "Project name",
      tasks: [
        {
          id: 1,
          name: "Name of the task",
          description: "What needs to be done",
          completed: false,
        },
        {
          id: 2,
          name: "Clear room",
          desription: "My room is bad",
          completed: true,
        },
        {
          id: 3,
          name: "Learn React",
          description: "Nice lib",
          completed: true,
        },
        {
          id: 4,
          name: "Get 5 marks",
          description: "it's neccecary",
          completed: false,
        },
        {
          id: 5,
          name: "Learn NodeJS",
          description: "Nice platform",
          completed: false,
        },
        {
          id: 6,
          name: "Buy apple",
          description: "For my mom",
          completed: true,
        },
        {
          id: 7,
          name: "Go sleep",
          description: "Don't know what's a poing",
          completed: false,
        },
         
      ]
    }
  ])
}

const ReducerApp = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'ADD_PROJECT':
      let id = Date.now();
      return {
        ...state,
        projectsById: {
          [id]: {
            id: id,
            name: action.projectName,
            tasksIds: []
          },
          ...state.projectsById
        }
      }
    case 'ADD_TASK': {
      let id = Date.now();
      return {
        ...state,
        projectsById: {
          ...state.projectsById,
          [action.project.id]: {
            ...action.project,
            tasksIds: [id, ...action.project.tasksIds]
          }
        },
        tasksById: {
          ...state.tasksById,
          [id]: {
            id,
            name: action.taskName,
            description: action.taskDesc,
            completed: false,
          }
        }
      }
    
    }

    case 'CHANGE_COMPLETED': {
      return {
        ...state,        
        tasksById: {
          ...state.tasksById,
          [action.taskId]: {
            ...state.tasksById[action.taskId],
            completed: !state.tasksById[action.taskId].completed
          },
        }
      }
    }
    default:
      return state;
  }
}

export default ReducerApp