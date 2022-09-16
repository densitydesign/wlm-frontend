import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import classNames from "classnames";
import styles from "./UI-Components.module.scss";
export default function DropdownGroupUI({ label, items, disabled }) {
	return (
		<div className={classNames("d-flex", "justify-content-start", "align-items-center", "mb-2")}>
			{label && <span>{label}</span>}
			<ButtonGroup className={classNames({ "ms-1": label })} aria-label="Basic example">
				{items.map((d, i) => (
					<DropdownButton
						className={classNames(styles.btnWlm)}
						size="sm"
						variant="lightBlue"
						disabled={disabled}
						key={i}
						as={ButtonGroup}
						title={d.selected ? d.selected.label : d.defaultLabel}
						id="bg-nested-dropdown"
					>
						{d.items.map((dd, ii) => (
							<Dropdown.Item
								key={ii}
								eventKey={ii}
								onClick={() => {
									d.transferSelection(dd);
								}}
								disabled={dd.disabled}
							>
								{dd.label}
							</Dropdown.Item>
						))}
					</DropdownButton>
				))}
			</ButtonGroup>
		</div>
	);
}

DropdownGroupUI.defaultProps = {
	items: [
		{
			transferSelection: (value) => console.warn("No function specified for rtansferring the selection to parent. Value:", value),
			defaultLabel: "Select an item",
			items: [{ label: "action 1" }, { label: "action 2" }, { label: "action 3" }, { label: "action 4" }],
		},
		{
			transferSelection: (value) => console.warn("No function specified for rtansferring the selection to parent. Value:", value),
			defaultLabel: "Select an item",
			items: [{ label: "action 1" }, { label: "action 2" }, { label: "action 3" }, { label: "action 4" }],
		},
	],
};
