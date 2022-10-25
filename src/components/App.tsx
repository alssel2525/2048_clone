import * as React from "react";
import styled from "styled-components";
import Header from "./Header";
import GameContainer from "./GameContainer";
import SizeSelector from "./SizeSelector";
import Footer from "./Footer";

const StyledContainer = styled.div`
	width: 500px;
	margin: 3rem auto;
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
			<Footer/>
		</StyledContainer>
	)
}

export default App;
