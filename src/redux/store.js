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

export const {updateScore, addScore, resetScore, updateBoard, addRandomTile} = rootSlice.actions

export default store
