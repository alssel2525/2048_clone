const KeyboardInputManager = () => {
	let events = {}
	
	KeyboardInputManager.on = (e, callback) => {
		if (!events[e]) events[e] = [];
		events[e].push(callback)
	}
	
	
	KeyboardInputManager.emit = (event, data) => {
		let callbacks = events[event];
		if (callbacks) {
			callbacks.forEach((callback) => {
				callback(data)
			})
		}
	}
	
	KeyboardInputManager.listen = () => {
		let map = {
			38: 0, // Up
			39: 1, // Right
			40: 2, // Down
			37: 3, // Left
			75: 0, // Vim up
			76: 1, // Vim right
			74: 2, // Vim down
			72: 3, // Vim left
			87: 0, // W
			68: 1, // D
			83: 2, // S
			65: 3,  // A
		}
		
		document.addEventListener("keydown", (e) => {
			let modifiers = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey
			let mapped = map[e.which]
			
			if (!modifiers) {
				if (mapped !== undefined) {
					e.preventDefault()
					KeyboardInputManager.emit("move", mapped)
				}
			}
			
			// 'R' restarts the game
			if (!modifiers && e.which === 82) {
				KeyboardInputManager.restart(e)
			}
		})
	}
	
	KeyboardInputManager.restart = (e) => {
		e.preventDefault()
		KeyboardInputManager.emit("restart")
	}
	
	KeyboardInputManager.listen()
}

export default KeyboardInputManager
