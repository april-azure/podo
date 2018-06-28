import * as ActionTypes from './ActionTypes'

export const Projects = (state = {
	projects: null
}, action) => {
	switch (action.type){
		case ActionTypes.LOAD_PROJECTS: 
			return { ...state, projects: action.payload }

		case ActionTypes.ADD_PROJECT: 
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

		case ActionTypes.UPDATE_PROJECT: 
			console.log(action.payload)
			const newProjects = [...state.projects]
			for(let i = 0; i < newProjects.length; i++ ) {
				if(newProjects[i].id === action.payload.id){
					newProjects[i] = {
						...action.payload
					}
				}
			}
			return {
				...state, 
				projects: [...newProjects]
			}

		case ActionTypes.REMOVE_PROJECT: 

		default: 
			return state
	}
}