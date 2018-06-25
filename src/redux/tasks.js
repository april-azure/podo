import * as ActionTypes from './ActionTypes'

export const Tasks = (state = {
	tasks: null
}, action) => {
	switch (action.type){
		case ActionTypes.LOAD_TASKS: 
			return {...state, tasks: action.payload}

		case ActionTypes.ADD_TASK: {
			console.log('adding/editing task in action types')
			var newTasks = [...state.tasks]
			var found = false
			for(var i = 0; i < newTasks.length; i++) {
				if(newTasks[i].id === action.payload.id) {
					found = true
					const oldTask = {...newTasks[i]}
					newTasks[i] = {
						...oldTask,
						...action.payload
					}
				}
			}
			if(!found){
				newTasks.push({
					...action.payload,
					id: state.tasks.length
				})					
			}
			
			return {
				...state,
				tasks: [...newTasks]
			}			
		}

		case ActionTypes.FINISH_TASK: {
			var newTasks = [...state.tasks]
			for(var i = 0; i < newTasks.length; i++) {
				if(newTasks[i].id === action.payload) {
					newTasks[i].finish = !newTasks[i].finish
					? true 
					: !newTasks[i].finish	
				}
			}

			return {
				...state, 
				tasks: [...newTasks]
			}
		}

		case ActionTypes.REMOVE_TASK: 

		default: 
			return state
	}
}