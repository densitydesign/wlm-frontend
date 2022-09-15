import { Button, Dropdown } from "react-bootstrap";
import classNames from "classnames";
import { BsXLg as CloseIcon } from "react-icons/bs";
import styles from "./UI-Components.module.scss";

export default function DropdownUI({ label, items, value, setValue, defaultLabel, disabled, hideReset }) {
	return (
		<div className={classNames("d-flex", "justify-content-start", "align-items-center", "mb-2")}>
			{label && <span>{label}</span>}
			<Dropdown className={classNames({ "ms-1": label })}>
				<Dropdown.Toggle className={classNames(styles.btnWlm)} id="dropdown-basic" size="sm" variant="lightBlue" disabled={disabled}>
					{value && value.label}
					{!value && defaultLabel}
				</Dropdown.Toggle>

				<Dropdown.Menu style={{ maxHeight: "50vh", overflowY: "auto" }}>
					{items.map((d, i) => (
						<Dropdown.Item
							key={i}
							eventKey={i}
							onClick={() => {
								setValue(d);
							}}
						>
							{d.label}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			{(!hideReset && value) && (
				<Button
					className={classNames("ms-1", styles.btnWlm)}
					size="sm"
					variant="lightBlue"
					onClick={() => {
						setValue(undefined);
					}}
					disabled={disabled}
				>
					<CloseIcon />
				</Button>
			)}
		</div>
	);
}

DropdownUI.defaultProps = {
	transferSelection: (value) => console.warn("No function specified for rtansferring the selection to parent. Value:", value),
	defaultLabel: "Select an item",
	items: [{ label: "action 1" }, { label: "action 2" }, { label: "action 3" }, { label: "action 4" }],
};
