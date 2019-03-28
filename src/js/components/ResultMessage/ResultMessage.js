import React from 'react'
import PropTypes from 'prop-types'
import { SnackbarContent, withStyles } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import amber from '@material-ui/core/colors/amber'
import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
}

const styles = (theme) => {
	return {
		default: {
			marginTop: theme.spacing.unit * 3,
			marginBottom: theme.spacing.unit * 3,
			maxWidth: '100%',
		},
		messageContent: {
			display: 'flex',
			alignItems: 'center',
		},
		icon: {
			marginRight: theme.spacing.unit,
		},
		error: {
			backgroundColor: theme.palette.error.dark,
		},
		info: {
			backgroundColor: blue[400],
		},
		warning: {
			backgroundColor: amber[700],
		},
		success: {
			backgroundColor: green[600],
		},
	}
}

function ResultMessage (props) {
	const { variant, message, classes, ...other } = props
	const Icon = variantIcon[variant] // definice ikony
	const variantClass = classes[variant] // třída, která definuje barvu pozadí hlášky

	return (
		<SnackbarContent
			classes={{
				root: classes.default
			}}
			className={variantClass}
			message={
				<span className={classes.messageContent}>
					<Icon className={classes.icon} />
					{message}
				</span>
			}
			{...other}
		/>
	)
}

ResultMessage.propTypes = {
	variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
	message: PropTypes.string.isRequired,
	classes: PropTypes.object,
}

export default withStyles(styles)(ResultMessage)