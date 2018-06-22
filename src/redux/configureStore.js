import { createStore, combineReducers } from 'redux'
import { Projects } from './projects'
import { TaskPanels } from './taskPanels'
import { Tasks } from './tasks'
import { User } from './user'

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			projects: Projects,
			taskPanels: TaskPanels, 
			tasks: Tasks,
			user: User
		})
	)

	return store
}