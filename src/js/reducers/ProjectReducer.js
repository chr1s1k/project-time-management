import { PROJECTS_LOADED, CLEAR_PROJECTS, PROJECT_CREATED, PROJECT_LOADED, TIMESHEET_CREATED } from '../actions/actions'

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
					...state.projects,
					action.project
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

		case CLEAR_PROJECTS:
			return initialState

		default:
			return state
	}
}

export default ProjectReducer