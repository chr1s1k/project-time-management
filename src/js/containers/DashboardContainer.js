import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, Typography, Grid, Drawer, List, ListItem, Divider, ListItemText } from '@material-ui/core'
import PropTypes from 'prop-types'

import { toggleSidebar, closeSidebar, loadUserProjects } from '../actions/actions'

const sidebarWidth = 240

const styles = (theme) => ({
	sidebar: {
		width: `${sidebarWidth}px`
	},
	sidebarPaper: {
		width: `${sidebarWidth}px`
	},
	content: {
		transition: theme.transitions.create(['margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		})
	},
	contentShrinked: {
		marginLeft: `${sidebarWidth}px`
	}
})

class DashboardContainer extends React.Component {

	constructor(props) {
		super(props)

		props.toggleSidebar()
	}

	componentDidMount() {
		this.props.loadUserProjects(this.props.user.id)
	}

	componentWillUnmount() {
		this.props.closeSidebar()
	}

	render() {
		const { classes, sidebarOpened, projects } = this.props

		return (
			<Fragment>
				{/* <Grid container justify="center">
					<Grid item xs={10}>
						<Typography variant="h1">Toto je dashboard pouze pro přihlášené uživatele!</Typography>
					</Grid>
				</Grid> */}
				<Drawer
					className={classes.sidebar}
					variant="persistent"
					anchor="left"
					open={sidebarOpened}
					classes={{ paper: classes.sidebarPaper }}
				>
					<ListItem>
						<ListItemText>
							<Typography variant="h6">Moje projekty</Typography>
						</ListItemText>
					</ListItem>
					<List>
						{projects.map((project) => (
							<ListItem button key={project.id}>
								<ListItemText primary={project.title} />
							</ListItem>
						))}
					</List>
					<Divider />
					<ListItem button>
						<ListItemText primary="Přidat projekt" />
					</ListItem>
				</Drawer>
				<main className={sidebarOpened ? `${classes.content} ${classes.contentShrinked}` : classes.content}>
					<Typography variant="h1">Toto je dashboard pouze pro přihlášené uživatele!</Typography>
				</main>
			</Fragment>
		)
	}

}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		sidebarOpened: state.sidebar.opened,
		user: state.auth.user,
		projects: state.projects,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		toggleSidebar: () => dispatch(toggleSidebar()),
		closeSidebar: () => dispatch(closeSidebar()),
		loadUserProjects: (userId) => dispatch(loadUserProjects(userId)),
	}
}

DashboardContainer.propTypes = {
	isAuthenticated: PropTypes.bool,
	history: PropTypes.object,
	classes: PropTypes.object,
	sidebarOpened: PropTypes.bool,
	toggleSidebar: PropTypes.func,
	closeSidebar: PropTypes.func,
	loadUserProjects: PropTypes.func,
	user: PropTypes.object,
	projects: PropTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardContainer))