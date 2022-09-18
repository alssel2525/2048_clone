import React, {useEffect} from "react";
import GameManager from "../GameManager"
import KeyboardInputManager from "../KeyboardInputManager";
import HTMLActuator from "../HTMLActuator"
import LocalStorageManager from "../LocalStorageManager";
import "./App.css"
import Container from "./Container";
import Header from "./Header";
import {useDispatch} from "react-redux";
import store, {addRandomTile} from "../redux/store";

const App = () => {
	const state = store.getState()
	const dispatch = useDispatch();
	
	useEffect(() => {
		GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager)
		GameManager.setup()
		
		if (!state.previousState) {
			for (let i = 0; i < 2; i++)	dispatch(addRandomTile())
		}
	}, [])
	
	return (
		<>
			<Header/>
			<Container/>
		</>
	)
}

export default App;
