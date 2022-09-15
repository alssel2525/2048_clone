import React, {useEffect} from "react";
import GameManager from "../GameManager"
import KeyboardInputManager from "../KeyboradInputManager";
import HTMLActuator from "../HTMLActuator"
import LocalStorageManager from "../LocalStorageManager";
import "./App.css"

const App = () => {
	useEffect(() => {
		GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager)
		GameManager.setup()
	})
	
	return (
		<div className={"container"}>
			<div className={"game-container"}>
				<div className={"grid-container"}>
				
				</div>
				<div className={"tile-container"}>
				
				</div>
			</div>
		</div>
	)
}

export default App;
