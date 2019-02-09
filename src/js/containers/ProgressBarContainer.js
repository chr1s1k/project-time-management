import React from 'react'
import { LinearProgress, withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const styles = (theme) => ({
	default: {
		marginBottom: theme.spacing.unit * 5,
		visibility: 'hidden'
	},
	visible: {
		visibility: 'visible'
	},
	progressBar: {
		backgroundColor: '#999'
	},
})

function ProgressBarContainer(props) {
	const { classes, isVisible } = props

	return (
		<LinearProgress
			color="primary"
			classes={{
				root: classes.default,
				bar1Indeterminate: classes.progressBar,
				bar2Indeterminate: classes.progressBar,
			}}
			className={isVisible ? classes.visible : ''} />
	)
}

const mapStateToProps = (state) => ({
	isVisible: state.auth.isFetching,
})

ProgressBarContainer.propTypes = {
	classes: PropTypes.object,
	isVisible: PropTypes.bool,
}

export default connect(mapStateToProps, null)(withStyles(styles)(ProgressBarContainer))