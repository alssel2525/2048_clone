import React, {useState} from "react";

class Tile {
	constructor(position, val) {
		this.x = position.x || 0
		this.y = position.y || 0
		this.value = val || 2
	}
	
	savePosition = () => {
		this.previousPosition = {
			x: this.x,
			y: this.y,
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
				y: this.y,
			},
			value: this.value,
		}
	}
}

const TileComponent = ({x, y, value}) => {
	const [_x, setX] = useState(x)
	const [_y, setY] = useState(y)
	const [val, setVal] = useState(value)
	
	return (
		<div className={`tile tile-${val} tile-position-${_x}-${_y} ${val > 2048 ? "tile-super" : ""}`}>
			<div className={"tile-inner"}>
				{val}
			</div>
		</div>
	)
}
export {TileComponent}

export default Tile
