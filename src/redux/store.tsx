import {configureStore, createSlice} from "@reduxjs/toolkit";
import LocalStorage from "../LocalStorage";

type stateType = {
	bestScore: number,
	size: number,
	board: number[][],
	newTiles: [number, number],
	mergedTiles: [number, number],
	removedTiles: [number, number, number, number, number][], // x, y, x, y, val
	previousPositions: [],
	score: number,
	won: boolean,
	over: boolean,
	keepPlaying: boolean,
	previousState: stateType,
}

const cellsAvailable = (board: number[][]): [number, number][] => {
	let cells = [];
	board.forEach((row, ir) => {
		row.forEach((cell, ic) => {
			if (!cell) cells.push([ir, ic])
		})
	})

	return cells;
}

const moveAction = (board: number[][], direction: number): [number[][], number, [number, number][], [number, number, number, number][], [number, number, number, number, number][]] => {
	let scoreIncrease = 0;
	let mergedTiles = [];
	let previousPositions = [];
	let removedTiles = [];
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

				if (copy[cell.y] && copy[cell.y][cell.x] && copy[cell.y][cell.x] === val) {
					copy[cell.y][cell.x] = val * 2
					copy[traversals.y[row]][traversals.x[column]] = 0
					scoreIncrease += val * 2
					mergedTiles.push([cell.y, cell.x])
					removedTiles.push([traversals.x[column], traversals.y[row], cell.x, cell.y, val])
				} else {
					copy[traversals.y[row]][traversals.x[column]] = 0
					copy[previous.y][previous.x] = val
					previousPositions.push([traversals.x[column], traversals.y[row], previous.x, previous.y])
				}
			}
		}
	}
	return [copy, scoreIncrease, mergedTiles, previousPositions, removedTiles];
}

const initialState = {
	bestScore: 0,
	size: 4,
	board: new Array(4).fill(new Array(4).fill(0)),
	newTiles: [],
	mergedTiles: [],
	removedTiles: [], // x, y, x, y, val
	previousPositions: [],
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
		moveTilesWithDirection: (state, action) => {
			const [board, score, mergedTiles, previousPositions, removedTiles] = moveAction(state.board, action.payload)
			state.board = board
			state.score += score
			if (state.score > state.bestScore) state.bestScore = state.score
			state.mergedTiles = mergedTiles;
			state.previousPositions = previousPositions;
			state.removedTiles = removedTiles;
		},
		addRandomTile: (state, action) => {
			let times = action?.payload || 1;
			state.newTiles = []
			while (times--) {
				let cA = cellsAvailable(state.board)
				if (cA.length) {
					let val = Math.random() < 0.9 ? 2 : 4;
					let cell = cA[Math.floor(Math.random() * cA.length)]
					state.board[cell[0]][cell[1]] = val
					state.newTiles.push([cell[0], cell[1]])
				}
			}
		},
		newGame: (state) => {
			state.board = new Array(state.size).fill(new Array(state.size).fill(0))
			state.score = 0
			state.won = false
			state.over = false
			state.keepPlaying = false
			state.previousState = null
			state.newTiles = []
			state.mergedTiles = []
			state.removedTiles = []
			state.previousPositions = []
		},
		saveToStorage: (state) => {
			let localStorage = new LocalStorage()
			localStorage.setGameState(state)
		},
		getFromStorage: (state) => {
			let localStorage = new LocalStorage()
			let data = localStorage.getGameState()
			if (data) {
				for (let key in data) {
					state[key] = data[key]
				}
			}
		},
		/**
		 * need to dispatch newGame action after this
		 * @param state
		 * @param action {payload: {size: number}}
		 */
		changeSize: (state, action) => {
			state.size = action.payload
		}
	},
})

const store = configureStore({
	reducer: rootSlice.reducer,
})

export const {
	moveTilesWithDirection,
	addRandomTile,
	newGame,
	saveToStorage,
	getFromStorage,
	changeSize,
} = rootSlice.actions

export {stateType}

export default store
