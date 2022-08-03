import { Button, ButtonGroup } from "react-bootstrap";
import classNames from "classnames";

export default function ButtonGroupUI({ label, items }) {
	return (
		<div className={classNames("d-flex", "justify-content-start", "align-items-center")}>
			{label && <span>{label}</span>}
			<ButtonGroup className={classNames("ms-3")} aria-label="Basic example">
				{items.map((btn, i) => (
					<Button key={i} size="sm" onClick={(e) => btn.onClickAction(e)}>
						{btn.label}
					</Button>
				))}
			</ButtonGroup>
		</div>
	);
}

ButtonGroupUI.defaultProps = {
	items: [
		{ label: "btn", onClickAction: (value) => console.warn("No function specified for onClickAction. Value:", value) },
		{ label: "btn", onClickAction: (value) => console.warn("No function specified for onClickAction. Value:", value) },
		{ label: "btn", onClickAction: (value) => console.warn("No function specified for onClickAction. Value:", value) },
	],
};
