import { Form, FormCheck } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { colors, labelsDict } from "../../utils/ventagli.utils";
import { color as d3color } from "d3";
import styles from "./StatusesFilterComponent.module.scss";
import classNames from "classnames";

export default function Checkbox({ group, filterData, setFilterData }) {
  const initialStatus =
    filterData.find((f) => group.label === f.label)?.active === true;
  const [checked, setChecked] = useState(initialStatus);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const newFilterData = [...filterData];
    newFilterData.find((f) => group.label === f.label).active = checked;
    setFilterData(newFilterData);
  }, [checked]);

  useEffect(() => {
    const newStatus = filterData.find((f) => group.label === f.label).active;
    setChecked(newStatus);
    let _disabled =
      filterData.filter((d) => d.active).length < 2 && checked === true;
    setIsDisabled(_disabled);
  }, [filterData]);

  const getLightColor = (hex) => {
    const myColor = d3color(hex);
    myColor.opacity = 0.15;
    return myColor;
  };
  return (
    <div
      className={classNames(styles.checkbox, "mb-1")}
      style={{
        backgroundColor: checked
          ? colors[group.label]
          : getLightColor(colors[group.label]),
        borderColor: d3color(colors[group.label] || "#fff").darker(0.75),
      }}
    >
      <>
        <Form.Check.Input
          type="checkbox"
          className={classNames("m-0", "p-0", "me-1")}
          id={"id-" + labelsDict[group.label].explained}
          style={{
            backgroundColor: checked
              ? d3color(colors[group.label]).darker(0.75)
              : colors[group.label],
            border: "none",
            cursor: "pointer",
          }}
          defaultChecked={checked}
          onChange={() => setChecked(!checked)}
          disabled={isDisabled}
        />
        <Form.Check.Label
          className={classNames("m-0", "p-0")}
          htmlFor={"id-" + labelsDict[group.label].explained}
          style={{ cursor: "pointer" }}
        >
          {labelsDict[group.label].explained}
        </Form.Check.Label>
      </>
    </div>
  );
}
