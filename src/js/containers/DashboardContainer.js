import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import NavBar from '../components/NavBar'

class DashboardContainer extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<Fragment>
				<NavBar />
				<Typography variant="h1">Toto je dashboard pouze pro přihlášené uživatele!</Typography>
			</Fragment>
		)
	}
}

export default DashboardContainer