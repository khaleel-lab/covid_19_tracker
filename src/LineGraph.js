import React, { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";
import numeral from "numeral";

//Delcaring options into the Line component read the complete documnetationfor understanding
const options = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tooltips: {
		mode: "index",
		intersect: false,
		callbacks: {
			label: function (tooltipItem, data) {
				return numeral(tooltipItem.value).format("+0,0");
			},
		},
	},
	scales: {
		xAxes: [
			{
				type: "time",
				time: {
					format: "MM/DD/YY",
					tooltipFormat: "ll",
				},
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
				},
				ticks: {
					// Include a dollar sign in the ticks
					callback: function (value, index, values) {
						return numeral(value).format("0a");
					},
				},
			},
		],
	},
};

//Don't confuse make it undesatnd Ref 02:50
const buildChartData = (data, casesType = "cases") => {
	const chartData = [];
	let lastDataPoint;
	// Here foreach is not workout bcz data is not an array (dictionary object with the keys)
	for (let date in data.cases) {
		if (lastDataPoint) {
			const newDataPoint = {
				x: date,
				y: data[casesType][date] - lastDataPoint,
			};
			chartData.push(newDataPoint);
		}
		lastDataPoint = data[casesType][date];
	}
	return chartData;
};

// Here ...props means while am sending classname as a prop from the App.js line :154
function LineGraph({ casesType = "cases", ...props }) {
	const [data, setData] = useState({});

	//https://disease.sh/v3/covid-19/all?lastdays=120
	useEffect(() => {
		const fetchData = async () => {
			await fetch(
				"https://disease.sh/v3/covid-19/historical/all?lastdays=120"
			)
				.then((res) => res.json())
				.then((data) => {
					//Clever Stuff ...
					console.log("LastDays Data >>>>", data);
					let chartData = buildChartData(data, casesType);
					setData(chartData);
				});
		};

		fetchData();
	}, [casesType]);

	return (
		//here taking classname from the App.js Line:154
		<div className={props.className}>
			{/* Lin will take two parameters data and options */}
			{data?.length > 0 && (
				<Line
					data={{
						datasets: [
							{
								backgroundColor: "rgba(204, 16, 52, 0.5)",
								borderColor: "#CC1034",
								// Here the right side data is from useHook
								data: data,
							},
						],
					}}
					options={options}
				/>
			)}
		</div>
	);
}

export default LineGraph;
