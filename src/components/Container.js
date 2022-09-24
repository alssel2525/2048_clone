import React, {useEffect} from "react";
import GameContainer from "./GameContainer";
import {useDispatch} from "react-redux";
import {addRandomTile, moveTilesWithDirection} from "../redux/store";

const KeydownMap = {
	"ArrowUp": 0,
	"ArrowRight": 1,
	"ArrowDown": 2,
	"ArrowLeft": 3,
}

const Container = () => {
	const dispatch = useDispatch()
	
	const KeydownEventListener = (e) => {
		if (KeydownMap[e.key] !== undefined) {
			e.preventDefault();
			console.log(e.key, KeydownMap[e.key])
			dispatch(moveTilesWithDirection(KeydownMap[e.key]))
			dispatch(addRandomTile())
		}
	}
	
	useEffect(() => {
		window.addEventListener("keydown", e => KeydownEventListener(e))
	})
	
	return (
		<div className={"container"}>
			<GameContainer/>
		</div>
	)
};

export default Container;
