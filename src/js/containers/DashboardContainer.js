import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, Typography, Drawer, List, ListItem, Divider, ListItemText, ListItemIcon, Grid, Paper, FormControl, InputLabel, Input, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import PropTypes from 'prop-types'

import { toggleSidebar, closeSidebar, loadUserProjects, createProject } from '../actions/actions'

const sidebarWidth = 240

const styles = (theme) => ({
	sidebar: {
		width: `${sidebarWidth}px`
	},
	sidebarPaper: {
		width: `${sidebarWidth}px`
	},
	content: {
		paddingLeft: theme.spacing.unit * 3,
		paddingRight: theme.spacing.unit * 3,
		transition: theme.transitions.create(['margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		})
	},
	contentShrinked: {
		marginLeft: `${sidebarWidth}px`
	},
	sideBarIcon: {
		marginRight: 0
	},
	paper: {
		padding: theme.spacing.unit * 2
	},
	formHeading: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit
	},
	submitBtn: {
		marginTop: theme.spacing.unit * 2
	}
})

class DashboardContainer extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			showAddForm: false,
			project: {
				title: ''
			}
		}

		if (props.location.pathname === '/dashboard/new') {
			this.state = Object.assign({}, this.state, {
				showAddForm: true
			})
		}

		props.toggleSidebar()
	}

	componentDidMount() {
		this.props.loadUserProjects(this.props.user.id) // načti projekty, ke kterým je přihlášený uživatel přiřazen
	}

	componentWillUnmount() {
		this.props.closeSidebar()
	}

	handleChangeNewProject = (event) => {
		this.setState({
			project: {
				title: event.target.value
			}
		})
	}

	handleSubmitAddForm = (event) => {
		event.preventDefault()

		const { project } = this.state

		if (project.title.trim() !== '') {
			this.props.createProject(project)
		}
	}

	render() {
		const { classes, sidebarOpened, projects } = this.props

		return (
			<Fragment>
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
							<ListItem button key={project.id} component={Link} to={`/dashboard/${project.id}`}>
								<ListItemText primary={project.title} />
							</ListItem>
						))}
					</List>
					<Divider />
					<ListItem button component={Link} to="/dashboard/new">
						<ListItemIcon className={classes.sideBarIcon}><AddCircleIcon /></ListItemIcon>
						<ListItemText primary="Přidat projekt" />
					</ListItem>
				</Drawer>
				<main className={sidebarOpened ? `${classes.content} ${classes.contentShrinked}` : classes.content}>
					{this.state.showAddForm ? (
						<Grid container>
							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<Typography component="h1" variant="h5" className={classes.formHeading}>Přidání nového projektu</Typography>
									<form method="post">
										<FormControl margin="normal" fullWidth required>
											<InputLabel htmlFor="projectTitle">Název projektu</InputLabel>
											<Input
												name="title"
												id="title"
												autoComplete="title"
												autoFocus
												value={this.state.project.title}
												onChange={this.handleChangeNewProject} />
										</FormControl>

										<Button
											type="submit"
											variant="contained"
											color="primary"
											disabled={this.props.isLoading}
											className={classes.submitBtn}
											onClick={this.handleSubmitAddForm}
										>Přidat</Button>
									</form>
								</Paper>
							</Grid>
						</Grid>
					) : (
						<Typography variant="h5">Začněte vybráním projektu vlevo nebo přidejte nový.</Typography>
					)}
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
		isLoading: state.progressBar.isVisible,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		toggleSidebar: () => dispatch(toggleSidebar()),
		closeSidebar: () => dispatch(closeSidebar()),
		loadUserProjects: (userId) => dispatch(loadUserProjects(userId)),
		createProject: (project) => dispatch(createProject(project)),
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
	location: PropTypes.object,
	isLoading: PropTypes.bool,
	createProject: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardContainer))