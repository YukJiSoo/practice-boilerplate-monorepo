import React, { useState, useEffect, useRef } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { Grid } from '@material-ui/core';
import * as babel from '@babel/core';
import reactPreset from '@babel/preset-react';
import axios from 'axios';

const API_SERVER_ADDRESS = 'http://localhost:3030/api';
const FETCH_OPTION = {
	crossDomain: true,
	method: 'GET',
	headers: { 'Content-Type': 'application/json' }
};
const EDITOR_DEFAULT_VALUE = `function Component() {
    return(
        <div>
            <h1>test</h1>
        </div>
    )
}
ReactDOM.render(<Component/>, document.getElementById('inner_root'));
`;

function App() {
	const [isEditorReady, setIsEditorReady] = useState(false);
	const valueGetter = useRef();

	function handleEditorDidMount(_valueGetter) {
		setIsEditorReady(true);
		valueGetter.current = _valueGetter;
		handleEditorChange(
			null,
			`function Component() {
            return(
                <div>
                    <h1>test</h1>
                </div>
            )
        }
        ReactDOM.render(<Component/>, document.getElementById('inner_root'));
        `
		);
	}

	function handleEditorChange(ev, value) {
		let parsedCode = null;
		try {
			parsedCode = babel.transform(value, {
				presets: [reactPreset]
			});
			eval(parsedCode.code);
		} catch (e) {
			console.dir(e);
			console.dir('터짐');
		}
	}

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
		<div>
			<Grid container xs={12}>
				<Grid xs={12}>
					<h1>데이터 통신 테스트</h1>
					{projects.map((project, index) => (
						<div key={index}>{project}</div>
					))}
					<input type="text" name="title" onChange={handleChange} />
					<button onClick={handleClick}>프로젝트 추가하기</button>
				</Grid>
				<Grid xs={12}>
					<h1>에디터 테스트</h1>
				</Grid>
				<Grid xs={6}>
					<ControlledEditor
						height="90vh"
						language="javascript"
						value={`function Component() {
    return(
        <div>
            <h1>test</h1>
        </div>
    )
}
ReactDOM.render(<Component/>, document.getElementById('inner_root'));
`}
						editorDidMount={handleEditorDidMount}
						theme="vs-dark"
						onChange={(ev, value) => handleEditorChange(ev, value)}
					/>
				</Grid>
				<Grid id="inner_root" xs={6}>
					{/* <JsxParser jsx={code} /> */}
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
