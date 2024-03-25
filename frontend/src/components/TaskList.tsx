import Card from "./Card";

export interface TaskListProps {
	tasks: Task[];
	moduleName: string;
}
const TaskList = ({ tasks, moduleName }: TaskListProps) => {
	return (
		<>
			<h1>{moduleName} Tasks</h1>
			<div style={{ display: "grid" }}>
				{tasks.map((task) => (
					<Card title={task.title} description={task.description} id={task.id} key={task.id} />
				))}
			</div >
		</>
	);
}


export type Task = {
	id: string;
	title: string;
	description: string;
}

export default TaskList;