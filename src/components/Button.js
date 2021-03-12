import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
	return (
		<button
			onClick={onClick}
			style={{ backgroundColor: color }}
			className='btn'
		>
			{text}
		</button>
	)
}

Button.defaultProps = {
	color: 'steelblue',
}

Button.propTypes = {
	color: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func,
}

export default Button
