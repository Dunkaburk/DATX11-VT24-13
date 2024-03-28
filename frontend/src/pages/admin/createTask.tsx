"use client"
import callAPI from "@/hooks/apiHooks";
import { useEffect, useState } from "react";


export default function Home() {
	const [module, useModule] = useState([]);
	const [taskTitle, setTaskTitle] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const [taskCode, setTaskCode] = useState("");
	const [taskSolution, setTaskSolution] = useState("");
	const [selectedModules, setSelectedModules] = useState([]);
	const data = { "title": taskTitle, "description": taskDescription, "modules": selectedModules, "solution": taskSolution, "code": taskCode }
	useEffect(() => {
		callAPI({ route: "/api/module/getModules", method: "GET", data: {} }).then(
			(res) => {
				useModule(res);
			}
		);
	}, []);

	return (
		<main>
			<h1> Add a task</h1>
			<input type="text" placeholder="Task name" onChange={(e) => setTaskTitle(e.target.value)} />
			<select name="selectedModule" multiple={true} onChange={e => {
				const options = e.target.selectedOptions;
				const value: any = [];
				for (let i = 0; i < options.length; i++)
					value.push(options[i].value)
				setSelectedModules(value);
			}}>
				{module.length > 0 ? module.map((module: any) => (
					<option value={module.name} key={module.name}>{module.name}</option>
				)) : <></>
				}
			</select>
			<textarea placeholder="Task description" onChange={(e) => setTaskDescription(e.target.value)} />
			<textarea placeholder="Task code" onChange={(e) => setTaskCode(e.target.value)} />
			<textarea placeholder="Task solution" onChange={(e) => setTaskSolution(e.target.value)} />
			<input type="button" onClick={() => { callAPI({ route: "/api/task/addBeginnerTask", method: "POST", data: data }) }} value="Submit task" />

		</main>
	);
}
