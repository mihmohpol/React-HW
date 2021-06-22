import {TOKEN, DOMAIN} from './config';

const makeRequest = (endpoint, this2, method = 'GET', body = null) => {
  let config = {
    method,
    headers: {
      Token: this2.TOKEN,
      'Content-Type': 'application/json'
    }
  };
  if (method !== "GET" && body) {
    config.body = JSON.stringify(body);
  }
  let getResult = async () => {
    let response = await fetch(`${this2.DOMAIN}${endpoint}`, config)
    if (method !== "PUT") {
      let result = await response.json();
      console.log(result)
      return result;
    } else return null;
  };
  return getResult();
}

class ApiService {
  constructor() {
    this.TOKEN = TOKEN
    this.DOMAIN = DOMAIN
  }
  getProjects() {
    return makeRequest('/api/projects/', this);
  }

  addProject(name) {
    return makeRequest('/api/projects/', this, "POST", {name});
  }

  getTasksByProject(projectId) {
    return makeRequest(`/api/projects/${projectId}/tasks/`, this);
  }

  addTask(projectId, name, description) {
    return makeRequest(`/api/projects/${projectId}/tasks/`, this, 'POST', {
      name,
      description,
    })
  }

  changeTask(task, projectId) {
    return makeRequest(`/api/projects/${projectId}/tasks/${task.id}/`, this, 'PUT', {
      name: task.name,
      description: task.description,
      priority: 1,
      completed: task.completed,
      projectId: parseInt(projectId)
    })
  }
}

let instance = new ApiService();

export default instance;