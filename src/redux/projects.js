import * as ActionTypes from './ActionTypes'

export const Projects = (state = {
	projects: null
}, action) => {
	switch (action.type){
		case ActionTypes.LOAD_PROJECTS: 
			return { ...state, projects: action.payload }

		case ActionTypes.ADD_PROJECT: 

		case ActionTypes.REMOVE_PROJECT: 

		default: 
			return state
	}
}