import * as React from "react";
import styled from "styled-components";
import Header from "./Header";
import GameContainer from "./GameContainer";
import SizeSelector from "./SizeSelector";

const StyledContainer = styled.div`
	width: 500px;
	margin: 80px auto;
	padding: 0;
	background-color: #faf8ef;
	color: #776e65;
	
	font-family: Arial, sans-serif;
`

const App = (): React.ReactElement => {
	return (
		<StyledContainer>
			<Header/>
			<SizeSelector/>
			<GameContainer/>
		</StyledContainer>
	)
}

export default App;
