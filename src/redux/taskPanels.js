import * as ActionTypes from './ActionTypes'

export const TaskPanels = (state = {
	taskPanels: null
}, action) => {
	switch(action.type) {
		case ActionTypes.LOAD_TASK_PANELS:
			return {...state, taskPanels: action.payload}

		case ActionTypes.ADD_TASK_PANEL:
			console.log('adding task panel')
			return {
				...state, 
				taskPanels: [
					...state.taskPanels, 
					action.payload
				]
			}
		default: return state
	}
}