import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, Typography, Drawer, List, ListItem, Divider, ListItemText, ListItemIcon, Grid, Paper, FormControl, InputLabel, Input, Button, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@material-ui/core'
import { MuiPickersUtilsProvider, InlineDatePicker } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'
import 'moment/locale/cs'
import Moment from 'moment'
import { Link } from 'react-router-dom'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ComputerIcon from '@material-ui/icons/Computer'
import LockIcon from '@material-ui/icons/Lock'
import PropTypes from 'prop-types'

import {
	toggleSidebar,
	loadUserProjects,
	createProject,
	loadProjectDetail,
	createTimesheet,
	clearProject,
	deleteTimesheet
} from '../actions/actions'

import ResultMessage from '../components/ResultMessage/ResultMessage'
import TimesheetMenu from '../components/Timesheet/TimesheetMenu'

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
	},
	paperTable: {
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2
	},
	vCenter: {
		display: 'flex',
		alignItems: 'center',
	},
	projectIcon: {
		marginRight: theme.spacing.unit,
	},
	projectFinished: {
		color: '#eee',
	}
})

class DashboardContainer extends React.Component {

	constructor(props) {
		super(props)

		this.initialTimesheetState = {
			date: new Date(),
			hours: '',
			note: ''
		}

		this.state = {
			showAddForm: false,
			project: {
				title: '',
			},
			timesheetDialogOpened: false,
			timesheet: this.initialTimesheetState,
		}

		if (props.location.pathname === '/dashboard/new') {
			this.state = Object.assign({}, this.state, {
				showAddForm: true
			})
		}

		if (!props.sidebarOpened) {
			props.toggleSidebar()
		}

		this.hoursInput = React.createRef()
	}

	componentDidMount() {
		if (!this.props.projects.length) {
			this.props.loadUserProjects(this.props.user.id) // načti projekty, ke kterým je přiřazen přihlášený uživatel
		}

		const projectId = this.props.match.params.projectId
		if (projectId) {
			this.props.loadProjectDetail(projectId)
		}
	}

	componentDidUpdate() {
		if (this.props.projectCreated && this.props.projectId) {
			this.props.history.push(`/dashboard/${this.props.projectId}`)
		}
	}

