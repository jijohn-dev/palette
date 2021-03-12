import Colors from './Colors'
import Button from './Button'
import { FaTimes, FaPen } from 'react-icons/fa'

import { useState } from 'react'

import { editPalette } from '../firebase/firebase'
import AddPalette from './AddPalette'

const Palette = ({ palette, onDelete }) => {
	const [showHex, setShowHex] = useState(false) 
	const [editMode, setEditMode] = useState(false)
	const [colors, setColors] = useState(palette.colors)

	function toggleEdit() {
		setEditMode(!editMode)
	}

	function remove(color) {
		if (editMode) {
			console.log('removing')
			console.log(colors)
			setColors(colors.filter((x) => x !== color))
		}
	}

	function onSave() {
		console.log('saving edits')
		editPalette(palette.id, colors)
		toggleEdit()		
	}

	return (
		<div className='palette'>
			<div className='palette-header'>
				<h3>
					{palette.name} 
					{editMode ? 
						<FaTimes style={{ color: 'steelblue' }} onClick={toggleEdit} /> : 
						<FaPen style={{ color: 'steelblue'}} onClick={toggleEdit} />
					}
					{editMode && <FaTimes style={{ color: 'red'}} onClick={() => {
						onDelete(palette.id)
						toggleEdit()
					}} />}
				</h3>
			</div>
			
			<Colors colors={colors} onRemove={remove} />		
			<div className='hex-grid'>
				{showHex && colors.map((color, index) => (
					<p key={index}>{color}</p>
				))}
			</div>	

			{editMode && <AddPalette curName={palette.name} onAdd={onSave} />}

			<Button text={showHex ? 'Hide' : 'Show hex values'} onClick={() => setShowHex(!showHex)} />			
		</div>
	)
}

Palette.defaultProps = {
	palette: []
}

export default Palette
