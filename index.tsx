// import React from 'react'; 는 tsx에서 작동하지 않음
// https://stackoverflow.com/questions/39423054/react-jsx-file-giving-error-cannot-read-property-createelement-of-undefined
import * as React from 'react';
import {createRoot} from "react-dom/client";
import App from "./src/components/App"
import {Provider} from "react-redux";
import store from "./src/redux/store";
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;

		background-color: #faf8ef;
	}
`

const container: HTMLElement = document.getElementById("root")
const root = createRoot(container)
root.render(
	<Provider store={store}>
		<GlobalStyle/>
		<App/>
	</Provider>,
)
