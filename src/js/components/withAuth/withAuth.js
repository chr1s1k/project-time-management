import React from 'react'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
// import jwtDecode from 'jwt-decode'

import { loginSuccess, showMessage } from '../../actions/actions'

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
		}

		constructor() {
			super()
		}

		componentDidMount() {
			const token = Cookies.get('token')

			if (token) {
				this.props.loginSuccess(token)
			} else {
				this.checkAuth()
			}
		}

		componentDidUpdate() {
			this.checkAuth()
		}

		checkAuth() {
			// token neexistuje nebo je nevalidní => přesměruj na login
			if (!this.props.isAuthenticated && !this.props.tokenExists) {
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
	})

	const mapDispatchToProps = (dispatch) => ({
		loginSuccess: (token) => dispatch(loginSuccess(token)),
		showMessage: (message) => dispatch(showMessage(message)),
	})

	return connect(mapStateToProps, mapDispatchToProps)(Authenticate)

}