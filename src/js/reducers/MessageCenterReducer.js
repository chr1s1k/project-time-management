import { LOGIN_ERROR, CLOSE_MESSAGE, TOKEN_REJECTED, LOGOUT_SUCCESS } from '../actions/actions'

const initialState = {
	open: false,
	message: ''
}

export default function MessageCenterReducer (state = initialState, action) {
	switch (action.type) {
		case LOGIN_ERROR:
		case TOKEN_REJECTED:
		case LOGOUT_SUCCESS:
			return {
				...state,
				open: true,
				message: action.message
			}

		case CLOSE_MESSAGE:
			return initialState

		default:
			return state
	}
}