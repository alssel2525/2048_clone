const Tile = (position, val) => {
	Tile.x = position.x
	Tile.y = position.y
	Tile.value = val || 2
	
	Tile.savePosition = () => {
		Tile.previousPosition = {
			x: Tile.x,
			y: Tile.y
		}
	}
	
	Tile.updatePosition = (position) => {
		setX(position.x)
		setY(position.y)
	}
	
	Tile.serialize = () => {
		return {
			position: {
				x: x,
				y: y
			},
			value: value
		}
	}
}

export default Tile
