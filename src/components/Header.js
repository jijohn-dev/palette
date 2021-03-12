import PropTypes from 'prop-types'
import Button from './Button'

import { FaPalette } from 'react-icons/fa'

const Header = ({ title, onAdd, showAdd }) => {
	return (
		<header className='header'>
			<h1>{title} <FaPalette /></h1>
			<Button 
				color={showAdd ? 'red' : 'steelblue'} 
				text={showAdd ? 'Cancel' : 'New Palette'}
				onClick={onAdd}
				className='btn'   
			/>
		</header>
	)
}

Header.defaultProps = {
	title: 'Palette',
}

Header.propTypes = {
	title: PropTypes.string,
}

export default Header
