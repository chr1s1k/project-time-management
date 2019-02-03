import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

class DashboardContainer extends React.Component {

	render() {
		return (
			<Fragment>
				<Typography variant="h1">Toto je dashboard pouze pro přihlášené uživatele!</Typography>
			</Fragment>
		)
	}

}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.isAuthenticated
	}
}

DashboardContainer.propTypes = {
	isAuthenticated: PropTypes.bool,
	history: PropTypes.object,
}

export default connect(mapStateToProps)(DashboardContainer)