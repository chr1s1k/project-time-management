import { TOGGLE_SIDEBAR, CLOSE_SIDEBAR } from '../actions/actions'

const initialState = {
	opened: false,
	menuIconVisible: false
}

export default function SidebarReducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_SIDEBAR:
			return {
				...state,
				opened: !state.opened,
				menuIconVisible: true
			}

		case CLOSE_SIDEBAR:
			return initialState

		default:
			return state
	}
}