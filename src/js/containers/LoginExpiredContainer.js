import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'

import { logoutUser } from '../actions/actions'

class LoginExpiredContainer extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		const { tokenExpired } = this.props

		return (
			<Fragment>
				<Dialog open={tokenExpired} maxWidth="sm" fullWidth aria-labelledby="login-expired-title">
					<DialogTitle id="login-expired-title">Přihlášení vypršelo</DialogTitle>
					<DialogContent>
						<DialogContentText>Akci se nepodařilo dokončit, jelikož vaše přihlášení vypršelo. Nyní budete přesměrováni na přihlašovací stránku, kde se budete moct znovu přihlásit.</DialogContentText>
						<DialogActions>
							<Button
								type="button"
								variant="contained"
								color="primary"
								onClick={this.props.logoutUser}
							>Rozumím</Button>
						</DialogActions>
					</DialogContent>
				</Dialog>
			</Fragment>
		)
	}

}

LoginExpiredContainer.propTypes = {
	tokenExpired: PropTypes.bool,
	logoutUser: PropTypes.func,
}

const mapStateToProps = (state) => ({
	tokenExpired: state.auth.tokenExpired,
})

const mapDispatchToProps = (dispatch) => ({
	logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginExpiredContainer)