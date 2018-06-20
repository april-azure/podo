import * as ActionTypes from './ActionTypes'

export const Tasks = (state = {
	tasks: null
}, action) => {
	switch (action.type){
		case ActionTypes.LOAD_TASKS: 
			return {...state, tasks: action.payload}

		case ActionTypes.ADD_TASK: 

		case ActionTypes.REMOVE_TASK: 

		default: 
			return state
	}
}