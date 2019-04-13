import React from 'react'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

import { loginSuccess, showMessage, loginExpired } from '../../actions/actions'

export default function (ComponentRequiredAuth) {

	class Authenticate extends React.Component {

		static propTypes = {
			isAuthenticated: PropTypes.bool,
			isFetching: PropTypes.bool,
			history: PropTypes.object,
			tokenExists: PropTypes.bool,
			loginSuccess: PropTypes.func,
			showMessage: PropTypes.func,
			messageShown: PropTypes.bool,
			tokenExpired: PropTypes.bool,
			loginExpired: PropTypes.func,
		}

		constructor() {
			super()
		}

		componentDidMount() {
			const token = Cookies.get('token')

			if (token) {
				try {
					jwtDecode(token)
					this.props.loginSuccess(token)
				} catch (err) { // pokud je token nevalidní, tak donuť uživatele znovu přihlásit se
					this.props.loginExpired()
				}
			} else {
				this.checkAuth()
			}
		}

		componentDidUpdate() {
			this.checkAuth()
		}

		checkAuth() {
			// token neexistuje nebo je nevalidní => přesměruj na login
			if (!this.props.isAuthenticated && !this.props.tokenExists && !this.props.tokenExpired) {
				this.props.history.push('/')
				if (!this.props.messageShown) {
					this.props.showMessage('Přístup zamítnut. Je potřeba být přihlášen.')
				}
			}
		}

		render() {
			// nic nevykresluj, pokud nemám odpověď ze serveru
			if (!this.props.isAuthenticated) {
				return null
			}

			// token byl úspěšně ověřen => vykresli "chráněnou" komponentu
			return (
				<ComponentRequiredAuth {...this.props} />
			)
		}
	}

	const mapStateToProps = (state) => ({
		isAuthenticated: state.auth.isAuthenticated,
		tokenExists: state.auth.tokenExists,
		messageShown: state.messageCenter.open,
		tokenExpired: state.auth.tokenExpired,
	})

	const mapDispatchToProps = (dispatch) => ({
		loginSuccess: (token) => dispatch(loginSuccess(token)),
		showMessage: (message) => dispatch(showMessage(message)),
		loginExpired: () => dispatch(loginExpired()),
	})

	return connect(mapStateToProps, mapDispatchToProps)(Authenticate)

}