import Colors from './Colors'
import Button from './Button'
import { FaTimes, FaPen } from 'react-icons/fa'

import { useState } from 'react'

import { editPalette } from '../firebase/firebase'
import { ChromePicker } from 'react-color'

const Palette = ({ palette, onDelete }) => {
	const [showHex, setShowHex] = useState(false) 
	const [editMode, setEditMode] = useState(false)
	const [colors, setColors] = useState(palette.colors)
	const [currentColor, setCurrentColor] = useState('')	

	const toggleEdit = () => {
		setEditMode(!editMode)
	}

	const handleChange = (color) => {	
		document.body.style = `background: ${currentColor.hex}`		
		setCurrentColor(color)
	}

	const addColor = () => {		
		setColors([...colors, currentColor.hex])		
	}

	const remove = (color) => {
		if (editMode) {
			console.log('removing')
			console.log(colors)
			setColors(colors.filter((x) => x !== color))
		}
	}

	const onSave = () => {
		// add new colors to existing colors		
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
						<div>Delete <FaTimes style={{ color: 'red'}} onClick={() => {
							onDelete(palette.id)
							toggleEdit()
						}} /></div>
						:
						<div>Edit <FaPen style={{ color: 'steelblue'}} onClick={toggleEdit} /></div>						
					}
				</h3>
			</div>
			
			<Colors colors={colors} onRemove={remove} />		
			<div className='hex-grid'>
				{showHex && colors.map((color, index) => (
					<p key={index}>{color}</p>
				))}
			</div>	

			{editMode && 
				<div>					
					<ChromePicker color={currentColor} onChange={handleChange} />
					<Button text={'Add'} onClick={addColor} />
					<Button text={'Save'} onClick={onSave} />
				</div>
			}

			<Button text={showHex ? 'Hide' : 'Show hex values'} onClick={() => setShowHex(!showHex)} />			
		</div>
	)
}

Palette.defaultProps = {
	palette: []
}

export default Palette
