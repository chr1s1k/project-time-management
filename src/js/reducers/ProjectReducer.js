import { PROJECTS_LOADED, CLEAR_PROJECTS } from '../actions/actions'

const initialState = []

const ProjectReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROJECTS_LOADED:
			return action.projects

		case CLEAR_PROJECTS:
			return initialState

		default:
			return state
	}
}

export default ProjectReducer