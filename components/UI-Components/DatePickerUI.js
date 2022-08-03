import { Form } from "react-bootstrap";
import classNames from "classnames";

export default function DatePickerUI({ label, initialDate, transferSelection }) {
	return (
		<Form.Group
			controlId="date"
			className={classNames("d-flex", "justify-content-start", "align-items-center", "mb-3")}
			
		>
			{label && <Form.Label>{label}</Form.Label>}
			<Form.Control
				className="ms-3"
				type="date"
				name="date"
				placeholder="Pick a date"
				defaultValue={initialDate}
				size="sm"
				onChange={(e) => transferSelection(e.target.value)}
			/>
		</Form.Group>
	);
}

DatePickerUI.defaultProps = {
	initialDate: "2012-01-01",
	transferSelection: (value) =>
		console.warn("No function specified for rtansferring the selection to parent. Value:", value),
};
