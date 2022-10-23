import React from "react";
import styled from "styled-components";
import "./App.css"
import Header from "./Header";
import GameContainer from "./GameContainer";

const StyledContainer = styled.div`
	width: 500px;
	margin: 80px auto;
	padding: 0;
	background-color: #faf8ef;
	color: #776e65;
	
	font-family: Arial, sans-serif;
`

const App = () => {
	return (
		<StyledContainer>
			<Header/>
			<GameContainer/>
		</StyledContainer>
	)
}

export default App;
