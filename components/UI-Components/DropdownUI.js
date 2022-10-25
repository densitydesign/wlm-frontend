import { Button, Dropdown } from "react-bootstrap";
import classNames from "classnames";
import { BsXLg as CloseIcon } from "react-icons/bs";
import styles from "./UI-Components.module.scss";
import { groups as d3_groups } from "d3";

export default function DropdownUI({
  label,
  boldLabel,
  items,
  value,
  setValue,
  defaultLabel,
  disabled,
  hideReset,
  classNameProp,
}) {
  return (
    <div
      className={classNames(
        "d-flex",
        "justify-content-start",
        "align-items-center",
        "mb-2",
        classNameProp
      )}
    >
      {label && (
        <span className={classNames({ [styles.boldLabel]: boldLabel })}>
          {label}
        </span>
      )}
      <Dropdown className={classNames({ "ms-1": label })}>
        <Dropdown.Toggle
          className={classNames(styles.btnWlm)}
          id="dropdown-basic"
          size="sm"
          variant="lightBlue"
          disabled={disabled}
        >
          {value && value.label}
          {!value && defaultLabel}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ maxHeight: "50vh", overflowY: "auto" }}>
          {d3_groups(items, (d) => d.group).map((d, i) => (
            <span key={"span" + i}>
              {d[0] && (
                <>
                  <Dropdown.Header
                    className={classNames(
                      styles.dropDownHeader,
                      "pt-2",
                      { "pt-4": i > 0 },
                      "pb-2"
                    )}
                    key={"h" + i}
                  >
                    Group {d[0]}
                  </Dropdown.Header>
                  {/* <Dropdown.Divider key={"d" + i} className="my-0" /> */}
                </>
              )}
              {d[1].map((dd, ii) => (
                <Dropdown.Item
                  key={"item-" + ii}
                  eventKey={ii}
                  onClick={() => {
                    setValue(dd);
                  }}
                >
                  {dd.label}
                </Dropdown.Item>
              ))}
            </span>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {!hideReset && value && (
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
  setValue: (value) =>
    console.warn(
      "No function specified for rtansferring the selection to parent. Value:",
      value
    ),
  defaultLabel: "Select an item",
  boldLabel: false,
  items: [
    { label: "action 1" },
    { label: "action 2" },
    { label: "action 3" },
    { label: "action 4" },
  ],
};
