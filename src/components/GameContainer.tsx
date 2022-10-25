import * as React from "react";
import {useEffect} from "react";
import styled from "styled-components";
import GridContainer from "./GridContainer";
import {useDispatch} from "react-redux";
import store, {addRandomTile, getFromStorage, moveTilesWithDirection, saveToStorage} from "../redux/store";
import LocalStorage from "../LocalStorage";
import TileContainer from "./TileContainer";

const StyledGameContainer = styled.div`
	width: 500px;
	height: 500px;
	margin-top: 40px;
	padding: 15px;
	
	position: relative;
	background: #bbada0;
	border: 6px;
	box-sizing: border-box;
`

const canMerge = (board: number[][]): boolean => {
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

const hasEmpty = (board: number[][]): boolean => {
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

const GameContainer = (): React.ReactElement => {
	const dispatch = useDispatch()
	const rootStore = store;

	const KeydownEventListener = (e) => {
		if (KeydownMap[e.key] !== undefined) {
			e.preventDefault();
			dispatch(moveTilesWithDirection(KeydownMap[e.key]))
			dispatch(addRandomTile(1))
			dispatch(saveToStorage())
			if (!canMerge(rootStore.getState().board) && !hasEmpty(rootStore.getState().board)) {
				alert("Game Over")
				console.log("End!!!")
			}
		}
	}

	useEffect(() => {
		let localStorage = new LocalStorage();
		if (localStorage.getGameState()) {
			dispatch(getFromStorage())
		}
		else {
			dispatch(addRandomTile(2));
		}

		window.addEventListener("keydown", e => KeydownEventListener(e))
		return () => {
			window.removeEventListener("keydown", e => KeydownEventListener(e))
		}
	}, [])

	return (
		<StyledGameContainer>
			<GridContainer size={4}/>
			<TileContainer/>
		</StyledGameContainer>
	)
}

export default GameContainer
