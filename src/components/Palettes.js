import Palette from './Palette'

const Palettes = ({ palettes, onDelete }) => {
	if (palettes === undefined) {
		palettes = []
	}
	
	
	const view = palettes.map((palette) => (
		<Palette key={palette.id} palette={palette} onDelete={onDelete} />
	))

	return (
		<div>
			{palettes.length > 0 ? view : 'No palettes'}			
		</div>
	)
}

export default Palettes
