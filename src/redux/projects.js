import * as ActionTypes from './ActionTypes'

export const Projects = (state = {
	projects: null
}, action) => {
	switch (action.type){
		case ActionTypes.LOAD_PROJECTS: 
			return { ...state, projects: action.payload }

		case ActionTypes.ADD_PROJECT: 
			console.log('adding project')
			return {
				...state, 
				projects: [
					...state.projects,
					{
						...action.payload,
						id: state.projects.length
					}
				]
			}

		case ActionTypes.REMOVE_PROJECT: 

		default: 
			return state
	}
}