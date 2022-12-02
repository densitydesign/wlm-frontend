import classNames from "classnames";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import styles from "./UI-Components.module.scss";

export default function ToggleButtonGroup({
  label,
  radios,
  radioValue,
  setRadioValue,
  boldLabel,
}) {
  return (
    <div
      className={classNames(
        styles.toggleButtonGroup,
        "d-flex",
        "justify-content-start",
        "align-items-center",
        "mb-2"
      )}
    >
      {label && (
        <span className={classNames({ [styles.boldLabel]: boldLabel })}>
          {label}
        </span>
      )}
      <ButtonGroup className={classNames({ "ms-1": label })}>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            size="sm"
            variant="lightBlue"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
            className={classNames(styles.toggleButton, {
              [styles.checked]: radioValue === radio.value,
            })}
            disabled={radio.disabled}
          >
            {radio.label}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
}

ToggleButtonGroup.defaultProps = {
  radios: [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ],
  radioValue: "1",
  setRadioValue: (value) =>
    console.warn("No function specified for onClickAction. Value:", value),
};
