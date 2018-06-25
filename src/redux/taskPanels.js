import * as ActionTypes from './ActionTypes'

export const TaskPanels = (state = {
	taskPanels: null
}, action) => {
	switch(action.type) {
		case ActionTypes.LOAD_TASK_PANELS:
			return {...state, taskPanels: action.payload}

		case ActionTypes.ADD_TASK_PANEL:
			return {
				...state, 
				taskPanels: [
					...state.taskPanels, 
					action.payload
				]
			}

		case ActionTypes.UPDATE_TASK_PANEL_TITLE: 
			var panels = [...state.taskPanels]
			for(var i = 0; i < panels.length; i++) {
				if(panels[i].id === action.payload.taskPanelId)
					panels[i].title = action.payload.title
			}
			return {
				...state, 
				taskPanels: panels
			}

		default: return state
	}
}