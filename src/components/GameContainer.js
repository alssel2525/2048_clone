import React, {useEffect} from "react";
import GridContainer from "./GridContainer";
import {useDispatch, useSelector} from "react-redux";
import {addRandomTile} from "../redux/store";
import {TileComponent} from "./Tile";
import {nanoid} from "nanoid";


const GameContainer = () => {
	const dispatch = useDispatch()
	const board = useSelector(state => state.board)
	const newTiles = useSelector(state => state.newTiles)
	const mergedTiles = useSelector(state => state.mergedTiles)
	
	useEffect(() => {
		dispatch(addRandomTile(2))
	}, [])
	
	return (
		<div id={"game-container"}>
			<GridContainer/>
			<div className={"tile-container"}>
				{
					board.map((row, ir) => {
						return row.map((val, ic) => {
							return (val !== 0) ? (
								<TileComponent x={ic} y={ir} value={val} key={nanoid()}
									isNew={newTiles.findIndex((value) => {
										return value[0] === ir && value[1] === ic
									}) !== -1}
									isMerged={mergedTiles.findIndex((value) => {
										return value[0] === ir && value[1] === ic
									}) !== -1}
								/>) : null
						})
					})
				}
			</div>
		</div>
	)
}

export default GameContainer