	componentWillUnmount() {
		this.props.clearProject()
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

	handleOpenTimesheetDialog = () => {
		this.setState({ timesheetDialogOpened: true })
	}

	handleCloseTimesheetDialog = () => {
		this.setState({ timesheetDialogOpened: false })
	}

	handleTimesheetDialogInputChange = (event) => {
		if (event instanceof Moment) { // zpracuj datum
			this.setState({
				timesheet: {
					...this.state.timesheet,
					date: new Date(event)
				}
			})
		} else { // zpracuj ostatní inputy
			this.setState({
				timesheet: {
					...this.state.timesheet,
					[event.target.id]: event.target.value
				}
			})
		}
	}

	handleSubmitTimesheet = (event) => {
		event.preventDefault()
		let { timesheet } = this.state

		// validace inputu pro zadání počtu vykázaných hodin
		if (timesheet.hours.trim() !== '' && parseFloat(timesheet.hours) > 0) {
			timesheet = Object.assign({}, timesheet, {
				date: Moment(timesheet.date).format('YYYY-MM-DD'),
				hours: parseFloat(timesheet.hours),
				userId: this.props.user.id,
				projectId: this.props.project.id,
				note: timesheet.note.trim() !== '' ? timesheet.note : null
			})

			const created = this.props.createTimesheet(timesheet)
			created.then(result => {
				// pokud byl timesheet úspěšně vytvořen, tak zavři dialog a vyresetuj formulář (state)
				if (result && result.statusText.toLowerCase() === 'ok') {
					this.setState({
						timesheetDialogOpened: false,
						timesheet: this.initialTimesheetState,
					})
				}
			})
		} else {
			this.hoursInput.current.focus()
		}
	}

	handleEditTimesheet = (id) => {
		console.log(id)
	}

	handleDeleteTimesheet = (id) => {
		this.props.deleteTimesheet(id)
	}

	render() {
		const { classes, sidebarOpened, projects, project, user } = this.props

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
						<ListItem button component={Link} to="/dashboard/new">
							<ListItemIcon className={classes.sideBarIcon}><AddCircleIcon /></ListItemIcon>
							<ListItemText primary="Přidat projekt" />
						</ListItem>
						<Divider />
						{projects.map((project) => (
							<ListItem button key={project.id} component={Link} to={`/dashboard/${project.id}`}>
								<ListItemText primary={
									<Typography variant="subtitle1" color={project.finished ? 'textSecondary' : 'default' } className={classes.vCenter}>
										{project.finished &&
											<LockIcon fontSize="small" className={classes.projectIcon} />
										}
										<span>{project.title}</span>
									</Typography>
								} />
							</ListItem>
						))}
					</List>
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

						<Fragment>
							{project ? (
								<Fragment>
									<Typography component="h1" variant="h4" className={classes.vCenter} gutterBottom>
										<ComputerIcon fontSize="large" className={classes.projectIcon} />
										<span>{project.title ? project.title : 'N/A'}</span>
									</Typography>
									<Typography variant="subtitle2" color="textSecondary" gutterBottom>Projekt založen <strong>{project.created}</strong> uživatelem <strong>{project.createdBy ? project.createdBy : 'N/A'}</strong>.</Typography>
									{project.finished &&
										<ResultMessage
											variant="warning"
											message="Na projekt již není možné vykazovat."
										/>
									}
									<Paper className={classes.paperTable}>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell>Datum</TableCell>
													<TableCell>Uživatel</TableCell>
													<TableCell>Poznámka</TableCell>
													<TableCell align="right">Počet hodin</TableCell>
													<TableCell></TableCell>
												</TableRow>
											</TableHead>
											<TableFooter>
												<TableRow hover>
													<TableCell colSpan={3} component="th" scope="col">Celkem vykázáno:</TableCell>
													<TableCell align="right">
														<Typography variant="h6">{project.totalHours} h</Typography>
													</TableCell>
													<TableCell></TableCell>
												</TableRow>
											</TableFooter>
											<TableBody>
												{project.timesheets && project.timesheets.map(timesheet => <TableRow key={timesheet.id} hover>
													<TableCell>{timesheet.date}</TableCell>
													<TableCell>{timesheet.worker}</TableCell>
													<TableCell>{timesheet.note}</TableCell>
													<TableCell align="right">{timesheet.hours} h</TableCell>
													<TableCell align="right">
														<TimesheetMenu id={timesheet.id}>
															<MenuItem onClick={() => {this.handleEditTimesheet(timesheet.id)}}>Editovat</MenuItem>
															<MenuItem onClick={() => {this.handleDeleteTimesheet(timesheet.id)}}>Smazat</MenuItem>
														</TimesheetMenu>
													</TableCell>
												</TableRow>)}
											</TableBody>
										</Table>
									</Paper>
									{project.finished ?
										<Typography variant="subtitle2" color="textSecondary" className={classes.vCenter} gutterBottom>
											<LockIcon fontSize="small" className={classes.projectIcon} />
											<span>Projekt uzavřen uživatelem <strong>{project.finishedBy ? project.finishedBy : 'N/A'}</strong>.</span>
										</Typography>
										: <Fragment>
											<Button
												type="button"
												variant="outlined"
												onClick={this.handleOpenTimesheetDialog}
											>Vykázat práci</Button>
											<Dialog open={this.state.timesheetDialogOpened} maxWidth="xs" fullWidth onEscapeKeyDown={this.handleCloseTimesheetDialog} aria-labelledby="form-dialog-title">
												<form method="post" onSubmit={this.handleSubmitTimesheet}>
													<DialogTitle id="form-dialog-title">Vykázání práce</DialogTitle>
													<DialogContent>
														<TextField
															margin="normal"
															id="fullName"
															label="Uživatel"
															type="text"
															defaultValue={`${user.firstName} ${user.lastName}`}
															InputProps={{
																readOnly: true,
															}}
															fullWidth
														/>
														<TextField
															margin="normal"
															id="projectTitle"
															label="Projekt"
															type="text"
															defaultValue={project.title}
															InputProps={{
																readOnly: true,
															}}
															fullWidth
														/>
														<MuiPickersUtilsProvider utils={MomentUtils}>
															<InlineDatePicker
																margin="normal"
																id="date"
																label="Datum"
																format="DD.MM.YYYY"
																value={this.state.timesheet.date}
																autoOk
																fullWidth
																required
																onChange={this.handleTimesheetDialogInputChange}
															/>
														</MuiPickersUtilsProvider>
														<TextField
															autoFocus
															margin="normal"
															id="hours"
															label="Počet hodin"
															type="number"
															value={this.state.timesheet.hours}
															inputRef={this.hoursInput}
															fullWidth
															required
															onChange={this.handleTimesheetDialogInputChange}
														/>
														<TextField
															margin="normal"
															id="note"
															label="Poznámka"
															type="text"
															value={this.state.timesheet.note}
															multiline
															rows={3}
															fullWidth
															onChange={this.handleTimesheetDialogInputChange}
														/>
													</DialogContent>
													<DialogActions>
														<Button
															type="submit"
															variant="contained"
															color="primary"
															disabled={this.props.isLoading}
														>Vykázat</Button>
														<Button
															type="button"
															variant="text"
															onClick={this.handleCloseTimesheetDialog}
														>Zavřít</Button>
													</DialogActions>
												</form>
											</Dialog>
										</Fragment>
									}
								</Fragment>
							) : (
								<Typography variant="h5">Začněte vybráním projektu vlevo nebo přidejte nový.</Typography>
							)}
						</Fragment>
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
		projects: state.projects.projects,
		isLoading: state.progressBar.isVisible || state.auth.isFetching,
		projectCreated: state.projects.created,
		projectId: state.projects.id,
		project: state.projects.project,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		toggleSidebar: () => dispatch(toggleSidebar()),
		loadUserProjects: (userId) => dispatch(loadUserProjects(userId)),
		createProject: (project) => dispatch(createProject(project)),
		loadProjectDetail: (projectId) => dispatch(loadProjectDetail(projectId)),
		createTimesheet: (timesheet) => dispatch(createTimesheet(timesheet)),
		clearProject: () => dispatch(clearProject()),
		deleteTimesheet: (id) => dispatch(deleteTimesheet(id)),
	}
}

DashboardContainer.propTypes = {
	isAuthenticated: PropTypes.bool,
	history: PropTypes.object,
	classes: PropTypes.object,
	sidebarOpened: PropTypes.bool,
	toggleSidebar: PropTypes.func,
	loadUserProjects: PropTypes.func,
	user: PropTypes.object,
	projects: PropTypes.array,
	location: PropTypes.object,
	isLoading: PropTypes.bool,
	createProject: PropTypes.func,
	projectCreated: PropTypes.bool,
	projectId: PropTypes.number,
	match: PropTypes.object,
	loadProjectDetail: PropTypes.func,
	project: PropTypes.object,
	createTimesheet: PropTypes.func,
	clearProject: PropTypes.func,
	deleteTimesheet: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardContainer))