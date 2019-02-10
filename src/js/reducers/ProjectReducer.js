import { PROJECTS_LOADED, CLEAR_PROJECTS, PROJECT_CREATED } from '../actions/actions'

const initialState = []

const ProjectReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROJECTS_LOADED:
			return action.projects

		case PROJECT_CREATED:
			return [
				...state,
				action.project
			]

		case CLEAR_PROJECTS:
			return initialState

		default:
			return state
	}
}

export default ProjectReducer