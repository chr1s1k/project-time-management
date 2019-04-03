import { PROJECTS_LOADED, CLEAR_PROJECTS, PROJECT_CREATED, PROJECT_LOADED, TIMESHEET_CREATED, CLEAR_PROJECT } from '../actions/actions'

const initialState = {
	projects: [],
	project: null,
	created: false,
}

const ProjectReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROJECTS_LOADED:
			return {
				...state,
				projects: action.projects
			}

		case PROJECT_CREATED:
			return {
				...state,
				projects: [
					action.project,
					...state.projects
				],
				created: true,
				id: action.project.id
			}

		case PROJECT_LOADED:
			return {
				...state,
				project: action.project
			}

		case TIMESHEET_CREATED:
			return {
				...state,
				project: Object.assign({}, state.project, {
					timesheets: action.timesheets,
					totalHours: action.totalHours
				})
			}

		case CLEAR_PROJECT:
			return {
				...state,
				created: false,
				id: null
			}

		case CLEAR_PROJECTS:
			return initialState

		default:
			return state
	}
}

export default ProjectReducer