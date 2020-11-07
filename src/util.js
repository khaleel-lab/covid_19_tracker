import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

//created a dictionary with 3 keys(cases, recovered, deathes)
const casesTypeColors = {
	cases: {
		hex: "#CC1034",
		// rgb: "rgb(204, 16, 52)",
		// half_op: "rgba(204, 16, 52, 0.5)",
		multiplier: 800,
	},
	recovered: {
		hex: "#7dd71d",
		rgb: "rgb(125, 215, 29)",
		half_op: "rgba(125, 215, 29, 0.5)",
		multiplier: 1200,
	},
	deaths: {
		hex: "#fb4443",
		// rgb: "rgb(251, 68, 67)",
		// half_op: "rgba(251, 68, 67, 0.5)",
		multiplier: 2000,
	},
};

export const sortData = (data) => {
	const sortedData = [...data];

	// sortedData.sort((a, b) => {
	// 	if (a.cases > b.cases) {
	// 		return -1;
	// 	} else {
	// 		return 1;
	// 	}
	// });
	// return sortedData;

	//Simplied code by using Ternary Operator
	return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

//Here the use of this function is to show the order of the cases (265265 Numeric) to in this format  +1.2k like this
export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";


//Draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = "cases") =>
	data.map((country) => (
		<Circle
			center={[country.countryInfo.lat, country.countryInfo.long]}
			color={casesTypeColors[casesType].hex}
			fillColor={casesTypeColors[casesType].hex}
			fillOpacity={0.4}
			radius={
				Math.sqrt(country[casesType]) *
				casesTypeColors[casesType].multiplier
			}
		>
			<Popup>
				<div className="info-container">
					{/* This <div> for background */}
					<div
						className="info-flag"
						style={{
							backgroundImage: `url(${country.countryInfo.flag})`,
						}}
					/>
					{/* <div> is Name of the country */}
					<div className="info-name">{country.country}</div>
					{/* <div> is for Number of active Cases */}
					<div className="info-confirmed">
						Cases: {numeral(country.cases).format("0,0")}
					</div>
					{/* <div> is for Number of recovered Cases */}
					<div className="info-recovered">
						Recovered: {numeral(country.recovered).format("0,0")}
					</div>
					{/* <div> is for Number of death Cases */}
					<div className="info-deaths">
						Deaths: {numeral(country.deaths).format("0,0")}
					</div>
				</div>
			</Popup>
		</Circle>
	));
