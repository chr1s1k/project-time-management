import React, { Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles, FormControl, InputLabel, Input, Button } from '@material-ui/core/'
import PropTypes from 'prop-types'

import NavBar from '../components/NavBar'

const styles = (theme) => ({
	paper: {
		padding: theme.spacing.unit * 2
	},
	submitBtn: {
		marginTop: theme.spacing.unit * 2
	}
})

class LoginContainer extends React.Component {
	constructor() {
		super()
	}

	render() {
		const { classes } = this.props

		return (
			<Fragment>
				<NavBar />
				<Grid container justify="center">
					<Grid item xs={10} sm={8} md={6} lg={4} xl={2}>
						<Paper className={classes.paper}>
							<Typography component="h1" variant="h5" align="center">Přihlášení</Typography>
							<form method="post">
								<FormControl margin="normal" fullWidth required>
									<InputLabel htmlFor="username">Uživatelské jméno</InputLabel>
									<Input name="username" id="username" autoComplete="username" autoFocus />
								</FormControl>
								<FormControl margin="normal" fullWidth required>
									<InputLabel htmlFor="password">Heslo</InputLabel>
									<Input name="password" id="password" type="password" />
								</FormControl>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									fullWidth
									className={classes.submitBtn}
								>Přihlásit</Button>
							</form>
						</Paper>
					</Grid>
				</Grid>
			</Fragment>
		)
	}
}

LoginContainer.propTypes = {
	classes: PropTypes.object
}

export default withStyles(styles)(LoginContainer)