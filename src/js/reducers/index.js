import { combineReducers } from 'redux'

import UserReducer from './UserReducer'
import ProjectReducer from './ProjectReducer'

const allReducers = combineReducers({
	user: UserReducer,
	projects: ProjectReducer
})

export default allReducers