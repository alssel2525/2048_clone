import React, {useEffect} from "react";
import GridContainer from "./GridContainer";
import {useDispatch} from "react-redux";
import {addRandomTile, getFromStorage} from "../redux/store";
import LocalStorage from "../LocalStorage";
import TileContainer from "./TileContainer";


const GameContainer = () => {
	const dispatch = useDispatch()
	
	useEffect(() => {
		let localStorage = new LocalStorage();
		if (localStorage.getGameState()) {
			dispatch(getFromStorage())
		} else {
			dispatch(addRandomTile(2));
		}
	}, [])
	
	return (
		<div id={"game-container"}>
			<GridContainer/>
			<TileContainer/>
		</div>
	)
}

export default GameContainer
