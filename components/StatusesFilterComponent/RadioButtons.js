import { Form } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { colors, labelsDict } from "../../utils/ventagli.utils";
import { color as d3color } from "d3";
import styles from "./StatusesFilterComponent.module.scss";
import classNames from "classnames";

export default function RadioButtons({ filterData, setFilterData }) {
  const getLightColor = (hex) => {
    const myColor = d3color(hex);
    myColor.opacity = 0.15;
    return myColor;
  };
  const handleChange = (selected) => {
    const newFilterData = filterData.map((d) => ({
      ...d,
      active: d.label === selected.label,
    }));
    setFilterData(newFilterData);
  };
  return (
    <Form.Group controlId="absoluteValues">
      {filterData.map((d, i) => (
        <div
          key={i}
          className={classNames(styles.checkbox, "mb-1")}
          style={{
            backgroundColor: d.active
              ? colors[d.label]
              : getLightColor(colors[d.label]),
            borderColor: d3color(colors[d.label] || "#fff").darker(0.75),
          }}
        >
          <Form.Check.Input
            type="radio"
            id={"radio-" + d.label}
            name="incrementValues"
            checked={d.active}
            onChange={() => handleChange(d)}
            className={classNames("m-0", "p-0", "me-1")}
            style={{
              marginTop: 0,
              backgroundColor: d.active
                ? d3color(colors[d.label]).darker(0.75)
                : colors[d.label],
              border: "none",
              cursor: "pointer",
            }}
          />
          <Form.Check.Label
            htmlFor={"radio-" + d.label}
            className={classNames("m-0", "p-0")}
            style={{ cursor: "pointer" }}
          >
            {labelsDict[d.label].explained}
          </Form.Check.Label>
        </div>
      ))}
    </Form.Group>
  );
}
