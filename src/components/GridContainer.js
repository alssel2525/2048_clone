import React from "react";

const GridContainer = () => {
	return (
		<div className={"grid-container"}>
			{
				[...Array(4)].map((row, ir) => {
					return (
						<div className={"grid-row"} key={ir}>
							{
								[...Array(4)].map((cell, ic) => {
									return (
										<div className={"grid-cell"} key={ic}></div>
									)
								})
							}
						</div>
					)
				})
			}
		</div>
	)
}

export default GridContainer
