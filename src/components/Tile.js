import React, {useEffect, useState} from "react";

const TileComponent = ({x, y, value, isMerged, isNew, previousPosition}) => {
	const [_x, setX] = useState(x)
	const [_y, setY] = useState(y)
	const [val, setVal] = useState(value)
	const [positionClass, setPositionClass] = useState(
		previousPosition ?
			`tile-position-${previousPosition[0]}-${previousPosition[1]}` :
			`tile-position-${_x}-${_y}`,
	)
	
	useEffect(() => {
		setPositionClass(`tile-position-${_x}-${_y}`)
	}, [])
	
	return (
		<div className={`tile tile-${val} ${positionClass} ${val > 2048 ? "tile-super" : ""}` +
			`${isNew ? "tile-new" : ""} ${isMerged ? "tile-merged" : ""}`}>
			<div className={"tile-inner"}>
				{val}
			</div>
		</div>
	)
}
export default TileComponent
