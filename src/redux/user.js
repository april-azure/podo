import * as ActionTypes from './ActionTypes'

export const User = (state = {
	user: '',
	login: false
}, action) => {
	switch(action.type) {
		case ActionTypes.SIGN_IN: 
			return {...state, login: true, user: action.payload}

		case ActionTypes.SIGN_OUT: 
			return {...state, login: false, user:''}

		default: 
			return state
	}
}