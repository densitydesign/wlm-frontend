import { Button } from "react-bootstrap";
import classNames from "classnames";

export default function ButtonUI({ label, onClickAction, content }) {
	return (
		<div className={classNames("d-flex", "justify-content-start", "align-items-center")}>
			{label && <span>{label}</span>}
			<Button className={classNames("ms-3")} size="sm" onClick={(event) => onClickAction(event)}>
				{content}
			</Button>
		</div>
	);
}

ButtonUI.defaultProps = {
	initialDate: "2012-01-01",
	onClickAction: (value) => console.warn("No function specified for onClickAction. Value:", value),
};
