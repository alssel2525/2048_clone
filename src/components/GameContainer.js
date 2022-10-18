import React, {useEffect} from "react";
import GridContainer from "./GridContainer";
import {useDispatch, useSelector} from "react-redux";
import {addRandomTile, getFromStorage} from "../redux/store";
import TileComponent from "./Tile";
import {nanoid} from "nanoid";
import LocalStorage from "../LocalStorage";


const GameContainer = () => {
	const dispatch = useDispatch()
	const board = useSelector(state => state.board)
	const newTiles = useSelector(state => state.newTiles)
	const mergedTiles = useSelector(state => state.mergedTiles)
	const previousPositions = useSelector(state => state.previousPositions)
	const removedTiles = useSelector(state => state.removedTiles)
	
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
			<div className={"tile-container"}>
				{
					removedTiles.map(val => {
						return (<TileComponent x={val[2]} y={val[3]} value={val[4]} key={nanoid()}
							previousPosition={val.slice(0, 4)}
						/>)
					})
				}
				{
					board.map((row, ir) => {
						return row.map((val, ic) => {
							if (val !== 0) {
								return (<TileComponent x={ic} y={ir} value={val} key={nanoid()}
									isNew={newTiles.findIndex((value) => {
										return value[0] === ir && value[1] === ic
									}) !== -1}
									isMerged={mergedTiles.findIndex((value) => {
										return value[0] === ir && value[1] === ic
									}) !== -1}
									previousPosition={previousPositions[previousPositions.findIndex((value) => {
										return value[2] === ic && value[3] === ir
									})]}
								/>)
							}
						})
					})
				}
			</div>
		</div>
	)
}

export default GameContainer
