import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import requiredAuth from '../withAuth'
import LoginContainer from '../../containers/LoginContainer'
import DashboardContainer from '../../containers/DashboardContainer'
import NavBarContainer from '../../containers/NavBarContainer'
import MessageContainer from '../../containers/MessageContainer'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#ffa800',
			contrastText: '#fff'
		}
	},
	typography: {
		useNextVariants: true
	}
})

const App = () => {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<NavBarContainer />
			<MessageContainer />
			<Switch>
				<Route exact path="/" component={LoginContainer} />
				<Route path="/dashboard" component={requiredAuth(DashboardContainer)} />
			</Switch>
		</MuiThemeProvider>
	)
}

export default App