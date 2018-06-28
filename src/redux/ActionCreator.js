import * as ActionTypes from './ActionTypes'
import { PROJECTS } from '../shared/projects'
import { TASKS } from '../shared/tasks'
import { TASKPANELS } from '../shared/taskPanel'

export const signIn = (username) => {
	return {
		type: ActionTypes.SIGN_IN,
		payload: username
	}
}

export const signOut = () => {
	return {
		type: ActionTypes.SIGN_OUT
	}
}

export const fetchProjects = () => {
	console.log(PROJECTS)
	return {
		type: ActionTypes.LOAD_PROJECTS,
		payload: PROJECTS
	}
}

export const addProject = (project) => {
	console.log('addproject')
	return{
		type: ActionTypes.ADD_PROJECT,
		payload:project
	}
}

export const fetchTasks = () => {
	return {
		type: ActionTypes.LOAD_TASKS,
		payload: TASKS
	}
}

export const addTodo = (todo) => {
	return {
		type: ActionTypes.ADD_TASK,
		payload: todo
	}
}

export const fetchTaskPanels = () => {
	return {
		type: ActionTypes.LOAD_TASK_PANELS,
		payload: TASKPANELS
	}
}

export const addTaskPanel = (taskPanel) => {
	return {
		type: ActionTypes.ADD_TASK_PANEL,
		payload: taskPanel
	}
}

export const updateTitle = (panelId, title) => {
	return {
		type: ActionTypes.UPDATE_TASK_PANEL_TITLE, 
		payload: {
			taskPanelId: panelId,
			title: title
		}
	}
}

export const finishTask = (taskId) => {
	return {
		type: ActionTypes.FINISH_TASK,
		payload: taskId
	}
}

export const updateProjectInfo = (project) => {
	return {
		type: ActionTypes.UPDATE_PROJECT, 
		payload: project
	}
}