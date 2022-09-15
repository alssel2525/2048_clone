class Tile {
	constructor(position, val) {
		this.x = position.x
		this.y = position.y
		this.value = val || 2
	}
	
	savePosition = () => {
		this.previousPosition = {
			x: this.x,
			y: this.y
		}
	}
	
	updatePosition = (position) => {
		this.x = position.x
		this.y = position.y
	}
	
	serialize = () => {
		return {
			position: {
				x: this.x,
				y: this.y
			},
			value: this.value
		}
	}
}

export default Tile
