import React from "react";
import GridContainer from "./GridContainer";
const GameContainer = () => {
	return (
		<div id={"game-container"}>
			<GridContainer/>
			<div className={"tile-container"}></div>
		</div>
	)
}

export default GameContainer
