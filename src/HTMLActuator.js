const HTMLActuator = () => {
	const tileContainer = document.querySelector(".tile-container")
	HTMLActuator.score = 0
	
	HTMLActuator.actuate = (grid, metadata) => {
		window.requestAnimationFrame(() => {
			HTMLActuator.clearContainer(tileContainer)
			
			grid.cells.forEach((column) => {
				column.forEach((cell) => {
					if (cell) {
						HTMLActuator.addTile(cell);
					}
				})
			})
		})
	}
	
	HTMLActuator.clearContainer = (container) => {
		while (container.firstChild) {
			container.removeChild(container.firstChild)
		}
	}
	
	HTMLActuator.addTile = (tile) => {
		let wrapper = document.createElement("div")
		let inner = document.createElement("div")
		let position = tile.previousPosition || {x: tile.x, y: tile.y}
		let positionClass = getPositionClass(position)
		
		wrapper.classList.add("tile")
		wrapper.classList.add("tile-" + tile.value)
		wrapper.classList.add(positionClass)
		
		if (tile.value > 2048) wrapper.classList.add("tile-super")
		
		inner.classList.add("tile-inner")
		inner.textContent = tile.value;
		
		if (tile.previousPosition) {
			window.requestAnimationFrame(() => {
				wrapper.classList.remove(positionClass)
				wrapper.classList.add(getPositionClass({x: tile.x, y: tile.y}))
			})
		} else if (tile.mergedFrom) {
			wrapper.classList.add("tile-merged")
			
			tile.mergedFrom.forEach((merged) => {
				HTMLActuator.addTile(merged)
			})
		} else {
			wrapper.classList.add("tile-new")
		}
		
		wrapper.appendChild(inner)
		
		tileContainer.appendChild(wrapper)
	}
	
	const getPositionClass = (position) => {
		return "tile-position-" + position.x + "-" + position.y;
	}
}

export default HTMLActuator
