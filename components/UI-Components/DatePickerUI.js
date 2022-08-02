import { Form } from "react-bootstrap";
import classNames from "classnames";

export default function DatePickerUI({ label, initialDate, transferSelection }) {
	return (
		<Form.Group
			controlId="date"
			className={classNames("d-flex", "justify-content-start", "align-items-center")}
			onChange={(e) => transferSelection(e.target.value)}
		>
			{label && <Form.Label>{label}</Form.Label>}
			<Form.Control type="date" name="date" placeholder="Pick a date" defaultValue={initialDate} size="sm" />
		</Form.Group>
	);
}

DatePickerUI.defaultProps = {
	initialDate: "2012-01-01",
	transferSelection: (value)=>console.warn("No function specified for rtansferring the selection to parent. Value:", value)
};
