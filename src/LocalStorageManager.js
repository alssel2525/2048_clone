const LocalStorageManager = () => {
	let bestScoreKey = "bestScore"
	let gameStateKey = "gameState"

	LocalStorageManager.getGameState = () => {
		let stateJSON = window.localStorage.getItem(gameStateKey);
		return stateJSON ? JSON.parse(stateJSON) : null;
	};
}

export default LocalStorageManager
