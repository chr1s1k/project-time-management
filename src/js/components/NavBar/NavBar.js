import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/'
import PropTypes from 'prop-types'

const styles = (theme) => ({
	root: {
		marginBottom: theme.spacing.unit * 4
	}
})

const NavBar = ({
	classes
}) => {
	return (
		<AppBar position="static" classes={{ root: classes.root }}>
			<Toolbar>
				<Typography variant="h6" color="textPrimary">Stopky na měření práce</Typography>
			</Toolbar>
		</AppBar>
	)
}

NavBar.propTypes = {
	classes: PropTypes.object
}

export default withStyles(styles)(NavBar)