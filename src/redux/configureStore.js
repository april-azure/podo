import { createStore, combineReducers } from 'redux'
import { Projects } from './projects'
import { TaskPanels } from './taskPanels'
import { Tasks } from './tasks'

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			projects: Projects,
			taskPanels: TaskPanels, 
			tasks: Tasks
		})
	)

	return store
}