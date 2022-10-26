class LocalStorage {
	static instance = null;
	storage: Storage;
	gameStateKey: string;

	constructor() {
		if (LocalStorage.instance) {
			return LocalStorage.instance;
		}

		this.storage = window.localStorage;
		this.gameStateKey = "gameState";

		LocalStorage.instance = this;
	}

	setGameState(gameState) {
		this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
	}

	getGameState() {
		let gameState = this.storage.getItem(this.gameStateKey);
		try {
			return gameState ? JSON.parse(gameState) : null;
		} catch (e) {
			return null;
		}
	}
}

export default LocalStorage
