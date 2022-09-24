import {configureStore, createSlice} from "@reduxjs/toolkit";

const cellsAvailable = (board) => {
	let cells = [];
	board.forEach((row, ir) => {
		row.forEach((cell, ic) => {
			if (!cell) cells.push([ir, ic])
		})
	})
	
	return cells;
}

const moveAction = (board, direction) => {
	let copy = [...board];
	for (let r = 0; r < copy.length; r++) {
		copy[r] = [...board[r]]
	}
	
	// build traversals
	const traversals = {x: [], y: []}
	for (let pos = 0; pos < copy.length; pos++) {
		traversals.x.push(pos)
		traversals.y.push(pos)
	}
	if (direction === 1) traversals.x = traversals.x.reverse()
	if (direction === 2) traversals.y = traversals.y.reverse()
	
	for (let row = 0; row < copy.length; row++) {
		for (let column = 0; column < copy.length; column++) {
			let cell = {x: traversals.x[column], y: traversals.y[row]}
			let val = copy[cell.y][cell.x]
			if (val) {
				// find the farthest position
				let previous
				do {
					previous = {x: cell.x, y: cell.y}
					cell = {
						x: previous.x + (direction === 1 ? 1 : direction === 3 ? -1 : 0),
						y: previous.y + (direction === 0 ? -1 : direction === 2 ? 1 : 0),
					}
				} while (0 <= cell.x && cell.x < copy.length && 0 <= cell.y && cell.y < copy.length &&
				copy[cell.y][cell.x] === 0)
				
				console.log("copy: " + JSON.stringify(copy))
				console.log(cell, previous)
				
				if (copy[cell.y] && copy[cell.y][cell.x] && copy[cell.y][cell.x] === val) {
					copy[cell.y][cell.x] = val * 2
					copy[traversals.y[row]][traversals.x[column]] = 0
				} else {
					copy[traversals.y[row]][traversals.x[column]] = 0
					copy[previous.y][previous.x] = val
				}
			}
		}
	}
	return copy;
}

const initialState = {
	size: 4,
	board: new Array(4).fill(new Array(4).fill(0)),
	score: 0,
	won: false,
	over: false,
	keepPlaying: false,
	previousState: null,
}

const rootSlice = createSlice({
	name: "root",
	initialState: initialState,
	reducers: {
		updateScore: (state, action) => {
			state.score = action.payload
		},
		addScore: (state, action) => {
			state.score += action.payload
		},
		resetScore: (state) => {
			state.score = 0
		},
		updateBoard: (state, action) => {
			state.board = action.payload
		},
		moveTilesWithDirection: (state, action) => {
			state.board = moveAction(state.board, action.payload)
		},
		addRandomTile: (state, action) => {
			let cA = cellsAvailable(state.board)
			if (cA.length) {
				let val = Math.random() < 0.9 ? 2 : 4;
				let cell = cA[Math.floor(Math.random() * cA.length)]
				state.board[cell[0]][cell[1]] = val
			}
		}
	},
})

const store = configureStore({
	reducer: rootSlice.reducer,
})

export const {updateScore, addScore, resetScore, updateBoard, moveTilesWithDirection, addRandomTile} = rootSlice.actions

export default store
