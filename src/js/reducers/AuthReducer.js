import Cookies from 'js-cookie'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_ERROR, TOKEN_REJECTED, VALIDATE_TOKEN_REQUEST, TOKEN_VALIDATED, LOGOUT_REQUEST } from '../actions/actions'

const initialState = {
	isFetching: false,
	isAuthenticated: false,
	tokenExists: Cookies.get('jwtToken') ? true : false,
}

const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				user: action.credentials
			})

		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				tokenExists: action.jwt ? true : false
			})

		case LOGIN_ERROR:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated
			})

		case LOGOUT_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated
			})

		case LOGOUT_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				tokenExists: false
			})

		case VALIDATE_TOKEN_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated
			})

		case TOKEN_REJECTED:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated,
				tokenExists: false
			})

		case TOKEN_VALIDATED:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				isAuthenticated: action.isAuthenticated
			})

		default:
			return state
	}
}

export default AuthReducer