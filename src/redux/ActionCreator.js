import * as ActionTypes from './ActionTypes'
import { PROJECTS } from '../shared/projects'

export const fetchProjects = () => {
	console.log(PROJECTS)
	return {
		type: ActionTypes.LOAD_PROJECTS,
		payload: PROJECTS
	}
}