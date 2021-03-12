// Grid of colors
const Colors = ({ colors, onRemove }) => {
	if (colors === undefined) {
		colors = []
	}
	
	return (
		<div className='basic-grid'>
			{colors.map((color, index) => (
				<div 
					className='color-square' 
					key={index} 
					style={{backgroundColor: color}}
					onClick={() => onRemove(color)}
				>
				</div>
			))}
		</div>
	)
}

export default Colors
