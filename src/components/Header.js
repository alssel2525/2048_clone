import React, {useEffect, useState} from "react"
import {useSelector} from "react-redux";
import {nanoid} from "nanoid";

const Header = () => {
	const score = useSelector(state => state.score)
	const [beforeIncrease, setBeforeIncrease] = useState(score)
	const [increase, setIncrease] = useState(0);
	
	useEffect(() => {
		setIncrease(score - beforeIncrease);
		setBeforeIncrease(score);
	}, [score])
	
	return (
		<header>
			<div>
				<h1 className="title">2048</h1>
				<div className="scores-container">
					<div className="score-container">
						{score}
						{increase !== 0 ? <div className={"score-increase"} key={nanoid()}>+{increase}</div> : null}
					</div>
					<div className="best-container">0</div>
				</div>
			</div>
			<div className="above-game">
				<p className="game-intro">Join the numbers and get to the <strong>2048 tile!</strong></p>
				<a className="restart-button">New Game</a>
			</div>
		</header>
	)
}

export default Header
