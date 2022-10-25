import * as React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import TileComponent from "./TileComponent";
import {nanoid} from "nanoid";
import {stateType} from "../redux/store";

const Container = styled.div`
	position: absolute;
	z-index: 1;
`;

const TileContainer = () => {
	const board = useSelector((state: stateType) => state.board)
	const newTiles = useSelector((state: stateType) => state.newTiles)
	const mergedTiles = useSelector((state: stateType) => state.mergedTiles)
	const previousPositions = useSelector((state: stateType) => state.previousPositions)
	const removedTiles: [number, number, number, number, number][] = useSelector((state: stateType) => state.removedTiles)

	return (
		<Container>
			{removedTiles.map((val: [number, number, number, number, number]) => {
				return (<TileComponent x={val[2]} y={val[3]} value={val[4]} key={nanoid()}
					previousPosition={[val[0], val[1], val[2], val[3]]}
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
