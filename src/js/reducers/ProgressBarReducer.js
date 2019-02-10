import { SHOW_PROGRESS_BAR, HIDE_PROGRESS_BAR } from '../actions/actions'

const initialState = {
	isVisible: false
}

const ProgressBarReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_PROGRESS_BAR:
			return {
				...state,
				isVisible: true
			}

		case HIDE_PROGRESS_BAR:
			return {
				...state,
				isVisible: false
			}

		default:
			return state
	}
}

export default ProgressBarReducer