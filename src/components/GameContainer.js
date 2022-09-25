import React, {useEffect} from "react";
import GridContainer from "./GridContainer";
import {useDispatch, useSelector} from "react-redux";
import {addRandomTile} from "../redux/store";
import {TileComponent} from "./Tile";
import {nanoid} from "nanoid";


const GameContainer = () => {
	const dispatch = useDispatch()
	const board = useSelector(state => state.board)
	
	useEffect(() => {
		for (let i = 0; i < 2; i++) {
			dispatch(addRandomTile())
		}
	}, [])
	
	return (
		<div id={"game-container"}>
			<GridContainer/>
			<div className={"tile-container"}>
				{
					board.map((row, ir) => {
						return row.map((val, ic) => {
							return (val !== 0) ? (
								<TileComponent x={ic} y={ir} value={val} key={nanoid()}/>) : null
						})
					})
				}
			</div>
		</div>
	)
}

export default GameContainer
