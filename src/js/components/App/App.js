import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import SignInContainer from '../../containers/SignInContainer'
import DashboardContainer from '../../containers/DashboardContainer'

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
			<Switch>
				<Route path="/dashboard" component={DashboardContainer}></Route>
				<Route path="/" component={SignInContainer}></Route>
			</Switch>
		</MuiThemeProvider>
	)
}

export default App