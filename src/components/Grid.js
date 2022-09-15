const Grid = (_size, previousState) => {
	Grid.empty = () => {
		let cells = []
		for (let x = 0; x < Grid.size; x++) {
			cells.push([]);
			
			for (let y = 0; y < Grid.size; y++) {
				cells[x].push(null);
			}
		}
		
		return cells;
	}
	
	Grid.size = _size
	Grid.cells = previousState ? Grid.fromState(previousState) : Grid.empty();
	
	Grid.fromState = (state) => {
		let cells = []
		for (let x = 0; x < Grid.size; x++) {
			cells.push([]);
			
			for (let y = 0; y < Grid.size; y++) {
				let tile = state[x][y];
				cells[x].push(tile ? new Tile(tile.position, tile.value) : null)
			}
		}
		
		return cells
	}
	
	Grid.eachCell = (callback) => {
		for (let x = 0; x < Grid.size; x++) {
			for (let y = 0; y < Grid.size; y++) {
				callback(x, y, Grid.cells[x][y])
			}
		}
	}
	
	Grid.availableCells = () => {
		let cells = [];
		
		Grid.eachCell((x, y, tile) => {
			if (!tile) {
				cells.push({x: x, y: y})
			}
		})
		
		return cells;
	}
	
	Grid.randomAvailableCell = () => {
		let cells = Grid.availableCells();
		if (cells.length) {
			return cells[Math.floor(Math.random() * cells.length)]
		}
	}
	
	Grid.serialize = () => {
		let cellState = [];
		
		for (let x = 0; x < size; x++) {
			cellState.push([])
			for (let y = 0; y < size; y++) {
				cellState[x].push(cells[x][y] ? cells[x][y].serialize() : null)
			}
		}
		
		return {
			size: size,
			cells: cellState,
		}
	}
	
	Grid.cellsAvailable = () => {
		return !!Grid.availableCells().length
	}
	
	Grid.insertTile = (tile) => {
		Grid.cells[tile.x][tile.y] = tile
	}
}

export default Grid
