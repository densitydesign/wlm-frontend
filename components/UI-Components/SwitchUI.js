import classNames from "classnames";
import styles from "./UI-Components.module.scss";
export default function SwitchUI({ label, checked, setChecked, disabled, className }) {
  return (
    <div
      className={classNames(
        className,
        "d-flex",
        "justify-content-start",
        "align-items-center",
        "mb-2"
      )}
    >
      {label && <span>{label}</span>}
      <input
      className={classNames({ "ms-1": label })}
        name={label}
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        disabled={disabled}
      />
    </div>
  );
}

 SwitchUI.defaultProps = {
  setChecked: (value) =>
    console.warn("No function specified for onClickAction. Value:", value),
};
