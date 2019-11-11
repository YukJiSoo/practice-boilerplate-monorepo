import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
	const [hasError, setErrors] = useState(true);
	const [hello, setHello] = useState({});

	async function fetchData() {
		const res = await fetch("http://localhost:4000/api", {
			crossDomain: true,
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
		res.json()
			.then(res => {
				setErrors(false);
				setHello(res);
			})
			.catch(err => setErrors(err));
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			{hasError ? (
				<span>Has error: {JSON.stringify(hasError)}</span>
			) : (
				<span>Complete {JSON.stringify(hello)}</span>
			)}
		</div>
	);
};

export default App;
