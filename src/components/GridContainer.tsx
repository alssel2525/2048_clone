import * as React from "react";
import styled from "styled-components";

const GridRow = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	margin-bottom: 15px;
	&:last-child {
		margin-bottom: 0;
	}
`

const GridCell = styled.div`
	width: calc((500px - 15px * (${props => props.size} + 1)) / ${props => props.size});
	height: calc((500px - 15px * (${props => props.size} + 1)) / ${props => props.size});
	position: relative;
	margin-right: 15px;
	border-radius: 3px;
	background: #eee4da55;
	
	&:last-child {
		margin-right: 0;
	}
`

const GridContainer = ({size} : {size: number}): React.ReactElement => {
	return (
		<div style={{position: "absolute"}}>
			{
				[...Array(size)].map((row, ir) => {
					return (
						<GridRow key={ir}>
							{
								[...Array(size)].map((cell, ic) => {
									return (
										<GridCell size={size} key={ic}/>
									)
								})
							}
						</GridRow>
					)
				})
			}
		</div>
	)
}

export default GridContainer
