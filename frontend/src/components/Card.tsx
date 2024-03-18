import styles from "./Card.module.css";
export interface CardProps {
	title: string;
	description?: string;
	onClick?: (x: string) => void;
	id?: string;
	classname?: string;
}

const Card = ({ title, description = "", onClick = (x) => { console.log("no function attached to card"); }, id = "", classname }: CardProps) => {
	return (
		<div
			className={classname ? classname : styles.defaultCard}
			onClick={() => (onClick(id))}
			onTouchEnd={() => { onClick(id) }}
		>
			<h2>{title}</h2>
			<p>{description}</p>
		</div >
	);
}

export default Card;
