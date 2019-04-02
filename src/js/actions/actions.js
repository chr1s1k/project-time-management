import Cookies from 'js-cookie'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

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

export function loginSuccess(token) {
	const decoded = jwtDecode(token)

	return {
		type: LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		token: token,
		data: decoded.data
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
				Cookies.set('token', response.data.token, { expires: 1 })
				dispatch(loginSuccess(response.data.token))
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

export function logoutSuccess(reason) {
	return {
		type: LOGOUT_SUCCESS,
		isFetching: false,
		isAuthenticated: false,
		message: reason || 'Odhlášení proběhlo úspěšně.'
	}
}

export function logoutUser(reason = null) {
	return (dispatch) => {
		dispatch(requestLogout())
		Cookies.remove('token')
		dispatch(logoutSuccess(reason))
		dispatch(closeSidebar())
		dispatch(clearProjects())
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
		token: token
	}
}

export function tokenValidationSuccess(data) {
	return {
		type: TOKEN_VALIDATED,
		isFetching: false,
		isAuthenticated: true,
		user: data
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
export const SHOW_MESSAGE = 'SHOW_MESSAGE'

export function closeMessage() {
	return {
		type: CLOSE_MESSAGE
	}
}

export function showMessage(message) {
	return {
		type: SHOW_MESSAGE,
		message: message
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


// akce pro progress bar

export const SHOW_PROGRESS_BAR = 'SHOW_PROGRESS_BAR'
export const HIDE_PROGRESS_BAR = 'HIDE_PROGRESS_BAR'

export function showProgressBar() {
	return {
		type: SHOW_PROGRESS_BAR
	}
}

export function hideProgressBar() {
	return {
		type: HIDE_PROGRESS_BAR
	}
}


// akce pro práci s projekty

export const PROJECTS_LOADED = 'PROJECTS_LOADED'
export const CLEAR_PROJECTS = 'CLEAR_PROJECTS'
export const PROJECT_CREATED = 'PROJECT_CREATED'
export const PROJECT_LOADED = 'PROJECT_LOADED'
export const CLEAR_PROJECT = 'CLEAR_PROJECT'

export function projectsLoaded(projects) {
	return {
		type: PROJECTS_LOADED,
		projects
	}
}

export function clearProjects() {
	return {
		type: CLEAR_PROJECTS
	}
}

export function projectCreated(project) {
	return {
		type: PROJECT_CREATED,
		project
	}
}

export function projectLoaded(project) {
	return {
		type: PROJECT_LOADED,
		project
	}
}

export function clearProject() {
	return {
		type: CLEAR_PROJECT
	}
}

export function loadUserProjects(userId) {
	return (dispatch) => {
		dispatch(showProgressBar())

		return axios.get('http://localhost/project-time-management/public/api/getUserProjects.php', {
			params: {
				userId: userId
			},
			withCredentials: true,
			// headers: {
			// 	'Authorization': `Bearer ${Cookies.get('token')}`
			// }
		}).then(response => {
			dispatch(hideProgressBar())
			dispatch(projectsLoaded(response.data.projects))
		}).catch(err => {
			dispatch(hideProgressBar())
			let errorMessage = handleErrorMessage(err)
			if (err.response && err.response.status === 401) { // pokud vypršela platnost tokenu, tak uživatele odhlaš
				dispatch(logoutUser(errorMessage))
			} else {
				dispatch(showMessage(errorMessage))
			}
		})
	}
}

export function createProject(project) {
	return (dispatch) => {
		dispatch(showProgressBar())

		return axios('/api/createProject.php', {
			method: 'POST',
			data: project,
			withCredentials: true
		}).then(response => {
			dispatch(hideProgressBar())
			dispatch(projectCreated(response.data.project))
			dispatch(showMessage(response.data.message))
		}).catch(err => {
			let errorMessage = handleErrorMessage(err)
			dispatch(showMessage(errorMessage))
		})
	}
}

export function loadProjectDetail(id) {
	return (dispatch) => {
		dispatch(showProgressBar())

		return axios('http://localhost/project-time-management/public/api/getProject.php', {
			params: {
				id: id
			},
			withCredentials: true
		}).then(response => {
			dispatch(hideProgressBar())
			dispatch(projectLoaded(response.data.project))
		}).catch(err => {
			dispatch(hideProgressBar())
			let errorMessage = handleErrorMessage(err)
			if (err.response && err.response.status === 401) { // pokud vypršela platnost tokenu, tak uživatele odhlaš
				dispatch(logoutUser(errorMessage))
			} else {
				dispatch(showMessage(errorMessage))
			}
		})
	}
}



// akce pro práci s timesheety

export const TIMESHEET_CREATED = 'TIMESHEET_CREATED'

export function timesheetCreated(timesheets, totalHours) {
	return {
		type: TIMESHEET_CREATED,
		timesheets,
		totalHours,
	}
}

export function createTimesheet(timesheet) {
	return (dispatch) => {
		dispatch(showProgressBar())

		return axios('/api/createTimesheet.php', {
			method: 'POST',
			data: timesheet,
			withCredentials: true,
		}).then(response => {
			dispatch(hideProgressBar())
			dispatch(timesheetCreated(response.data.project.timesheets, response.data.project.totalHours))
			dispatch(showMessage(response.data.message))
			return response
		}).catch(err => {
			dispatch(hideProgressBar())
			let errorMessage = handleErrorMessage(err)
			if (err.response && err.response.status === 401) { // pokud vypršela platnost tokenu, tak uživatele odhlaš
				dispatch(logoutUser(errorMessage))
			} else {
				dispatch(showMessage(errorMessage))
			}
		})
	}
}