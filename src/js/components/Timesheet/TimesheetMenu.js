import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { IconButton, Menu, Tooltip } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'

function TimesheetMenu (props) {
	const { id, children, dialogOpened } = props

	// react hook
	const [menuAnchorEl, setMenuAnchorEl] = React.useState(null) // výchozí hodnota pro konstantu menuAnchorEl je null
	const menuOpen = Boolean(menuAnchorEl)

	function handleMenu(event) {
		setMenuAnchorEl(event.currentTarget)
	}

	function handleCloseMenu() {
		setMenuAnchorEl(null)
	}

	// https://reactjs.org/docs/hooks-effect.html
	// componentDidMount + componentDidUpdate dohromady
	useEffect(() => {
		if (dialogOpened) { // pokud je otevřen dialog pro smazání nebo editaci timesheetu, tak zavřeme popup menu s možnostmi
			handleCloseMenu()
		}
	})

	return (
		<div>
			<IconButton
				aria-owns={menuOpen ? `timesheet-menu-${id}` : undefined}
				aria-haspopup="true"
				onClick={handleMenu}
			>
				<Tooltip title="Možnosti" placement="top">
					<SettingsIcon />
				</Tooltip>
			</IconButton>
			<Menu
				id={`timesheet-menu-${id}`}
				anchorEl={menuAnchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={menuOpen}
				onClose={handleCloseMenu}
			>
				{children}
			</Menu>
		</div>
	)
}

TimesheetMenu.propTypes = {
	id: PropTypes.number,
	children: PropTypes.node,
	dialogOpened: PropTypes.bool,
}

export default TimesheetMenu