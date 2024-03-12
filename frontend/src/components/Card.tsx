
export interface CardProps {
	title: string;
	description?: string;
	onClick?: (x: string) => void;
	id?: string;
}

const Card = ({ title, description = "", onClick = (x) => { console.log("no function attached to card"); }, id = "" }: CardProps) => {
	return (
		<div
			className="card"
			onClick={() => (onClick(id))}
			onTouchEnd={() => { onClick(id) }}
		>
			<h2>{title}</h2>
			<p>{description}</p>
		</div >
	);
}

export default Card;
