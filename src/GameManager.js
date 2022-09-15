import Grid from "./components/Grid";
import Tile from "./components/Tile"

const GameManager = (_size, inputManager, actuator, storageManager) => {
	GameManager.size = _size;
	GameManager.startTiles = 2;
	let score, won, over, keepPlaying;
	
	GameManager.setup = () => {
		inputManager();
		inputManager.on("move", GameManager.move)
		
		storageManager();
		let previousState = storageManager.getGameState()
		
		if (previousState) {
			Grid(previousState.grid.size, previousState.grid.cells)
			score = previousState.score
			won = previousState.won
			over = previousState.over
			keepPlaying = previousState.keepPlaying
		}
		else {
			Grid(GameManager.size)
			score = 0
			won = false
			over = false
			keepPlaying = false
			
			GameManager.addStartTiles()
		}
		
		GameManager.actuate();
	}
	
	GameManager.addStartTiles = () => {
		for (let i = 0; i < GameManager.startTiles; i++) {
			GameManager.addRandomTile()
		}
	}
	
	GameManager.addRandomTile = () => {
		if (Grid.cellsAvailable()) {
			let value = Math.random() < 0.9 ? 2 : 4;
			Grid.insertTile(new Tile(Grid.randomAvailableCell(), value))
		}
	}
	
	GameManager.actuate = () => {
		actuator();
		actuator.actuate(Grid, {
			score: score,
			over: over,
			won: won,
			terminated: GameManager.isGameTerminated(),
		})
	}
	
	GameManager.isGameTerminated = () => {
		return over || (won && !keepPlaying)
	}
	
	GameManager.move = (direction) => {
		if (GameManager.isGameTerminated()) return;
		
		let cell, tile;
		let vector = GameManager.getVector(direction)
		let traversals = GameManager.buildTraversals(vector);
		let moved = false
		
		GameManager.prepareTiles()
		
		traversals.x.forEach((x) => {
			traversals.y.forEach((y) => {
				cell = {x:x, y:y}
				tile = Grid.cellContent(cell)
				
				if (tile) {
					let positions = GameManager.findFarthestPosition(cell, vector)
					let next = Grid.cellContent(positions.next)
					
					if (next && next.value === tile.value && !next.mergedFrom) {
						let merged  = new Tile(positions.next, tile.value * 2)
						merged.mergedFrom = [tile, next]
						
						Grid.insertTile(merged)
						Grid.removeTile(tile)
						
						tile.updatePosition(positions.next)
						
						GameManager.score += merged.value
						
						if (merged.value === 2048) Grid.won = true
					} else {
						GameManager.moveTile(tile, positions.farthest)
					}
					
					if (!GameManager.positionsEqual(cell, tile)) {
						moved = true
					}
				}
			})
		})
		
		if (moved) {
			GameManager.addRandomTile()
			if (!GameManager.movesAvailable()) {
				GameManager.over = true
			}
			
			GameManager.actuate()
		}
	}
	
	GameManager.getVector = (direction) => {
		let map = {
			0: {x: 0, y: -1},
			1: {x: 1, y: 0},
			2: {x: 0, y: 1},
			3: {x: -1, y: 0},
		}
		
		return map[direction]
	}
	
	GameManager.buildTraversals = (vector) => {
		let traversals = {x: [], y: []}
		
		for (let pos = 0; pos < GameManager.size; pos++) {
			traversals.x.push(pos)
			traversals.y.push(pos)
		}
		
		if (vector.x === 1) traversals.x = traversals.x.reverse()
		if (vector.y === 1) traversals.y = traversals.y.reverse()
		
		return traversals
	}
	
	GameManager.prepareTiles = () => {
		Grid.eachCell((x, y, tile) => {
			if (tile) {
				tile.mergedFrom = null
				tile.savePosition()
			}
		})
	}
	
	GameManager.findFarthestPosition = (cell, vector) => {
		let previous;
		
		do {
			previous = cell;
			cell = {x: previous.x + vector.x, y: previous.y + vector.y}
		} while (Grid.withinBounds(cell) && Grid.cellsAvailable(cell))
		
		return {
			farthest: previous,
			next: cell
		}
	}
	
	GameManager.moveTile = (tile, cell) => {
		Grid.cells[tile.x][tile.y] = null;
		Grid.cells[cell.x][cell.y] = tile;
		tile.updatePosition(cell)
	}
	
	GameManager.positionsEqual = (first, second) => {
		return first.x === second.x && first.y === second.y
	}
	
	GameManager.movesAvailable = () => {
		return Grid.cellsAvailable() || GameManager.tileMatchesAvailable();
	}
	
	GameManager.tileMatchesAvailable = () => {
		let tile;
		
		for (let x = 0; x < GameManager.size; x++) {
			for (let y = 0; y < GameManager.size; y++) {
				tile = Grid.cellContent({x:x, y:y})
				if (tile) {
					for (let direction = 0; direction < 4; direction++) {
						let vector = GameManager.getVector(direction)
						let cell = {x: x + vector.x, y: y + vector.y}
						
						let other = Grid.cellContent(cell)
						if (other && other.value === tile.value) return true;
					}
				}
			}
		}
	}
}

export default GameManager
