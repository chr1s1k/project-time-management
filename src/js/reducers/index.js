import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import ProjectReducer from './ProjectReducer'
import MessageCenterReducer from './MessageCenterReducer'
import SidebarReducer from './SidebarReducer'
import ProgressBarReducer from './ProgressBarReducer'

const allReducers = combineReducers({
	auth: AuthReducer,
	projects: ProjectReducer,
	messageCenter: MessageCenterReducer,
	sidebar: SidebarReducer,
	progressBar: ProgressBarReducer
})

export default allReducers