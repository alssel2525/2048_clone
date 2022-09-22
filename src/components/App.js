import React, {useEffect} from "react";
import GameManager from "../GameManager"
import KeyboardInputManager from "../KeyboardInputManager";
import HTMLActuator from "../HTMLActuator"
import LocalStorageManager from "../LocalStorageManager";
import "./App.css"
import Container from "./Container";
import Header from "./Header";

const App = () => {
	useEffect(() => {
		GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager)
	}, [])
	
	return (
		<>
			<Header/>
			<Container/>
		</>
	)
}

export default App;
