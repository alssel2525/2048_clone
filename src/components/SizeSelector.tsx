import * as React from 'react';
import styled from 'styled-components';
import {batch, useDispatch} from "react-redux";
import {addRandomTile, changeSize, newGame, saveToStorage} from "../redux/store";

const StyledContainer = styled.div`
	width: 500px;
	margin-top: 1rem;
	padding: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	
	button {
		width: 100px;
		height: 50px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		
		font-size: 1.5rem;
		font-weight: 700;
		background: #8f7a66;
		color: #f9f6f2;
	}
`

const SizeSelector = (): React.ReactElement => {
	const dispatch = useDispatch();

	const handleChange = (size: number) => {
		batch(() => {
			dispatch(changeSize(size))
			dispatch(newGame())
			dispatch(addRandomTile(2))
			dispatch(saveToStorage())
		})
	}

	return (
		<StyledContainer>
			<button onClick={() => handleChange(3)}>3x3</button>
			<button onClick={() => handleChange(4)}>4x4</button>
			<button onClick={() => handleChange(5)}>5x5</button>
			<button onClick={() => handleChange(6)}>6x6</button>
		</StyledContainer>
	)
}

export default SizeSelector;
