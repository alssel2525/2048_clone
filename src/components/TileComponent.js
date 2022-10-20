import React, {useEffect, useState} from "react";
import styled, {css, keyframes} from "styled-components";

const cssMap = {
	/* color, background-color */
	2: ["#776e65", "#eee4da"],
	4: ["#776e65", "#eee1c9"],
	8: ["#f9f6f2", "#f3b27a"],
	16: ["#f9f6f2", "#f69664"],
	32: ["#f9f6f2", "#f77c5f"],
	64: ["#f9f6f2", "#f75f3b"],
	128: ["#f9f6f2", "#edd073"],
	256: ["#f9f6f2", "#edcc62"],
	512: ["#f9f6f2", "#edc950"],
	1024: ["#f9f6f2", "#edc53f"],
	2048: ["#f9f6f2", "#edc22e"],
	super: ["#f9f6f2", "#3c3a32"],
}

const translateTile = (props) => {
	return `translate(${(getTileSize(props) + 15) * props.x}px, ${(getTileSize(props) + 15) * props.y}px);`
}

const pop = (props) => keyframes`
	0% {
		transform: scale(0) ${translateTile(props)};
	}
	50% {
		transform: scale(1.2) ${translateTile(props)};
	}
	100% {
		transform: scale(1) ${translateTile(props)};
	}
`

const appear = (props) => keyframes`
	0% {
		opacity: 0;
		transform: scale(0) ${translateTile(props)};
	}
	100% {
		opacity: 1;
		transform: scale(1) ${translateTile(props)};
	}
`

const getTileSize = (props) => {
	/* [{500 - 15 * (size + 1)} / size + 15] * (x|y) */
	return (500 - 15 * (props.size + 1)) / (props.size);
}

const tileAnimation = (props) => {
	if (props.isNew) {
		return css`
			transform: ${translateTile(props)};
			animation: ${appear(props)} 0.2s ease-out forwards;
		`
	}
	if (props.isMerged) {
		return css`
			transform: ${translateTile(props)};
			animation: ${pop(props)} 0.2s ease-out forwards;
		`
	}
	return css`
		transform: ${translateTile(props)};
	`
}

const StyledTile = styled.div`
	position: absolute;
	width: ${props => getTileSize(props)}px;
	height: ${props => getTileSize(props)}px;
	line-height: ${props => getTileSize(props)}px;
	color: ${props => cssMap[props.value] ? cssMap[props.value][0] : cssMap["super"]};
	background: ${props => cssMap[props.value] ? cssMap[props.value][1] : cssMap["super"]};
	border-radius: 3px;
	text-align: center;
	font-weight: bold;
	font-size: ${props => props.value >= 128 ? (props.value >= 1024 ? "2rem" : "2.5rem") : "3.5rem"};
	z-index: 10;
	
	transition: 0.1s ease-out transform, 0.1s linear opacity, 0.1s linear scale;
	transform-origin: ${props => (getTileSize(props) + 15) * props.x + getTileSize(props) / 2}px ${props => (getTileSize(props) + 15) * props.y + props.size / 2 + getTileSize(props) / 2}px;
	${props => tileAnimation(props)}
	
	& div {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
`

const TileComponent = ({x, y, value, isMerged, isNew, previousPosition}) => {
	const [_x, setX] = useState(previousPosition ? previousPosition[0] : x);
	const [_y, setY] = useState(previousPosition ? previousPosition[1] : y);
	
	useEffect(() => {
		setX(x)
		setY(y)
	}, [])
	
	return (
		<StyledTile size={4} x={_x} y={_y} value={value} isNew={isNew} isMerged={isMerged}>
			<div>{value}</div>
		</StyledTile>
	)
}

export default TileComponent
