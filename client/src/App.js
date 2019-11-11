import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
	const [todos, setTodos] = useState([]);
	const [name, setName] = useState("");

	async function fetchData() {
		const res = await fetch("http://localhost:4000/api", {
			crossDomain: true,
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
		res.json()
			.then(res => {
				setTodos(res.map((cur, index) => `${index}. ${cur.name} `));
			})
			.catch(err => console.log(err));
	}

	useEffect(() => {
		fetchData();
	}, []);

	const handleChange = event => {
		const target = event.target;
		setName(target.value);
	};

	const request = async event => {
		event.preventDefault();

		await axios
			.post("http://localhost:4000/api", { name: name })
			.then(({ data }) => {
				setTodos([...todos, `${todos.length}. ${data.name} `]);
			});
	};

	return (
		<div>
			<div>Hello I'm docker</div>
			<div>{todos}</div>
			<input type="text" name="title" onChange={handleChange} />
			<button onClick={request}>request post</button>
		</div>
	);
};

export default App;
