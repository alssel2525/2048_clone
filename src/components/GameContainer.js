import React, {useEffect, useState} from "react";
import GridContainer from "./GridContainer";
import {useDispatch} from "react-redux";
import rootStore, {addRandomTile} from "../redux/store";
import {TileComponent} from "./Tile";


const GameContainer = () => {
	const dispatch = useDispatch()
	const store = rootStore
	const [board, setBoard] = useState(store.getState().board)
	let unsubscribe = store.subscribe(() => {
		let changed = false
		let copy = [...board]
		for (let x = 0; x < copy.length; x++) {
			for (let y = 0; y < copy.length; y++) {
				if (copy[x][y] !== store.getState().board[x][y]) {
					copy[x] = copy[x].map((v, i) => {
						if (i === y) return store.getState().board[x][y]
						return v
					})
					changed = true
				}
			}
		}
		if (changed) setBoard(prevstate => {
			let board = [...prevstate];
			for (let x = 0; x < board.length; x++) {
				board[x] = [...board[x]]
				for (let y = 0; y < board[x].length; y++) {
					board[x][y] = copy[x][y]
				}
			}
			return board
		})
	})
	
	useEffect(() => {
		for (let i = 0; i < 2; i++) {
			dispatch(addRandomTile())
		}
		return () => unsubscribe();
	}, [])
	
	return (
		<div id={"game-container"}>
			<GridContainer/>
			<div className={"tile-container"}>
				{
					board.map((row, ir) => {
						return row.map((val, ic) => {
							return (val !== 0) ? (
								<TileComponent x={ir} y={ic} value={val} key={ir * board.length + ic}/>) : null
						})
					})
				}
			</div>
		</div>
	)
}

export default GameContainer
