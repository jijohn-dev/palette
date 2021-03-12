import Button from './Button'
import Colors from './Colors'
import { useState } from 'react'
import { ChromePicker } from 'react-color'

const AddPalette = ({ curName, onAdd }) => {
	const [name, setName] = useState(curName)
	const [currentColor, setCurrentColor] = useState('')
	const [colors, setColors] = useState([])

	const handleChange = (color) => {		
		setCurrentColor(color)
	}

	const onAddColor = () => {
		console.log(currentColor.hex)
		setColors([...colors, currentColor.hex])
		console.log(colors)
	}

	const onSubmit = (e) => {
		e.preventDefault()

		if (!name) {
			alert('Please include a name')
			return
		}

		onAdd({ name, colors })

		setName('')
		setColors([])
	}

	return (	
		<div>
			<Colors colors={colors} />
			<ChromePicker color={currentColor} onChange={handleChange} />
			<Button color='steelblue' text={'Add Color'} onClick={onAddColor} />
			<form className='add-form' onSubmit={onSubmit}>
				<div className='form-control'>
					<label>Name</label>
					<input type='text' placeholder='New Palette' value={curName} onChange={(e) => setName(e.target.value)} />
				</div>

				<input type='submit' value='Save Palette' className='btn btn-block'/>
			</form>	
		</div>		
	)
}

export default AddPalette
