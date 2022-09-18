import React from "react"
import {useSelector} from "react-redux";

const Header = () => {
	const score = useSelector((state) => state.score)
	
	return (
		<header>
			<div>
				<h1 className="title">2048</h1>
				<div className="scores-container">
					<div className="score-container">{score}</div>
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
