import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Paper, Typography, Grid, withStyles, FormControl, InputLabel, Input, Button } from '@material-ui/core/'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PropTypes from 'prop-types'

import { loginUser } from '../actions/actions'

const styles = (theme) => ({
	paper: {
		padding: theme.spacing.unit * 2
	},
	heading: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit
	},
	submitBtn: {
		marginTop: theme.spacing.unit * 2
	}
})

class LoginContainer extends React.Component {
	constructor() {
		super()

		this.state = {
			username: '',
			password: ''
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()

		if (this.state.username.trim() !== '' && this.state.password.trim() !== '') {
			const credentials = Object.assign({}, this.state) // vytvoříme si kopii objektu this.state

			this.props.loginUser(credentials)
		}
	}

	render() {
		const {
			classes
		} = this.props

		if (this.props.isAuthenticated || this.props.tokenExists) {
			return (
				<Redirect to='/dashboard' />
			)
		}

		return (
			<Fragment>

				<Grid container justify="center">
					<Grid item xs={10} sm={8} md={6} lg={4} xl={2}>
						<Paper className={classes.paper}>
							<Grid container justify="center">
								<AccountCircleIcon fontSize="large" />
							</Grid>
							<Typography component="h1" variant="h5" align="center" className={classes.heading}>Přihlášení</Typography>
							<form method="post">
								<FormControl margin="normal" fullWidth required>
									<InputLabel htmlFor="username">Uživatelské jméno</InputLabel>
									<Input
										name="username"
										id="username"
										autoComplete="username"
										autoFocus
										value={this.state.username}
										onChange={this.handleChange} />
								</FormControl>

								<FormControl margin="normal" fullWidth required>
									<InputLabel htmlFor="password">Heslo</InputLabel>
									<Input
										name="password"
										id="password"
										type="password"
										value={this.state.password}
										onChange={this.handleChange} />
								</FormControl>

								<Button
									type="submit"
									variant="contained"
									color="primary"
									disabled={this.props.isFetching}
									fullWidth
									className={classes.submitBtn}
									onClick={this.handleSubmit}
								>Přihlásit</Button>
							</form>
						</Paper>
					</Grid>
				</Grid>
			</Fragment>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		loginUser: (credentials) => dispatch(loginUser(credentials))
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		isFetching: state.auth.isFetching,
		tokenExists: state.auth.tokenExists,
	}
}

LoginContainer.propTypes = {
	classes: PropTypes.object,
	loginUser: PropTypes.func,
	isAuthenticated: PropTypes.bool,
	tokenExists: PropTypes.bool,
	isFetching: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginContainer))