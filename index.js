import React from "react";
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

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
	<Provider store={store}>
		<GlobalStyle/>
		<App/>
	</Provider>,
)
