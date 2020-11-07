import React, { useState, useEffect } from "react";
import "./App.css";
import {
	Card,
	CardContent,
	FormControl,
	MenuItem,
	Select,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import Footer from "./Footer";

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("WorldWide");
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
	const [mapZoom, setMapZoom] = useState(3);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState("cases");

	//STATE = how to write a variable in React >>>>>

	//https://disease.sh/v3/covid-19/countries
	//UseEffect = Runs a piece of code based on a given condition

	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((res) => res.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

	useEffect(() => {
		//The code inside here will run once, when the component loads and not again
		// async -> sent a request, wait for it, do something with info
		// Here we can actually use "axios" but "fetch" is built in js it's perfectly works
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then((res) => res.json())
				.then((data) => {
					const countries = data.map((list) => ({
						name: list.country, //United States, India
						value: list.countryInfo.iso3, //UK, IN
					}));

					const sortedData = sortData(data);

					setCountries(countries);
					setMapCountries(data);
					setTableData(sortedData);
				});
		};

		getCountriesData();
	}, []);

	const onCountryChange = async (e) => {
		const countrycode = e.target.value;
		console.log("The Country Code >>>>>>", countrycode);

		const url =
			countrycode === "WorldWide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${countrycode}`;

		await fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setCountry(countrycode);
				//All of the data ... from the country response
				setCountryInfo(data);
				setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
				setMapZoom(4);
			});
	};
	console.log("The Country Info Data >>>>>", countryInfo);

	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<h1>COVID-19 TRACKER</h1>

					<FormControl className="app__dropdown">
						<Select
							variant="outlined"
							color="secondary"
							value={country}
							onChange={onCountryChange}
						>
							{/* Loop through all the countries and show a drop down list of options */}

							
							{/* NOTE: if u value is a string "WorldWide" You'll error but actually it trigers to Worldwide score  */}
							<MenuItem value={country}>
								<h4>WorldWide</h4>
							</MenuItem>
							
							{countries.map((country) => (
								<MenuItem value={country.value}>
									{country.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				<div className="app__status">
					<InfoBox
						isRed
						// Here onClick and active are using like an props
						active={casesType === "cases"}
						onClick={(e) => setCasesType("cases")}
						title="Active Cases"
						cases={prettyPrintStat(countryInfo.todayCases)}
						total={prettyPrintStat(countryInfo.cases)}
					/>
					<InfoBox
						active={casesType === "recovered"}
						onClick={(e) => setCasesType("recovered")}
						title="Recovery Cases"
						cases={prettyPrintStat(countryInfo.todayRecovered)}
						total={prettyPrintStat(countryInfo.recovered)}
					/>
					<InfoBox
						isRed
						active={casesType === "deaths"}
						onClick={(e) => setCasesType("deaths")}
						title="Death Cases"
						cases={prettyPrintStat(countryInfo.todayDeaths)}
						total={prettyPrintStat(countryInfo.deaths)}
					/>
				</div>

				{/* mapCenter and mapZoom comin from the useState Hooks */}
				<Map
					casesType={casesType}
					countries={mapCountries}
					center={mapCenter}
					zoom={mapZoom}
				/>
			</div>

			<Card className="app__right">
				<CardContent className="app__right__table">
					<h2>Live Cases by Country</h2>
					<Table countries={tableData} />
					<h3>Worldwide new {casesType}</h3>
					{/* className="app__graph" send as a prop to the LineGraph.js  */}
					<LineGraph className="app__graph" casesType={casesType} />
					{/* But the className="app__graph" no need to style bcz .app__right .MuiCardContent-root in App.css nake an changes the chart height */}
				</CardContent>
				<Footer />
			</Card>
			
		</div>
	);
}

export default App;
