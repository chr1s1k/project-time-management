import React from 'react'
import { LinearProgress, withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const sidebarWidth = 240

const styles = (theme) => ({
	default: {
		display: 'none',
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		zIndex: 10000,
		backgroundColor: theme.palette.primary.main
	},
	visible: {
		display: 'block'
	},
	progressBar: {
		backgroundColor: '#000'
	},
	indentLeft: {
		left: `${sidebarWidth}px`
	}
})

function ProgressBarContainer(props) {
	const { classes, isVisible, sidebarOpened } = props

	return (
		<LinearProgress
			classes={{
				root: classes.default,
				bar1Indeterminate: classes.progressBar,
				bar2Indeterminate: classes.progressBar,
			}}
			className={isVisible ? 
				(sidebarOpened ? `${classes.indentLeft} ${classes.visible}` : classes.visible) 
				: 
				(sidebarOpened ? classes.indentLeft : '')} />
	)
}

const mapStateToProps = (state) => ({
	isVisible: state.auth.isFetching || state.progressBar.isVisible,
	sidebarOpened: state.sidebar.opened,
})

ProgressBarContainer.propTypes = {
	classes: PropTypes.object,
	isVisible: PropTypes.bool,
	sidebarOpened: PropTypes.bool,
}

export default connect(mapStateToProps, null)(withStyles(styles)(ProgressBarContainer))