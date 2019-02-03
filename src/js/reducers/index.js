import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import ProjectReducer from './ProjectReducer'

const allReducers = combineReducers({
	auth: AuthReducer,
	projects: ProjectReducer
})

export default allReducers