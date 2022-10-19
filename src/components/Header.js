import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "nanoid";
import {addRandomTile, newGame, saveToStorage} from "../redux/store";

const Header = () => {
	const dispatch = useDispatch()
	const score = useSelector(state => state.score)
	const bestScore = useSelector(state => state.bestScore)
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
		<header>
			<div>
				<h1 className="title">2048</h1>
				<div className="scores-container">
					<div className="score-container">
						{score}
						{increase > 0 ? <div className={"score-increase"} key={nanoid()}>+{increase}</div> : null}
					</div>
					<div className="best-container">{bestScore}</div>
				</div>
			</div>
			<div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
				<p className="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>
				<a className="restart-button" onClick={dispatchNewGame}>New Game</a>
			</div>
		</header>
	)
}

export default Header
