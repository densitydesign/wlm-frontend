import { Dropdown } from "react-bootstrap";
import classNames from "classnames";
import { useState } from "react";

export default function DropdownUI({ label, items, transferSelection, defaultLabel }) {
	const defaultValue = { label: defaultLabel };
	const [selection, setSelection] = useState(defaultValue);
	return (
		<div className={classNames("d-flex", "justify-content-start", "align-items-center")}>
			{label && <span>{label}</span>}
			<Dropdown className={classNames("ms-3")} >
				<Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
					{selection.label}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{items.map((d, i) => (
						<Dropdown.Item
							key={i}
							eventKey={i}
							onClick={() => {
								setSelection(d);
								transferSelection(d);
							}}
						>
							{d.label}
						</Dropdown.Item>
					))}
					<Dropdown.Divider />
					<Dropdown.Item
						eventKey={items.length}
						onClick={() => {
							setSelection(defaultValue);
							transferSelection(null);
						}}
					>
						None
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}

DropdownUI.defaultProps = {
	transferSelection: (value) =>
		console.warn("No function specified for rtansferring the selection to parent. Value:", value),
	defaultLabel: "Select an item",
	items: [{ label: "action 1" }, { label: "action 2" }, { label: "action 3" }, { label: "action 4" }],
};
