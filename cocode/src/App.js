import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_SERVER_ADDRESS = 'http://localhost:4000/api';
const FETCH_OPTION = {
	crossDomain: true,
	method: 'GET',
	headers: { 'Content-Type': 'application/json' }
};

function App() {
	const [projects, setProjects] = useState([]);
	const [title, setTitle] = useState('');

	useEffect(() => {
		async function fetchProjects() {
			const res = await fetch(API_SERVER_ADDRESS, FETCH_OPTION);

			res.json()
				.then(res => {
					setProjects(
						res.map((cur, index) => `${index + 1}. ${cur.title} `)
					);
				})
				.catch(err => console.log(err));
		}
		fetchProjects();
	}, []);

	const handleChange = event => {
		const target = event.target;
		setTitle(target.value);
	};

	const handleClick = async event => {
		event.preventDefault();

		await axios
			.post(API_SERVER_ADDRESS, { title: title })
			.then(({ data }) =>
				setProjects([
					...projects,
					`${projects.length + 1}. ${data.title} `
				])
			);
	};

	return (
		<>
			<header>
				<h1>Hello! Cocode!!</h1>
			</header>
			<section>
				{projects.map((project, index) => (
					<div key={index}>{project}</div>
				))}
				<input type="text" name="title" onChange={handleChange} />
				<button onClick={handleClick}>추가하기</button>
			</section>
			<footer></footer>
		</>
	);
}

export default App;
