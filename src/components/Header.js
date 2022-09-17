import React from "react"

const Header = () => {
	return (
		<header>
			<div>
				<h1 className="title">2048</h1>
				<div className="scores-container">
					<div className="score-container">0</div>
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
