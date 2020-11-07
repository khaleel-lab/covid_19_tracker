import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

// ES6 Destructuring properties
function InfoBox({ title, cases, active, isRed, isLightRed, total, ...props }) {
	return (
		<Card
			onClick={props.onClick}
			className={`infoBox ${active && "infoBox--selected"} ${
				isRed && "infoBox--red"
			} ${isLightRed && "infoBox--lightRed"}`}
		>
			<CardContent>
				{/* Title i.e corona cases */}
				<Typography
					variant="overline"
					className="infoBox__title"
					// color="secondary"
				>
					{title}
				</Typography>
				{/* +120k Number of cases */}
				<h2
					className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}
				>
					<h6>Today</h6>
					{cases}
				</h2>
				{/* 1.2M Total */}
				<Typography className="infoBox__total" color="textSecondary">
					{total} Total
				</Typography>
			</CardContent>
		</Card>
	);
}

export default InfoBox;
