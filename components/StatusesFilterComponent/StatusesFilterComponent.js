import { useEffect, useState } from "react";
import { DropdownUI, ToggleButtonGroupUI } from "../UI-Components";
import { Form } from "react-bootstrap";
import Checkbox from "./Checkbox";
import RadioButtons from "./RadioButtons";

const ddItems = [
  { label: "Absolute values", value: "1" },
  { label: "Incremental values", value: "2" },
];

export default function StatusesFilterComponent({
  data,
  filterData,
  setFilterData,
  showDelta,
  setShowDelta,
}) {
  const [radioValue, setRadioValue] = useState(showDelta ? "2" : "1");
  const [ddValue, setDdValue] = useState(showDelta ? ddItems[1] : ddItems[0]);
  const [categories, setCategories] = useState(filterData || []); // initially filterData is undefined

  useEffect(() => {
    setCategories(filterData || []);
  }, [filterData]);

  // useEffect(() => {
  //   if (radioValue === "2") {
  //     setShowDelta(true);
  //     let newFilterData = filterData;
  //     if (filterData.filter((d) => d.active).length > 1) {
  //       newFilterData = filterData.map((d, i) => ({ ...d, active: i === 0 }));
  //     }
  //     setFilterData(newFilterData);
  //   } else {
  //     setShowDelta(false);
  //   }
  // }, [radioValue, categories]);

  useEffect(() => {
    if (ddValue.value === "2") {
      setShowDelta(true);
      let newFilterData = filterData;
      if (filterData.filter((d) => d.active).length > 1) {
        newFilterData = filterData.map((d, i) => ({ ...d, active: i === 0 }));
      }
      setFilterData(newFilterData);
    } else {
      setShowDelta(false);
    }
  }, [ddValue, categories]);

  return (
    <>
      {/* <ToggleButtonGroupUI
        label="View as"
        radios={[
          { label: "Absolute", value: "1" },
          { label: "Increment", value: "2" },
        ]}
        radioValue={radioValue}
        setRadioValue={setRadioValue}
      /> */}
      <DropdownUI
        label="View as"
        items={ddItems}
        value={ddValue}
        setValue={setDdValue}
        hideReset={true}
      />
      <Form>
        {ddValue.value === "1" && (
          <Form.Group className="mb-3" controlId="absoluteValues">
            {categories.map((d) => (
              <Checkbox
                key={d.label}
                group={d}
                filterData={filterData}
                setFilterData={setFilterData}
              />
            ))}
          </Form.Group>
        )}
        {ddValue.value === "2" && (
          <RadioButtons filterData={categories} setFilterData={setFilterData} />
        )}
      </Form>
    </>
  );
}
