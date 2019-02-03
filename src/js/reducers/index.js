import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import ProjectReducer from './ProjectReducer'
import MessageCenterReducer from './MessageCenterReducer'
import SidebarReducer from './SidebarReducer'

const allReducers = combineReducers({
	auth: AuthReducer,
	projects: ProjectReducer,
	messageCenter: MessageCenterReducer,
	sidebar: SidebarReducer
})

export default allReducers