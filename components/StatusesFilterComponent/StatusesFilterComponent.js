import { useEffect, useState } from "react";
import { ToggleButtonGroupUI } from "../UI-Components";
import { Form } from "react-bootstrap";

export default function StatusesFilterComponent({
  data,
  filterData,
  setFilterData,
  showDelta,
  setShowDelta,
}) {
  const [radioValue, setRadioValue] = useState(showDelta ? "2" : "1");
  const [categories, setCategories] = useState(filterData || []);
  useEffect(() => {
    setCategories(filterData || []);
  }, [filterData]);
  return (
    <>
      <ToggleButtonGroupUI
        label="View as"
        radios={[
          { label: "Absolute", value: "1" },
          { label: "Increment", value: "2" },
        ]}
        radioValue={radioValue}
        setRadioValue={setRadioValue}
      />
      <Form>
        {radioValue === "1" && (
          <>
            {categories.map((d) => (
              <Form.Group key={d.label} className="mb-3" controlId="absoluteValues">
                <Form.Check type="checkbox" label={d.label} checked={true}/>
              </Form.Group>
            ))}
          </>
        )}
        {radioValue === "2" && (
          <>
            {categories.map((d) => (
              <Form.Group key={d.label} className="mb-3" controlId="absoluteValues">
                <Form.Check
                  type="radio"
                  label={d.label}
                  name="incrementValues"
                  checked={true}
                />
              </Form.Group>
            ))}
          </>
        )}
      </Form>
    </>
  );
}
