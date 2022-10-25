import * as React from "react";
import {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "nanoid";
import {addRandomTile, newGame, saveToStorage} from "../redux/store";

type stateType = {
	score: number,
	bestScore: number
}

const StyledHeader = styled.header`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	
	> div {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	h1 {
		font-size: 5rem;
		font-weight: 700;
		margin: 0;
		display: block;
	}
	
	button {
		width: fit-content;
		height: 3rem;
		line-height: 3rem;
		display: block;
		font-weight: 700;
		font-size: 1rem;
		cursor: pointer;
		border: none;
		
		background: #998a80;
		border-radius: 3px;
		padding: 0 20px;
		text-decoration: none;
		color: #f9f6f2;
	}
`

const ScoreContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 5px;
	
	> div {
		height: 25px;
		display: block;
		background: #bbada0;
		position: relative;
		padding: 15px 25px;
		font-size: 1.5rem;
		line-height: calc(1.5rem + 22px);
		border-radius: 3px;
		color: #ffffff;
		margin-top: 10px;
		text-align: center;
		font-weight: 700;
		
		&::after {
			position: absolute;
			width: 100%;
			top: 10px;
			left: 0;
			text-transform: uppercase;
			font-size: 0.8rem;
			line-height: 0.8rem;
			text-align: center;
			color: #eee4da;
		}
		
		&:first-child::after {
			content: "Score";
		}
		&:last-child::after {
			content: "Best";
		}
	}
`

const moveUp = keyframes`
	0% {
		transform: translateY(0);
		opacity: 1;
	}
	100% {
		transform: translateY(-2rem);
		opacity: 0;
	}
`

const ScoreIncrease = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	font-size: 1.2rem;
	line-height: 1.2rem;
	font-weight: 700;
	color: #776e65e5;
	z-index: 100;
	animation: ${moveUp} 0.4s ease-in forwards;
`

const Header = (): React.ReactElement => {
	const dispatch = useDispatch()
	const score: number = useSelector((state: stateType) => state.score)
	const bestScore: number = useSelector((state: stateType) => state.bestScore)
	const [beforeIncrease, setBeforeIncrease] = useState(score)
	const [increase, setIncrease] = useState(0);

	useEffect(() => {
		setIncrease(score - beforeIncrease);
		setBeforeIncrease(score);
	}, [score])

	// new game onclick event
	const dispatchNewGame = () => {
		dispatch(newGame());
		dispatch(addRandomTile(2));
		dispatch(saveToStorage());
	}

	return (
		<StyledHeader>
			<div>
				<h1>2048</h1>
				<ScoreContainer>
					<div>
						{score}
						{increase > 0 && <ScoreIncrease key={nanoid()}>+{increase}</ScoreIncrease>}
					</div>
					<div>{bestScore}</div>
				</ScoreContainer>
			</div>
			<div>
				<p>Join the numbers and get to the <strong>2048 tile!</strong></p>
				<button onClick={dispatchNewGame}>New Game</button>
			</div>
		</StyledHeader>
	)
}

export default Header
