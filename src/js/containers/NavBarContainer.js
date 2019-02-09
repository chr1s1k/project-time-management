import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles, IconButton, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import PropTypes from 'prop-types'

import { logoutUser, toggleSidebar } from '../actions/actions'

const sidebarWidth = 240

const styles = (theme) => ({
	grow: {
		flexGrow: 1
	},
	hidden: {
		display: 'none'
	},
	toolbar: theme.mixins.toolbar,
	appbar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		})
	},
	appbarShrinked: {
		width: `calc(100% - ${sidebarWidth}px)`,
		marginLeft: `${sidebarWidth}px`
	}
})

function NavBarContainer (props) {
	const { classes, isAuthenticated, sidebarOpened, menuIconVisible } = props

	// react hook
	const [anchorEl, setAnchorEl] = React.useState(null) // výchozí hodnota pro `anchorEl`
	const open = Boolean(anchorEl)

	function handleUserMenu(event) {
		setAnchorEl(event.currentTarget)
	}

	function handleCloseMenu() {
		setAnchorEl(null)
	}

	function handleLogout() {
		handleCloseMenu()
		props.logoutUser()
	}

	return (
		<Fragment>
			<AppBar position="fixed" className={sidebarOpened ? `${classes.appbarShrinked} ${classes.appbar}` : classes.appbar}>
				<Toolbar>
					<IconButton
						color="default"
						aria-label="Otevři / zavři sidebar"
						onClick={props.toggleSidebar}
						className={!menuIconVisible ? classes.hidden : ''}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="textPrimary" classes={{ root: classes.grow }}>Project time management</Typography>
					{isAuthenticated && (
						<div>
							<IconButton
								aria-owns={open ? 'menu-appbar' : undefined}
								aria-haspopup="true"
								onClick={handleUserMenu}
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
								onClose={handleCloseMenu}
							>
								<MenuItem onClick={handleCloseMenu}>Nastavení</MenuItem>
								<MenuItem onClick={handleLogout}>Odhlásit</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>

			{/* Div, který udělá odsazení pod fixním appbarem. */}
			<div className={`${classes.toolbar}`} />
		</Fragment>
	)
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	sidebarOpened: state.sidebar.opened,
	menuIconVisible: state.sidebar.menuIconVisible,
})

const mapDispatchToProps = (dispatch) => ({
	logoutUser: () => dispatch(logoutUser()),
	toggleSidebar: () => dispatch(toggleSidebar()),
})

NavBarContainer.propTypes = {
	classes: PropTypes.object,
	isAuthenticated: PropTypes.bool,
	logoutUser: PropTypes.func,
	toggleSidebar: PropTypes.func,
	sidebarOpened: PropTypes.bool,
	menuIconVisible: PropTypes.bool,
}

NavBarContainer.defaultProps = {
	isAuthenticated: false,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBarContainer))