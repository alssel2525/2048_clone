import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import TileComponent from "./TileComponent";
import {nanoid} from "nanoid";

const Container = styled.div`
	position: absolute;
	z-index: 1;
`;

const TileContainer = () => {
	const board = useSelector(state => state.board)
	const newTiles = useSelector(state => state.newTiles)
	const mergedTiles = useSelector(state => state.mergedTiles)
	const previousPositions = useSelector(state => state.previousPositions)
	const removedTiles = useSelector(state => state.removedTiles)
	
	return (
		<Container>
			{removedTiles.map(val => {
				return (<TileComponent x={val[2]} y={val[3]} value={val[4]} key={nanoid()}
					previousPosition={val.slice(0, 4)}
				/>)
			})}
			{board.map((row, ir) => {
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
			})}
		</Container>
	)
};

export default TileContainer;
