import { Button } from "react-bootstrap";
import classNames from "classnames";
import styles from "./UI-Components.module.scss";

export default function ButtonUI({ label, onClickAction, content, disabled }) {
  return (
    <div
      className={classNames(
        "d-flex",
        "justify-content-start",
        "align-items-center",
        "mb-2"
      )}
    >
      {label && <span>{label}</span>}
      <Button
        className={classNames(styles.btnWlm, { "ms-1": label })}
        size="sm"
        variant="lightBlue"
        onClick={(event) => onClickAction(event)}
        disabled={disabled}
      >
        {content}
      </Button>
    </div>
  );
}

ButtonUI.defaultProps = {
  initialDate: "2012-01-01",
  onClickAction: (value) =>
    console.warn("No function specified for onClickAction. Value:", value),
};
