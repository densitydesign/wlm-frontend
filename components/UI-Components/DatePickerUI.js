import { Form } from "react-bootstrap";
import classNames from "classnames";

export default function DatePickerUI({ label, value, transferSelection, min, max }) {
	return (
		<Form.Group
			controlId="date"
			className={classNames("d-flex", "justify-content-start", "align-items-center", "mb-2")}
			
		>
			{label && <Form.Label>{label}</Form.Label>}
			<Form.Control
				className={classNames({ "ms-1": label })}
				type="date"
				name="date"
				min={min}
				max={max}
				placeholder="Pick a date"
				value={value}
				size="sm"
				variant="lightBlue"
				onChange={(e) => transferSelection(e.target.value)}
			/>
		</Form.Group>
	);
}

DatePickerUI.defaultProps = {
	value: "2012-01-01",
	transferSelection: (value) =>
		console.warn("No function specified for transferring the selection to parent. Value:", value),
};
