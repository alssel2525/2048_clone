import {useState} from "react";

class Tile {
	constructor(position, val) {
		this.x = position.x || 0
		this.y = position.y || 0
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

const TileComponent = (position, value) => {
	const [pos, setPos] = useState(position)
	const [val, setVal] = useState(value)
	const [previousPosition, setPreviousPosition] = useState(null)
	const tile = new Tile(position, value)
	
	return (
		<div className={`tile tile-${tile.value} tile-position-${pos.x}-${pos.y} ${val > 2048 ? "tile-super" : ""}`}>
			<div className={"tile-inner"}>
				{tile.value}
			</div>
		</div>
	)
}
export {TileComponent}

export default Tile
