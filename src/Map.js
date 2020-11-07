import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
	return (
		<div className="map">
			{/* Note that the <LeafletMap> component creates its own <div> container for the map, it does not get attached to an existing node. */}
			<LeafletMap center={center} zoom={zoom}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>

				{/* Loop through all the countries and draw circles on the screen*/}

				{showDataOnMap(countries, casesType)}
			</LeafletMap>
		</div>
	);
}

export default Map;
