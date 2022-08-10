import { Button, ButtonGroup } from "react-bootstrap";
import classNames from "classnames";

export default function ButtonGroupUI({ label, items, disabled }) {
	return (
		<div className={classNames("d-flex", "justify-content-start", "align-items-center", "mb-2")}>
			{label && <span>{label}</span>}
			<ButtonGroup className={classNames({ "ms-1": label })} aria-label="Basic example">
				{items.map((btn, i) => (
					<Button key={i} size="sm" onClick={(e) => btn.onClickAction(e)} disabled={disabled}>
						{btn.content}
					</Button>
				))}
			</ButtonGroup>
		</div>
	);
}

ButtonGroupUI.defaultProps = {
	items: [
		{ content: "btn", onClickAction: (value) => console.warn("No function specified for onClickAction. Value:", value) },
		{ content: "btn", onClickAction: (value) => console.warn("No function specified for onClickAction. Value:", value) },
		{ content: "btn", onClickAction: (value) => console.warn("No function specified for onClickAction. Value:", value) },
	],
};
