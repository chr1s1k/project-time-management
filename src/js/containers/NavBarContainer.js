import React from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles, IconButton, Menu, MenuItem } from '@material-ui/core/'
import AccountCircle from '@material-ui/icons/AccountCircle'
import PropTypes from 'prop-types'

import { logoutUser } from '../actions/actions'

const styles = (theme) => ({
	root: {
		marginBottom: theme.spacing.unit * 5
	},
	grow: {
		flexGrow: 1
	}
})

function NavBarContainer (props) {
	const { classes, isAuthenticated } = props

	// react hook
	const [anchorEl, setAnchorEl] = React.useState(null) // výchozí hodnota pro `anchorEl`
	const open = Boolean(anchorEl)

	function handleMenu(event) {
		setAnchorEl(event.currentTarget)
	}

	function handleClose() {
		setAnchorEl(null)
	}

	function handleLogout() {
		props.logoutUser()
	}

	return (
		<AppBar position="static" classes={{ root: classes.root }}>
			<Toolbar>
				<Typography variant="h6" color="textPrimary" classes={{ root: classes.grow }}>Project time management</Typography>
				{isAuthenticated && (
					<div>
						<IconButton
							aria-owns={open ? 'menu-appbar' : undefined}
							aria-haspopup="true"
							onClick={handleMenu}
							color="default"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Nastavení</MenuItem>
							<MenuItem onClick={handleLogout}>Odhlásit</MenuItem>
						</Menu>
					</div>
				)}
			</Toolbar>
		</AppBar>
	)
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
	logoutUser: () => dispatch(logoutUser())
})

NavBarContainer.propTypes = {
	classes: PropTypes.object,
	isAuthenticated: PropTypes.bool,
	logoutUser: PropTypes.func,
}

NavBarContainer.defaultProps = {
	isAuthenticated: false
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBarContainer))