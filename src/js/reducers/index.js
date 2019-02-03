import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import ProjectReducer from './ProjectReducer'
import MessageCenterReducer from './MessageCenterReducer'

const allReducers = combineReducers({
	auth: AuthReducer,
	projects: ProjectReducer,
	messageCenter: MessageCenterReducer
})

export default allReducers