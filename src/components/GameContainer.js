import React, {useEffect} from "react";
import GridContainer from "./GridContainer";
import {useDispatch} from "react-redux";
import store, {addRandomTile, getFromStorage, moveTilesWithDirection, saveToStorage} from "../redux/store";
import LocalStorage from "../LocalStorage";
import TileContainer from "./TileContainer";

const canMerge = (board) => {
	let tile;
	
	for (let row = 0; row < board.length; row++) {
		for (let col = 0; col < board.length; col++) {
			tile = board[row][col]
			if (tile) {
				for (let direction = 0; direction < 4; direction++) {
					let vector = {
						x: direction === 1 ? 1 : direction === 3 ? -1 : 0,
						y: direction === 0 ? -1 : direction === 2 ? 1 : 0,
					}
					let cell = {x: col + vector.x, y: row + vector.y}
					if (cell.x < 0 || cell.x >= board.length || cell.y < 0 || cell.y >= board.length) continue
					
					let other = board[cell.y][cell.x]
					if (other && other === tile) return true
				}
			}
		}
	}
	return false
}

const hasEmpty = (board) => {
	for (let row = 0; row < board.length; row++) {
		for (let col = 0; col < board.length; col++) {
			if (board[row][col] === 0) return true
		}
	}
	return false
}

const KeydownMap = {
	"ArrowUp": 0,
	"ArrowRight": 1,
	"ArrowDown": 2,
	"ArrowLeft": 3,
}

const GameContainer = () => {
	const dispatch = useDispatch()
	const rootStore = store;
	
	const KeydownEventListener = (e) => {
		if (KeydownMap[e.key] !== undefined) {
			e.preventDefault();
			dispatch(moveTilesWithDirection(KeydownMap[e.key]))
			dispatch(addRandomTile())
			dispatch(saveToStorage())
			if (!canMerge(rootStore.getState().board) && !hasEmpty(rootStore.getState().board)) {
				alert("Game Over")
				console.log("End!!!")
			}
		}
	}
	
	useEffect(() => {
		window.addEventListener("keydown", e => KeydownEventListener(e))
	})
	
	useEffect(() => {
		let localStorage = new LocalStorage();
		if (localStorage.getGameState()) {
			dispatch(getFromStorage())
		}
		else {
			dispatch(addRandomTile(2));
		}
	}, [])
	
	return (
		<div id={"game-container"}>
			<GridContainer size={4}/>
			<TileContainer/>
		</div>
	)
}

export default GameContainer
