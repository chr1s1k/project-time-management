import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { closeMessage } from '../actions/actions'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

class MessageContainer extends React.Component {

	handleCloseMessage = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		this.props.closeMessage()
	}

	render() {
		return (
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				open={this.props.open}
				ContentProps={{
					'aria-describedby': 'resultMessage',
				}}
				message={<span id="resultMessage">{this.props.message}</span>}
				onClose={this.handleCloseMessage}
				autoHideDuration={5000}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={this.handleCloseMessage}
					>
						<CloseIcon />
					</IconButton>
				]}
			/>
		)
	}

}

MessageContainer.propTypes = {
	open: PropTypes.bool,
	message: PropTypes.string,
	closeMessage: PropTypes.func,
}

const mapStateToProps = (state) => ({
	open: state.messageCenter.open,
	message: state.messageCenter.message,
})

const mapDispatchToProps = (dispatch) => ({
	closeMessage: () => dispatch(closeMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer)