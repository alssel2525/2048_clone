import * as React from 'react';
import styled from "styled-components";

const StyledFooter = styled.footer`
	display: block;
	margin-top: 2rem;
	font-size: 1rem;
	font-weight: 400;
	span {
		font-weight: 700;
	}
	a {
		color: #776e65;
		text-decoration: underline;
		cursor: pointer;
	}
`

const Footer = (): React.ReactElement => {
	return (
		<StyledFooter>
			<p>This is a project reconstructing the original 2048 game with a React.</p>
			<p>You can see the source code of this project <a target={"_blank"}><span>Here</span></a>.</p>
			<p><a href={"https://play2048.co/"} target={"_blank"}><span>Original 2048 game</span></a> is created by <a href={`http://gabrielecirulli.com/`} target={"_blank"}><span>Gabriele Cirulli</span></a>.</p>
		</StyledFooter>
	)
}

export default Footer;
