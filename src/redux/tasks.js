import * as ActionTypes from './ActionTypes'

export const Tasks = (state = {
	tasks: null
}, action) => {
	switch (action.type){
		case ActionTypes.LOAD_TASKS: 
			return {...state, tasks: action.payload}

		case ActionTypes.ADD_TASK: 
		console.log('adding task in action types')
			return {
				...state, 
				tasks: [
					...state.tasks,
					{
						...action.payload,
						id: state.tasks.length + 1
					}
				]
			}

		case ActionTypes.REMOVE_TASK: 

		default: 
			return state
	}
}