import React from "react";
import "./Footer.css";

function Footer() {
	const year = new Date().getFullYear();

	return (
		<div className="footer">
			<p>© {year} Covid-19 Tracker - No rights reserved</p>
			<p>Created by <span className='footer__name'>Khaleel_Lee</span> </p>
		</div>
	);
}

export default Footer;
