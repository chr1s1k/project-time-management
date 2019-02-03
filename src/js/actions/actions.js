import Cookies from 'js-cookie'
import axios from 'axios'

const handleErrorMessage = (err) => {
	let errorMessage = ''

	if (err.response) {
		errorMessage = err.response.status >= 500 ? err.response.statusText : err.response.data.message
	} else if (err.request) {
		errorMessage = 'Chyba připojení.'
	}

	return errorMessage
}


// akce pro přihlášení

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export function requestLogin(credentials) {
	return {
		type: LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false,
		credentials: credentials
	}
}

export function loginSuccess(data) {
	return {
		type: LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		jwt: data.jwt
	}
}

export function loginError(message) {
	return {
		type: LOGIN_ERROR,
		isFetching: false,
		isAuthenticated: false,
		message: message
	}
}

export function loginUser(credentials) {
	return (dispatch) => {
		dispatch(requestLogin(credentials))

		return axios.post('/api/login.php', credentials)
			.then((response) => {
				Cookies.set('jwtToken', response.data.jwt, { expires: 1 })
				dispatch(loginSuccess(response.data))
			})
			.catch((err) => {
				let errorMessage = handleErrorMessage(err)
				dispatch(loginError(errorMessage))
			})
	}
}


// akce pro odhlášení

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

export function requestLogout() {
	return {
		type: LOGOUT_REQUEST,
		isFetching: true,
		isAuthenticated: true
	}
}

export function logoutSuccess() {
	return {
		type: LOGOUT_SUCCESS,
		isFetching: false,
		isAuthenticated: false,
		message: 'Odhlášení proběhlo úspěšně.'
	}
}

export function logoutUser() {
	return (dispatch) => {
		dispatch(requestLogout())
		Cookies.remove('jwtToken')
		dispatch(logoutSuccess())
	}
}


// akce pro validaci tokenu

export const VALIDATE_TOKEN_REQUEST = 'VALIDATE_TOKEN_REQUEST'
export const TOKEN_VALIDATED = 'TOKEN_VALIDATED'
export const TOKEN_REJECTED = 'TOKEN_REJECTED'

export function requestValidateToken(token) {
	return {
		type: VALIDATE_TOKEN_REQUEST,
		isFetching: true,
		jwt: token
	}
}

export function tokenValidationSuccess(data) {
	return {
		type: TOKEN_VALIDATED,
		isFetching: false,
		isAuthenticated: true,
		data: data
	}
}

export function tokenValidationError(message) {
	return {
		type: TOKEN_REJECTED,
		isFetching: false,
		isAuthenticated: false,
		message: message
	}
}

export function validateToken(token) {
	return (dispatch) => {
		dispatch(requestValidateToken(token))

		return axios.post('/api/validateToken.php', {
			withCredentials: true
		}).then(response => {
			dispatch(tokenValidationSuccess(response.data))
		}).catch(err => {
			let errorMessage = handleErrorMessage(err)
			dispatch(tokenValidationError(errorMessage))
		})
	}
}


// akce pro result hlášky

export const CLOSE_MESSAGE = 'CLOSE_MESSAGE'

export function closeMessage() {
	return {
		type: CLOSE_MESSAGE
	}
}


// akce pro sidebar

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR'

export function toggleSidebar() {
	return {
		type: TOGGLE_SIDEBAR
	}
}

export function closeSidebar() {
	return {
		type: CLOSE_SIDEBAR
	}
}