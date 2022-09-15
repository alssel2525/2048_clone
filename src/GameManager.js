import Grid from "./components/Grid";
import Tile from "./components/Tile"

const GameManager = (_size, inputManager, actuator, storageManager) => {
	let size = _size;
	let startTiles = 2;
	let score, won, over, keepPlaying;
	
	GameManager.setup = () => {
		storageManager();
		let previousState = storageManager.getGameState()
		
		if (previousState) {
			Grid(previousState.grid.size, previousState.grid.cells)
			score = previousState.score
			won = previousState.won
			over = previousState.over
			keepPlaying = previousState.keepPlaying
		} else {
			Grid(size)
			score = 0
			won = false
			over = false
			keepPlaying = false
			
			addStartTiles()
		}
		
		actuate();
	}
	
	const addStartTiles = () => {
		for (let i = 0; i < startTiles; i++) {
			addRandomTile()
		}
	}
	
	const addRandomTile = () => {
		if (Grid.cellsAvailable()) {
			let value = Math.random() < 0.9 ? 2: 4;
			Tile(Grid.randomAvailableCell(), value);
			Grid.insertTile(Tile)
		}
	}
	
	const actuate = () => {
		actuator();
		actuator.actuate(Grid, {
			score: score,
			over: over,
			won: won,
			terminated: isGameTerminated()
		})
	}
	
	const isGameTerminated = () => {
		return over || (won && !keepPlaying)
	}
}

export default GameManager
