import Card from "./Card";

export interface AssignmentListProps {
	assignments: Assignment[];
	categoryName: string;
}
const AssignmentList = ({ assignments, categoryName }: AssignmentListProps) => {
	return (
		<>
			<h1>{categoryName} Assignments</h1>
			<div style={{ display: "grid" }}>
				{assignments.map((assignment) => (
					<Card title={assignment.title} description={assignment.description} id={assignment.id} key={assignment.id} />
				))}
			</div >
		</>
	);
}


export type Assignment = {
	id: string;
	title: string;
	description: string;
}

export default AssignmentList;