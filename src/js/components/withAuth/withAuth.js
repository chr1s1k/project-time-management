import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'

import { validateToken } from '../../actions/actions'

export default function (ComponentRequiredAuth) {

	class Authenticate extends React.Component {

		static propTypes = {
			isAuthenticated: PropTypes.bool,
			isFetching: PropTypes.bool,
			validateToken: PropTypes.func,
		}

		constructor() {
			super()

			this.state = {
				isValidatingToken: true
			}
		}

		componentDidMount() {
			const token = Cookies.get('jwt')

			this.props.validateToken(token)
		}

		componentDidUpdate() {
			if (!this.props.isFetching && this.state.isValidatingToken) {
				this.setState({
					isValidatingToken: false
				})
				// pokud neni validni token, tak ho znic
				if (!this.props.isAuthenticated) {
					Cookies.remove('jwt')
				}
			}
		}

		render() {
			const { isAuthenticated } = this.props

			// nic nevykresluj, pokud nemám odpověď ze serveru
			if (this.state.isValidatingToken) {
				return null
			}

			// token neexistuje nebo je nevalidní => přesměruj na login
			if (!isAuthenticated) {
				return <Redirect to="/" />
			}

			// token byl úspěšně ověřen => vykresli "chráněnou" komponentu
			return (
				<ComponentRequiredAuth {...this.props} />
			)
		}
	}

	const mapStateToProps = (state) => ({
		isAuthenticated: state.auth.isAuthenticated,
		isFetching: state.auth.isFetching,
	})

	const mapDispatchToProps = (dispatch) => ({
		validateToken: (token) => dispatch(validateToken(token))
	})

	return connect(mapStateToProps, mapDispatchToProps)(Authenticate)

}